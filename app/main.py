# ============================================================
# CRITICAL: logfire MUST be configured before ALL other imports
# so that spans from all modules are captured from the start.
# ============================================================
import logfire
import os
import asyncio
from dotenv import load_dotenv
import anyio

load_dotenv()
logfire.configure(token=os.getenv("LOGFIRE_TOKEN"))

# Now safe to import app modules - logfire is already active
from fastapi import FastAPI, Response, HTTPException
from app.agents.graph import rag_agent
from app.guardrails import initialize_rails, guard
from app.config import settings
from app.services.cache_service import query_cache

from pydantic import BaseModel
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI(title="Enterprise Agentic RAG API - Scalable Multi-User Edition")

# Concurrency Control Semaphore
concurrency_semaphore: Optional[asyncio.Semaphore] = None

# Stats Counters
stats = {
    "total_requests": 0,
    "active_requests": 0,
    "blocked_requests": 0,
    "errors": 0
}

# Allow CORS so the frontend on Vite (port 5173) can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    global concurrency_semaphore
    initialize_rails()
    concurrency_semaphore = asyncio.Semaphore(settings.MAX_CONCURRENT_REQUESTS)
    logfire.info(f"⚡ Server initialized with max concurrency limit of {settings.MAX_CONCURRENT_REQUESTS} parallel requests.")

class QueryRequest(BaseModel):
    q: str
    thread_id: Optional[str] = "default_user"
    
    
@app.get("/")
async def home():
    return {
        "message": "Enterprise LangGraph RAG API is live.",
        "max_concurrency": settings.MAX_CONCURRENT_REQUESTS,
        "cache_enabled": settings.ENABLE_CACHE
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "active_requests": stats["active_requests"],
        "max_concurrency": settings.MAX_CONCURRENT_REQUESTS
    }

@app.get("/stats")
async def get_stats():
    cache_info = query_cache.get_stats()
    return {
        "server_stats": stats,
        "cache_stats": cache_info,
        "max_concurrency": settings.MAX_CONCURRENT_REQUESTS
    }

@app.get("/graph")
def get_graph_image():
    """
    Returns the Mermaid image of the agent's workflow.
    """
    try:
        png_bytes = rag_agent.get_graph().draw_mermaid_png()
        return Response(content=png_bytes, media_type="image/png")
    except Exception as e:
        return {"error": f"Could not generate graph image: {e}"}
    
    
@app.post("/query")
async def query(request: QueryRequest):
    """
    Executes the LangGraph RAG flow asynchronously with high-concurrency protection,
    intelligent caching, and non-blocking worker execution.
    """
    global stats
    q = request.q.strip()
    thread_id = request.thread_id or "default_user"

    if not q:
        raise HTTPException(status_code=400, detail="Query string cannot be empty")

    stats["total_requests"] += 1

    # ── Check Cache First ────────────────────────────────────────────────────
    cache_key = f"{q}"
    if settings.ENABLE_CACHE:
        cached_res = await query_cache.get(cache_key)
        if cached_res:
            logfire.info(f"⚡ [Cache Hit] Serving response instantly for: '{q[:40]}...'")
            res_copy = dict(cached_res)
            res_copy["status"] = "Served instantly from Cache ⚡"
            return res_copy

    # ── Acquire Concurrency Semaphore ─────────────────────────────────────────
    if concurrency_semaphore is None:
        sem = asyncio.Semaphore(settings.MAX_CONCURRENT_REQUESTS)
    else:
        sem = concurrency_semaphore

    async with sem:
        stats["active_requests"] += 1
        try:
            initial_state = {
                "messages": [{"role": "user", "content": q}],
                "current_query": q,
                "documents": [],
                "plan": ["Start"],
                "status": "Initializing Graph..."
            }
            
            config = {"configurable": {"thread_id": thread_id}}

            # Gate 1: NeMo Guardrails (Run off main async loop to avoid blocking)
            rail_fired, rail_response = await anyio.to_thread.run_sync(guard, q)
            
            if rail_fired:
                stats["blocked_requests"] += 1
                logfire.info(f"🛡️ Request blocked by guardrails | thread={thread_id}")
                blocked_res = {
                    "question": q,
                    "answer": rail_response,
                    "thought_process": ["Intent: Guardrails Fired", "Retrieval: Skipped"],
                    "status": "Blocked by guardrails.",
                    "sources": []
                }
                return blocked_res

            # Gate 2: LangGraph RAG pipeline (Run off main async loop)
            def run_agent_workflow():
                return rag_agent.invoke(initial_state, config=config)

            final_output = await anyio.to_thread.run_sync(run_agent_workflow)
            
            result = {
                "question": q,
                "answer": final_output.get("final_answer"),
                "thought_process": final_output.get("plan"),
                "status": final_output.get("status"),
                "sources": final_output.get("documents", [])
            }

            # Save in Cache if query completed successfully
            if settings.ENABLE_CACHE and result.get("answer"):
                await query_cache.set(cache_key, result)

            return result

        except Exception as e:
            stats["errors"] += 1
            logfire.error(f"❌ Backend Execution Failed: {e}")
            return {
                "question": q,
                "answer": "I apologize, but I encountered an internal error while processing your request. Please try again later.",
                "thought_process": ["Error encountered during execution."],
                "status": "error",
                "sources": []
            }
        finally:
            stats["active_requests"] -= 1
