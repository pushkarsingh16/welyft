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
    
    # Calculate recommended workers: min(CPU_CORES * 2 + 1, 8) or from settings
    cpu_cores = multiprocessing.cpu_count()
    recommended_workers = min(max(cpu_cores, 2), 8)
    workers = settings.WEB_WORKERS or recommended_workers

    print("=" * 60)
    print(f"🚀 Starting Welyft Scalable RAG Server")
    print(f"🌐 Host: http://{host}:{port}")
    print(f"⚡ Workers: {workers} multi-process workers")
    print(f"🛡️ Concurrency Limit per Worker: {settings.MAX_CONCURRENT_REQUESTS} requests")
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
