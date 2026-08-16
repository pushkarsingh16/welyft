import time
import asyncio
import logfire
from typing import Dict, Any, Optional

class AsyncTTLCache:
    """
    In-memory async-safe TTL (Time-To-Live) cache for query responses and embeddings.
    Allows thousands of redundant requests to be answered instantly (0ms LLM time),
    enabling massive concurrent scaling.
    """
    def __init__(self, ttl_seconds: int = 3600, max_size: int = 1000):
        self.ttl_seconds = ttl_seconds
        self.max_size = max_size
        self._cache: Dict[str, dict] = {}
        self._lock = asyncio.Lock()
        self.hits = 0
        self.misses = 0

    def _normalize_key(self, key: str) -> str:
        return key.strip().lower()

    async def get(self, key: str) -> Optional[Any]:
        norm_key = self._normalize_key(key)
        async with self._lock:
            if norm_key in self._cache:
                entry = self._cache[norm_key]
                if time.time() - entry["timestamp"] < self.ttl_seconds:
                    self.hits += 1
                    return entry["value"]
                else:
                    # Expired
                    del self._cache[norm_key]
            self.misses += 1
            return None

    async def set(self, key: str, value: Any) -> None:
        norm_key = self._normalize_key(key)
        async with self._lock:
            # If max size reached, clear oldest 20%
            if len(self._cache) >= self.max_size:
                sorted_keys = sorted(self._cache.keys(), key=lambda k: self._cache[k]["timestamp"])
                for k in sorted_keys[: self.max_size // 5]:
                    del self._cache[k]

            self._cache[norm_key] = {
                "value": value,
                "timestamp": time.time()
            }

    async def clear(self) -> None:
        async with self._lock:
            self._cache.clear()

    def get_stats(self) -> dict:
        total = self.hits + self.misses
        hit_rate = (self.hits / total * 100) if total > 0 else 0.0
        return {
            "entries_count": len(self._cache),
            "hits": self.hits,
            "misses": self.misses,
            "hit_rate_pct": round(hit_rate, 2)
        }

# Global instances
query_cache = AsyncTTLCache(ttl_seconds=3600, max_size=2000)
embedding_cache = AsyncTTLCache(ttl_seconds=86400, max_size=5000)
