import os
import logfire
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.config import settings
from app.services.retrieval.embedding import embed_query

# ── Local Qdrant is PRIMARY (instant, 0ms network latency) ──
# Set USE_LOCAL_QDRANT=false in .env to try cloud first instead.
USE_LOCAL_QDRANT = os.getenv("USE_LOCAL_QDRANT", "true").lower() == "true"

_local_client = None
_cloud_client = None

def _get_local_client():
    global _local_client
    if _local_client is None:
        try:
            _local_client = QdrantClient(path="local_qdrant")
        except Exception as e:
            logfire.warning(f"Failed to initialize local Qdrant: {e}")
    return _local_client

def _get_cloud_client():
    global _cloud_client
    if _cloud_client is None:
        try:
            _cloud_client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY,
                timeout=5  # 5s max — never wait 30s+ for a dead cluster
            )
        except Exception as e:
            logfire.warning(f"Failed to initialize Qdrant Cloud client: {e}")
    return _cloud_client


def _query_client(client, query_vector, limit, label=""):
    """Run query_points on a given client and return results list."""
    response = client.query_points(
        collection_name=settings.QDRANT_COLLECTION,
        query=query_vector,
        limit=limit,
        with_payload=True
    )
    results = []
    for res in response.points:
        results.append({
            "content": res.payload.get("text", ""),
            "source": res.payload.get("source", "Unknown"),
            "score": res.score
        })
    if results:
        logfire.info(f"✅ {label} retrieved {len(results)} chunks.")
    return results


def search_enterprise_knowledge(query: str, limit: int = 8):
    """
    Performs a high-precision search in the enterprise knowledge base.
    Local Qdrant is the primary source (instant, no network).
    Cloud Qdrant is only used if USE_LOCAL_QDRANT=false or local fails.
    """
    try:
        query_vector = embed_query(query)

        # ── PRIMARY: Local Qdrant (0ms latency) ──
        if USE_LOCAL_QDRANT:
            try:
                local = _get_local_client()
                if local and local.collection_exists(settings.QDRANT_COLLECTION):
                    results = _query_client(local, query_vector, limit, "Local Qdrant")
                    if results:
                        return results
            except Exception as local_err:
                logfire.warning(f"⚠️ Local Qdrant failed ({local_err}) — trying cloud...")

        # ── FALLBACK: Cloud Qdrant (5s timeout max) ──
        try:
            cloud = _get_cloud_client()
            if cloud is not None:
                results = _query_client(cloud, query_vector, limit, "Qdrant Cloud")
                if results:
                    return results
        except Exception as cloud_err:
            logfire.warning(f"⚠️ Qdrant Cloud failed ({cloud_err})")

        # ── LAST RESORT: try local if cloud was primary ──
        if not USE_LOCAL_QDRANT:
            try:
                local = _get_local_client()
                if local and local.collection_exists(settings.QDRANT_COLLECTION):
                    results = _query_client(local, query_vector, limit, "Local Qdrant (fallback)")
                    if results:
                        return results
            except Exception:
                pass

        return []

    except Exception as e:
        logfire.error(f"❌ Qdrant Search Failed: {e}")
        return []
