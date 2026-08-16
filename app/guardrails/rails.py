from unittest import result
import logfire
from langchain_openai import ChatOpenAI
from nemoguardrails import RailsConfig, LLMRails

from app.config import settings
from app.guardrails.colang_rules import COLANG_CONTENT, YAML_CONTENT, RAIL_INDICATORS


_rails: LLMRails | None = None


def initialize_rails() -> None:
    """
    Build the NeMo LLMRails singleton at app startup.
    Uses deepseek-chat for intent classification.
    """
    global _rails

    from app.gateway import get_langchain_llm
    guard_llm = get_langchain_llm(feature="guardrails")


    config = RailsConfig.from_content(
        colang_content=COLANG_CONTENT,
        yaml_content=YAML_CONTENT
    )

    _rails = LLMRails(config, llm=guard_llm)
    logfire.info("🛡️ NeMo Guardrails initialised (llama-3.1-8b-instant).")
    
    


_guard_cache: dict[str, tuple[bool, str | None]] = {}

def guard(message: str) -> tuple[bool, str | None]:
    if _rails is None:
        logfire.warning("⚠️ Guardrails not initialised — skipping gate.")
        return False, None

    norm = message.strip().lower()
    if norm in _guard_cache:
        return _guard_cache[norm]

    with logfire.span("🛡️ Guardrails Check"):
        try:
            result = _rails.generate(messages=[{"role": "user", "content": message}])
            
            try:
                info = _rails.explain()
                logfire.info(f"🧵 COLANG TRACE: {info.colang_history}")
                for i, call in enumerate(info.llm_calls):
                    logfire.info(f"🧠 LLM CALL {i}: prompt={call.prompt!r} completion={call.completion!r}")
            except Exception as e:
                logfire.error(f"⚠️ explain() itself failed: {e}")

            content = result.get("content", "") if isinstance(result, dict) else str(result)
            fired = any(indicator in content for indicator in RAIL_INDICATORS)

            if fired:
                logfire.info(f"🛡️ Guardrails fired | query='{message[:80]}'")
                res = (True, content)
            else:
                logfire.info("✅ Guardrails passed.")
                res = (False, None)

            _guard_cache[norm] = res
            return res

        except Exception as e:
            logfire.warning(f"⚠️ Guardrails check exception: {e} — falling back to allow.")
            return False, None

