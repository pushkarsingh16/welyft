# Welyft Enterprise Agentic RAG Platform

Full-stack logistics delivery web application for Welyft (Singapore) powered by React/Vite, FastAPI, LangGraph, NeMo Guardrails, Portkey Gateway, and Qdrant Vector Search.

## Features
- **Enterprise Agentic RAG Pipeline**: LangGraph stateful multi-node workflow (Planner, Retriever, Responder).
- **High Concurrency & Scalability**: Async non-blocking FastAPI backend, multi-worker process manager (`run_server.py`), and concurrency semaphore limits.
- **Multi-Layer Async Cache**: Predefined fast-path responses, query response TTL cache, and vector embedding caching.
- **NeMo LLM Guardrails**: Safeguards queries against off-topic content and jailbreak attempts.
- **Interactive React Chatbot**: Category-chained support chatbot with real-time response streaming and accurate Welyft logistics documentation integration.

## Getting Started

### 1. Backend Server
```bash
python3 run_server.py
```

### 2. Frontend Application
```bash
npm run dev
```

### 3. Load Benchmark Testing
```bash
python3 load_test.py --users 15
```