#!/usr/bin/env python3
"""
High-Concurrency Load Testing Script for Welyft Agentic RAG API
Simulates 15 to 30 concurrent user connections sending simultaneous queries.
"""

import sys
import time
import json
import asyncio
import urllib.request
import urllib.error
import argparse
from typing import List, Dict

SAMPLE_QUERIES = [
    "What is Welyft?",
    "How does the electric fleet reduce environmental impact?",
    "Which areas does Welyft operate in Singapore?",
    "Does Welyft offer dedicated fleet contracts for businesses?",
    "Can I book a one-off parcel as an individual?",
    "How fast can I get same-day delivery?",
    "Where can I find Welyft career opportunities?",
    "Can businesses get ESG sustainability reporting from Welyft?",
    "What makes Welyft fleet different from competitors?",
    "What kind of deliveries can Welyft handle?",
    "Hi, how are you today?",
    "What is your pricing model for B2B logistics?",
    "How do drivers sign up for Welyft?",
    "What is Welyft?",  # Intentional repeat to test cache hit speed
    "Which areas does Welyft operate in Singapore?"  # Repeat to test cache
]

def make_request(url: str, payload: dict, timeout: int = 30) -> Dict:
    start_time = time.time()
    data_bytes = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data_bytes,
        headers={"Content-Type": "application/json"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            res_body = response.read().decode('utf-8')
            latency = time.time() - start_time
            res_json = json.loads(res_body)
            return {
                "success": True,
                "status_code": response.status,
                "latency": latency,
                "answer": res_json.get("answer", "")[:60],
                "status": res_json.get("status", "")
            }
    except urllib.error.HTTPError as e:
        latency = time.time() - start_time
        return {
            "success": False,
            "status_code": e.code,
            "latency": latency,
            "error": str(e)
        }
    except Exception as e:
        latency = time.time() - start_time
        return {
            "success": False,
            "status_code": 0,
            "latency": latency,
            "error": str(e)
        }

async def run_single_user(user_id: int, target_url: str, query: str, results: list):
    payload = {
        "q": query,
        "thread_id": f"load_test_user_{user_id}"
    }
    # Offload blocking urllib call to asyncio thread pool
    res = await asyncio.to_thread(make_request, target_url, payload)
    res["user_id"] = user_id
    res["query"] = query
    results.append(res)
    if res["success"]:
        print(f"✅ [User {user_id:02d}] Success in {res['latency']:.2f}s | Query: '{query[:30]}...' -> {res['status']}")
    else:
        print(f"❌ [User {user_id:02d}] Failed in {res['latency']:.2f}s | Error: {res.get('error')}")

async def run_load_test(concurrent_users: int, target_url: str):
    print("=" * 70)
    print(f"🔥 STARTING HIGH-CONCURRENCY LOAD TEST")
    print(f"👥 Concurrent Users: {concurrent_users}")
    print(f"🎯 Target Endpoint: {target_url}")
    print("=" * 70)

    results: List[Dict] = []
    tasks = []

    total_start = time.time()

    # Launch all user requests concurrently at the EXACT same time
    for i in range(concurrent_users):
        query = SAMPLE_QUERIES[i % len(SAMPLE_QUERIES)]
        tasks.append(run_single_user(i + 1, target_url, query, results))

    await asyncio.gather(*tasks)

    total_duration = time.time() - total_start

    # Metrics Calculation
    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]
    latencies = [r["latency"] for r in results]

    avg_latency = sum(latencies) / len(latencies) if latencies else 0
    min_latency = min(latencies) if latencies else 0
    max_latency = max(latencies) if latencies else 0
    success_rate = (len(successful) / concurrent_users) * 100

    print("\n" + "=" * 70)
    print("📊 LOAD TEST RESULTS SUMMARY")
    print("=" * 70)
    print(f"⏱️ Total Execution Time: {total_duration:.2f} seconds")
    print(f"👥 Total Concurrent Users: {concurrent_users}")
    print(f"✅ Successful Requests: {len(successful)} ({success_rate:.1f}%)")
    print(f"❌ Failed Requests: {len(failed)}")
    print(f"🚀 Average Latency: {avg_latency:.2f}s")
    print(f"⚡ Min Latency (Cache Hit): {min_latency:.3f}s")
    print(f"🐢 Max Latency: {max_latency:.2f}s")
    print(f"📈 Throughput: {concurrent_users / total_duration:.2f} requests/sec")
    print("=" * 70)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Load Test RAG API")
    parser.add_argument("--users", type=int, default=15, help="Number of concurrent users")
    parser.add_argument("--url", type=str, default="http://127.0.0.1:8000/query", help="API Endpoint")
    args = parser.parse_args()

    asyncio.run(run_load_test(args.users, args.url))
