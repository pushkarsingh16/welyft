import os
import logfire
from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.config import settings
from app.services.retrieval.embedding import embed_query

_primary_client = None
_fallback_client = None

def _get_client():
    global _primary_client
    if _primary_client is None:
        try:
            _primary_client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY
            )
        except Exception as e:
            logfire.warning(f"Failed to initialize primary Qdrant cloud client: {e}")
    return _primary_client

def _get_fallback_client():
    try:
        return QdrantClient(path="local_qdrant")
    except Exception:
        return None


def search_enterprise_knowledge(query: str, limit: int = 8):
    """
    Performs a high-precision search in the enterprise knowledge base.
    Uses the modern query_points interface with local fallback protection.
    """
    try:
        query_vector = embed_query(query)
        client = _get_client()

        if client is not None:
            try:
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
                    return results
            except Exception as cloud_err:
                logfire.warning(f"⚠️ Qdrant Cloud Search failed ({cloud_err}) — attempting local fallback...")

        # Local Fallback check
        fallback = _get_fallback_client()
        if fallback and fallback.collection_exists(settings.QDRANT_COLLECTION):
            response = fallback.query_points(
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
            logfire.info(f"✅ Local Qdrant retrieved {len(results)} chunks.")
            return results

        return []

    except Exception as e:
        logfire.error(f"❌ Qdrant Search Failed: {e}")
        return []
