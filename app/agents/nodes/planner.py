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

    # Fast-Path 1: Math Questions -> Predefined OFF_TOPIC
    if MATH_PATTERN.match(user_message):
        logfire.info(f"⚡ Fast-Path Triggered: Math query detected ('{user_message}')")
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Math/Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # Fast-Path 2: Simple Greetings -> Predefined GREETING
    if GREETING_PATTERN.match(user_message):
        logfire.info(f"⚡ Fast-Path Triggered: Simple greeting detected ('{user_message}')")
        return {
            "current_query": "GREETING",
            "status": "Handling greeting with predefined response.",
            "plan": ["Intent: Greeting", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # Fast-Path 3: Keyword Off-Topic check
    lowered = user_message.lower()
    if any(kw in lowered for kw in OFF_TOPIC_KEYWORDS):
        logfire.info(f"⚡ Fast-Path Triggered: Off-topic keyword detected ('{user_message}')")
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    # LLM Planner for context-dependent decisions
    history = ""
    for msg in state["messages"][:-1]:
        role = "User" if msg["role"] == "user" else "Assistant"
        history += f"{role}: {msg['content']}\n"

    prompt = f"""
    You are an intelligent Assistant Planner for Welyft, a logistics and delivery platform.
    Analyze the conversation history and the latest user message.

    CONVERSATION HISTORY:
    {history}

    LATEST MESSAGE:
    "{user_message}"

    Task:
    1. If the latest message is an off-topic question unrelated to logistics/Welyft (e.g., math, trivia, general knowledge, jokes), output 'OFF_TOPIC'.
    2. If it is a basic conversational question relying ONLY on memory (e.g., "what did I just ask?"), output 'CONVERSATIONAL'.
    3. If it is ANY question about Welyft's platform, features, pricing, fleet management, dispatch, order tracking, B2B/B2C/C2C logistics models, driver management, or delivery operations — output a refined search query.

    Output ONLY 'OFF_TOPIC', 'CONVERSATIONAL', or the search query.
    """

    with logfire.span("🧠 Planner Decision"):
        decision = llm.invoke(prompt).content.strip()
        logfire.info(f"Intent identified: {decision}")

    if "OFF_TOPIC" in decision.upper():
        return {
            "current_query": "OFF_TOPIC",
            "status": "Handling off-topic query with predefined response.",
            "plan": ["Intent: Off-Topic", "Retrieval: Skipped", "LLM: Skipped (Predefined Response)"]
        }

    if decision.upper() == "CONVERSATIONAL":
        return {
            "current_query": "CONVERSATIONAL",
            "status": "Handling conversationally (using memory)...",
            "plan": ["Intent: Conversational/Memory", "Retrieval: Skipped"]
        }

    return {
        "current_query": decision,
        "status": f"Technical research needed. Searching for: {decision}",
        "plan": ["Intent: Technical", f"Search Term: {decision}"]
    }
