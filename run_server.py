#!/usr/bin/env python3
"""
Production Multi-Worker Runner for Welyft Agentic RAG API
Runs FastAPI with Uvicorn worker process management for high concurrency.
"""

import os
import sys
import multiprocessing
import uvicorn

# Add current directory to python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.config import settings

def main():
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    
    # Single async worker — file-based local Qdrant can only be opened by ONE process.
    # Async event loop in a single worker still handles 20+ concurrent I/O-bound requests.
    workers = 1

    print("=" * 60)
    print(f"🚀 Starting Welyft Scalable RAG Server")
    print(f"🌐 Host: http://{host}:{port}")
    print(f"⚡ Workers: {workers} async worker (handles {settings.MAX_CONCURRENT_REQUESTS} concurrent requests)")
    print(f"🛡️ Concurrency Limit: {settings.MAX_CONCURRENT_REQUESTS} requests")
    print(f"💾 Caching: {'ENABLED' if settings.ENABLE_CACHE else 'DISABLED'}")
    print("=" * 60)

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        workers=workers,
        loop="auto",
        log_level="info"
    )

if __name__ == "__main__":
    main()
