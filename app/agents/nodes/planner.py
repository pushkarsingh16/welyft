import re
import logfire
from app.agents.state import AgentState
from app.gateway import get_langchain_llm

llm = get_langchain_llm(feature="planner")

# Predefined Fast-Path Pattern Matches
MATH_PATTERN = re.compile(r'^\s*(what\s+is\s+)?(\d+\s*[\+\-\*\/\^]\s*\d+|\d+\s*plus\s*\d+|\d+\s*minus\s*\d+|\d+\s*times\s*\d+)\s*\??\s*$', re.IGNORECASE)
GREETING_PATTERN = re.compile(r'^\s*(hi|hello|hey|hey\s+there|good\s+(morning|afternoon|evening))\s*[\!\.]?\s*$', re.IGNORECASE)
OFF_TOPIC_KEYWORDS = ["joke", "poem", "story", "weather", "recipe", "who is the president", "capital of"]

def planner_node(state: AgentState):
    """
    Determines user intent. Intercepts off-topic/math/greetings deterministically 
    to avoid wasting LLM calls on non-Welyft queries.
    """
    user_message = state["messages"][-1]["content"].strip() if state["messages"] else ""
    lowered = user_message.lower()

    # Fast-Path 1: Math Questions -> Predefined OFF_TOPIC (0ms)
    if MATH_PATTERN.match(user_message):
        logfire.info(f"⚡ Fast-Path Triggered: Math query detected ('{user_message}')")
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Math/Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # Fast-Path 2: Simple Greetings -> Predefined GREETING (0ms)
    if GREETING_PATTERN.match(user_message):
        logfire.info(f"⚡ Fast-Path Triggered: Simple greeting detected ('{user_message}')")
        return {
            "current_query": "GREETING",
            "status": "Handling greeting with predefined response.",
            "plan": ["Intent: Greeting", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # Fast-Path 3: Keyword Off-Topic check (0ms)
    if any(kw in lowered for kw in OFF_TOPIC_KEYWORDS):
        logfire.info(f"⚡ Fast-Path Triggered: Off-topic keyword detected ('{user_message}')")
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # ⚡ Fast-Path 4: Domain Logistics Keyword Mapping (0ms, 0 LLM Tokens)
    if "b2b" in lowered:
        logfire.info(f"⚡ Fast-Path Triggered: B2B keyword match ('{user_message}')")
        return {
            "current_query": "Welyft B2B enterprise logistics services models",
            "status": "Searching B2B logistics model...",
            "plan": ["Intent: B2B Fast-Path ⚡"]
        }
    if "b2c" in lowered:
        logfire.info(f"⚡ Fast-Path Triggered: B2C keyword match ('{user_message}')")
        return {
            "current_query": "Welyft B2C parcel delivery services",
            "status": "Searching B2C logistics model...",
            "plan": ["Intent: B2C Fast-Path ⚡"]
        }
    if "c2c" in lowered:
        logfire.info(f"⚡ Fast-Path Triggered: C2C keyword match ('{user_message}')")
        return {
            "current_query": "Welyft C2C customer parcel delivery services",
            "status": "Searching C2C logistics model...",
            "plan": ["Intent: C2C Fast-Path ⚡"]
        }
    if "wemove" in lowered:
        logfire.info(f"⚡ Fast-Path Triggered: WeMove keyword match ('{user_message}')")
        return {
            "current_query": "WeMove parcel delivery EV van rental",
            "status": "Searching WeMove services...",
            "plan": ["Intent: WeMove Fast-Path ⚡"]
        }
    if any(kw in lowered for kw in ["co2", "green", "ev", "electric", "emission"]):
        logfire.info(f"⚡ Fast-Path Triggered: Sustainability keyword match ('{user_message}')")
        return {
            "current_query": "Welyft EV electric fleet sustainability CO2 savings",
            "status": "Searching Sustainability model...",
            "plan": ["Intent: Sustainability Fast-Path ⚡"]
        }

    # LLM Planner fallback for complex/unseen questions (strictly short output)
    history = ""
    for msg in state["messages"][:-1]:
        role = "User" if msg["role"] == "user" else "Assistant"
        history += f"{role}: {msg['content']}\n"

    prompt = f"""
    You are an Assistant Planner for Welyft logistics platform.
    Return ONLY a 3 to 5 word search query for retrieving technical documentation.
    Do NOT write sentences, preambles, explanations, or quotes.

    If off-topic (math, jokes), output ONLY 'OFF_TOPIC'.
    If asking about previous message, output ONLY 'CONVERSATIONAL'.

    USER MESSAGE: "{user_message}"
    SEARCH QUERY:"""

    with logfire.span("🧠 Planner Decision"):
        try:
            # Bind max_tokens=30 so response takes <0.5s
            fast_llm = llm.bind(max_tokens=30)
            decision = fast_llm.invoke(prompt).content.strip()
            # Clean any leftover newlines/quotes
            decision = re.sub(r'[\r\n"]+', ' ', decision).strip()
            logfire.info(f"Intent identified: {decision}")
        except Exception as e:
            logfire.warning(f"Planner LLM failed: {e} — using raw query")
            decision = user_message

    if "OFF_TOPIC" in decision.upper():
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    if "CONVERSATIONAL" in decision.upper():
        return {
            "current_query": "CONVERSATIONAL",
            "status": "Handling conversationally (using memory)...",
            "plan": ["Intent: Conversational/Memory", "Retrieval: Skipped"]
        }

    return {
        "current_query": decision,
        "status": f"Searching for: {decision}",
        "plan": ["Intent: Technical", f"Search Term: {decision}"]
    }

