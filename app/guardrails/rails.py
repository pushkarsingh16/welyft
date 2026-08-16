import re
import logfire
from nemoguardrails import RailsConfig, LLMRails

from app.config import settings
from app.guardrails.colang_rules import COLANG_CONTENT, YAML_CONTENT, RAIL_INDICATORS

_rails: LLMRails | None = None

# ── Zero-Latency Jailbreak & Malicious Prompt Patterns ──────────────────────
JAILBREAK_PATTERNS = [
    r"ignore\s+(all\s+)?(previous\s+)?instructions",
    r"you\s+are\s+now\s+dan",
    r"pretend\s+you\s+have\s+no\s+restrictions",
    r"forget\s+your\s+system\s+prompt",
    r"show\s+me\s+your\s+hidden\s+prompt",
    r"act\s+as\s+if\s+you\s+were\s+trained\s+differently",
    r"developer\s+mode",
    r"override\s+your\s+safety",
    r"bypass\s+your\s+guidelines",
    r"act\s+as\s+an\s+unrestricted"
]
JAILBREAK_REGEX = re.compile("|".join(JAILBREAK_PATTERNS), re.IGNORECASE)

# ── Zero-Latency Safe Domain Keywords (Welyft & Logistics) ─────────────────
SAFE_LOGISTICS_KEYWORDS = {
    "welyft", "b2b", "b2c", "c2c", "wemove", "logistics", "delivery", "deliveries",
    "fleet", "van", "shipment", "shipping", "parcel", "courier", "pricing", "rate",
    "cost", "driver", "singapore", "ev", "electric", "green", "co2", "carbon",
    "service", "services", "platform", "saas", "paas", "api", "contact", "support",
    "quote", "book", "booking", "help", "hello", "hi", "hey", "about", "industries",
    "fmcg", "pharma", "healthcare", "cargo", "freight", "hub", "warehouse", "dispatch"
}


def initialize_rails() -> None:
    """
    Build the NeMo LLMRails singleton at app startup.
    """
    global _rails
    try:
        from app.gateway import get_langchain_llm
        guard_llm = get_langchain_llm(feature="guardrails")

        config = RailsConfig.from_content(
            colang_content=COLANG_CONTENT,
            yaml_content=YAML_CONTENT
        )
        _rails = LLMRails(config, llm=guard_llm)
        logfire.info("🛡️ NeMo Guardrails initialized successfully.")
    except Exception as e:
        logfire.warning(f"⚠️ NeMo Guardrails initialization warning: {e}")


_guard_cache: dict[str, tuple[bool, str | None]] = {}

def guard(message: str) -> tuple[bool, str | None]:
    """
    High-speed multi-stage guard:
    Stage 1 (0ms): Fast-path check for known jailbreak patterns.
    Stage 2 (0ms): Fast-path check for safe logistics/Welyft keywords.
    Stage 3 (<1s): Single LLM call via NeMo Guardrails only for ambiguous queries.
    """
    norm = message.strip().lower()
    if not norm:
        return False, None

    if norm in _guard_cache:
        return _guard_cache[norm]

    # ── Stage 1: Zero-latency Jailbreak Interception ──────────────────────────
    if JAILBREAK_REGEX.search(message):
        logfire.info(f"🛡️ Zero-Latency Guardrail Fired: Jailbreak detected in '{message[:60]}'")
        res = (True, "I follow the same operating guidelines regardless of how I'm prompted. I'm here to help with Welyft's logistics services, delivery operations, fleet management, and platform capabilities. How can I assist you?")
        _guard_cache[norm] = res
        return res

    # ── Stage 2: Zero-latency Safe Logistics Allow-List Pass ──────────────────
    # If the user prompt contains ANY logistics/Welyft keyword, pass instantly (0ms)
    words = set(re.findall(r'\b\w+\b', norm))
    if words.intersection(SAFE_LOGISTICS_KEYWORDS):
        logfire.info(f"⚡ Zero-Latency Guardrail Passed: Domain keyword match in '{message[:40]}'")
        res = (False, None)
        _guard_cache[norm] = res
        return res

    # ── Stage 3: NeMo Guardrails LLM Check for Ambiguous Queries ─────────────
    if _rails is None:
        return False, None

    with logfire.span("🛡️ Guardrails Check (LLM)"):
        try:
            result = _rails.generate(messages=[{"role": "user", "content": message}])
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
            logfire.warning(f"⚠️ Guardrails exception: {e} — allowing query.")
            return False, None


