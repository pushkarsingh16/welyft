import os
import json
import logfire
from typing import List, Dict, Any, Tuple
from app.config import settings

# Key Welyft business domain mappings for service pitching
SERVICE_MAPPINGS = {
    "enterprise_logistics": {
        "title": "B2B Enterprise & Bulk Logistics",
        "keywords": ["enterprise", "b2b", "bulk", "recurring", "dedicated fleet", "sla", "epod", "invoicing", "logistics"],
        "pitch": "Custom B2B Enterprise Delivery Contract with Dedicated EV Fleet, SLA Guarantees, & Automated Invoicing"
    },
    "sustainability_co2": {
        "title": "Live Scope-3 Carbon & Sustainability Ledger",
        "keywords": ["co2", "carbon", "sustainability", "emissions", "green", "scope 3", "scope-3", "reporting", "ledger"],
        "pitch": "Welyft Live Scope-3 ESG Carbon Ledger & Real-Time Emissions Reporting Package"
    },
    "ev_van_rental": {
        "title": "Electric Vehicle (EV) Van Rental",
        "keywords": ["rent", "rental", "van", "ev van", "half-day", "full-day", "hire", "driver"],
        "pitch": "Flexible EV Van Rental (Half-Day / Full-Day) with Dedicated On-Call Driver Support"
    },
    "wemove_delivery": {
        "title": "WeMove On-Demand Parcel Delivery",
        "keywords": ["wemove", "parcel", "on-demand", "instant", "tracking", "last-mile", "b2c", "c2c", "app"],
        "pitch": "WeMove Instant On-Demand Parcel Delivery Business Account with ePOD & Live Tracking"
    },
    "saas_paas_fleet": {
        "title": "Welyft SaaS/PaaS Fleet & Dispatch Management Platform",
        "keywords": ["saas", "paas", "platform", "software", "fleet management", "dispatch", "route optimization", "license"],
        "pitch": "Welyft Enterprise Logistics SaaS/PaaS License for Fleet Dispatch & Route Optimisation"
    }
}

def analyze_chat_topics(messages: List[Dict[str, Any]]) -> Tuple[List[str], List[str], str]:
    """
    Analyzes user messages from a chat session to determine:
    1. Interested Topics: Specific topics searched or discussed.
    2. Pitched Services: Customized Welyft service proposals to offer the client.
    3. Executive Summary: Summary for the sales/client pitch team.
    """
    user_texts = []
    for msg in messages:
        # Extract user text
        role = msg.get("type") or msg.get("role")
        if role == "user":
            text = msg.get("text") or msg.get("content") or ""
            if text:
                user_texts.append(text)

    combined_text = " ".join(user_texts).lower()

    detected_topics = []
    pitched_services = []

    for key, info in SERVICE_MAPPINGS.items():
        # Check if any keyword matches user query text
        if any(kw in combined_text for kw in info["keywords"]):
            detected_topics.append(info["title"])
            pitched_services.append(info["pitch"])

    # Default fallback if general queries were made without specific keyword matches
    if not detected_topics:
        detected_topics.append("General Welyft Logistics Services & Inquiries")
        pitched_services.append("Welyft Standard Business Logistics & EV Fleet Consultation")

    # Generate a brief executive summary for pitching
    summary = (
        f"Client searched about {', '.join(detected_topics)}. "
        f"Recommended sales pitch: {'; '.join(pitched_services)}."
    )

    logfire.info(f"📊 Processed chat topics: {detected_topics} | Pitch: {pitched_services}")
    return detected_topics, pitched_services, summary
