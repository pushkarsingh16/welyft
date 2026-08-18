import logfire
from app.agents.state import AgentState
from app.gateway import portkey_client, extract_cache_status

PREDEFINED_OFF_TOPIC_RESPONSE = (
    "I am Welyft's AI assistant specialized in logistics, electric fleet operations, delivery services, and shipping support. "
    "I cannot assist with math, general trivia, or non-Welyft topics. How can I help you with Welyft's logistics services today?"
)

PREDEFINED_GREETING_RESPONSE = (
    "Hello! Welcome to Welyft. I'm your AI assistant for logistics, deliveries, fleet services, enterprise shipping, and platform support. "
    "How can I help you today?"
)

def generate_node(state: AgentState):
    """
    Synthesizes a response using Documentation Context AND Conversation History.
    Instantly returns predefined responses for OFF_TOPIC or GREETING queries to save LLM calls.
    """
    query = state["current_query"]
    user_msg = state["messages"][-1]["content"] if state["messages"] else ""

    # ⚡ Instant Return 1: Off-Topic Queries (Math, Trivia, Jokes) -> 0 LLM Calls
    if query == "OFF_TOPIC":
        logfire.info("⚡ Serving predefined OFF_TOPIC response (0 LLM tokens used).")
        return {
            "final_answer": PREDEFINED_OFF_TOPIC_RESPONSE,
            "status": "Predefined response served (Off-Topic).",
            "plan": state["plan"] + ["Predefined Answer Served ⚡"],
            "messages": [{"role": "assistant", "content": PREDEFINED_OFF_TOPIC_RESPONSE}]
        }

    # ⚡ Instant Return 2: Basic Greetings -> 0 LLM Calls
    if query == "GREETING":
        logfire.info("⚡ Serving predefined GREETING response (0 LLM tokens used).")
        return {
            "final_answer": PREDEFINED_GREETING_RESPONSE,
            "status": "Predefined response served (Greeting).",
            "plan": state["plan"] + ["Predefined Answer Served ⚡"],
            "messages": [{"role": "assistant", "content": PREDEFINED_GREETING_RESPONSE}]
        }

    # Conversational or Technical LLM Synthesis
    history_str = ""
    for msg in state["messages"][:-1]:
        role = "User" if msg["role"] == "user" else "Assistant"
        history_str += f"{role}: {msg['content']}\n"

    if query == "CONVERSATIONAL":
        logfire.info("Generating conversational response using memory.")
        prompt = f"""
        You are a friendly and helpful AI Assistant for Welyft.
        Keep your answers VERY short, concise, and highly helpful. 
        Do NOT use long paragraphs or large lists of bullet points. Get straight to the point in 1-3 sentences.
        CRITICAL: ONLY answer questions related to Welyft, logistics, shipping, fleet operations, or transportation. 
        If the user asks you to tell a joke, write a poem, or asks about anything unrelated, state your purpose politely.
        
        Answer the user's latest message using the CONVERSATION HISTORY below.

        CONVERSATION HISTORY:
        {history_str}

        LATEST MESSAGE:
        "{user_msg}"
        """
    else:
        logfire.info("Generating technical RAG response.")
        max_context_chars = 10000
        full_context = ""

        for doc in state["documents"]:
            if len(full_context) + len(doc) < max_context_chars:
                full_context += doc + "\n\n"
            else:
                logfire.warning("Context truncated to fit TPM limits.")
                break

        prompt = f"""
        You are a highly efficient AI Assistant for Welyft.
        Keep your answers VERY short, concise, and easy to read for users on a website. 
        Do NOT use long paragraphs or large lists of bullet points. Synthesize the information into 1-3 short sentences.
        CRITICAL: ONLY answer questions related to Welyft, logistics, shipping, fleet operations, or transportation. 
        If the user asks you to tell a joke, write a poem, or asks about anything unrelated, state your purpose politely.

        Answer the question using the TECHNICAL CONTEXT provided.

        TECHNICAL CONTEXT:
        {full_context}

        CONVERSATION HISTORY:
        {history_str}

        USER QUESTION:
        "{user_msg}"
        """

    with logfire.span("✍️ LLM Synthesis"):
        content = None
        status = "Response generated."
        plan_update = state["plan"]

        # 1. Primary: Direct DeepSeek API Call
        from app.config import settings
        if settings.DEEPSEEK_API_KEY:
            try:
                from openai import OpenAI
                ds_client = OpenAI(api_key=settings.DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")
                res = ds_client.chat.completions.create(
                    model=settings.DEEPSEEK_MODEL or "deepseek-chat",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.1,
                    max_tokens=300
                )
                content = res.choices[0].message.content
                logfire.info("✅ Response synthesised via DeepSeek API.")
                plan_update = state["plan"] + ["DeepSeek LLM ⚡"]
                return {
                    "final_answer": content,
                    "status": status,
                    "plan": plan_update,
                    "messages": [{"role": "assistant", "content": content}]
                }
            except Exception as ds_err:
                logfire.warning(f"DeepSeek direct API call notice ({ds_err}). Falling back to Portkey / Groq...")

        # 2. Secondary Fallback: Portkey Gateway
        try:
            response = portkey_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
                max_tokens=250
            )
            content = response.choices[0].message.content
            cache_status = extract_cache_status(response)
            if cache_status == "HIT":
                logfire.info("⚡ Gateway Cache Hit — response served from Portkey cache.")
                plan_update = state["plan"] + ["Cache: Hit ⚡"]
                status = "Cache hit — instant response."
            else:
                logfire.info("✅ Response synthesised via Portkey LLM.")
        except Exception as e:
            logfire.warning(f"Portkey LLM call notice ({e}). Attempting direct Groq fallback...")
            try:
                import os
                from groq import Groq
                groq_key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_FALLBACK_API_KEY")
                if groq_key:
                    groq_client = Groq(api_key=groq_key)
                    res = groq_client.chat.completions.create(
                        messages=[{"role": "user", "content": prompt}],
                        model="llama-3.3-70b-versatile",
                        temperature=0.1,
                        max_tokens=250
                    )
                    content = res.choices[0].message.content
                    logfire.info("✅ Response synthesised via Groq fallback.")
                    plan_update = state["plan"] + ["Groq Fallback ⚡"]
                else:
                    raise e
            except Exception as fallback_err:
                logfire.error(f"LLM Generation failed: {fallback_err}")
                raise fallback_err

        return {
            "final_answer": content,
            "status": status,
            "plan": plan_update,
            "messages": [{"role": "assistant", "content": content}]
        }

