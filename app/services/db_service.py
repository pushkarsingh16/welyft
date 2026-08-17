import os
import json
import sqlite3
import logfire
from datetime import datetime
from typing import List, Dict, Any, Optional
from app.config import settings

# Attempt psycopg2 import for PostgreSQL
try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    HAS_PSYCOPG2 = True
except ImportError:
    HAS_PSYCOPG2 = False

# Local fallback SQLite database path if PostgreSQL connection is unavailable
SQLITE_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "local_chat_history.db")

class DatabaseService:
    def __init__(self):
        self.is_postgres_active = False

    def get_pg_connection(self):
        """Attempts to connect to PostgreSQL database using configured environment settings."""
        if not HAS_PSYCOPG2:
            return None
        try:
            conn = psycopg2.connect(
                dbname=settings.POSTGRES_DB,
                user=settings.POSTGRES_USER,
                password=settings.POSTGRES_PASSWORD,
                host=settings.POSTGRES_HOST,
                port=settings.POSTGRES_PORT,
                connect_timeout=3
            )
            conn.autocommit = True
            return conn
        except Exception as e:
            # Fall back or report error
            return None

    def init_db(self):
        """Initializes database tables in PostgreSQL if available, or fallback SQLite database."""
        conn = self.get_pg_connection()
        if conn:
            try:
                with conn.cursor() as cur:
                    # Create chat_sessions table
                    cur.execute("""
                        CREATE TABLE IF NOT EXISTS chat_sessions (
                            session_id VARCHAR(255) PRIMARY KEY,
                            email VARCHAR(255),
                            status VARCHAR(50) DEFAULT 'active',
                            interested_topics TEXT,
                            pitched_services TEXT,
                            lead_summary TEXT,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        );
                    """)
                    # Create chat_messages table
                    cur.execute("""
                        CREATE TABLE IF NOT EXISTS chat_messages (
                            id SERIAL PRIMARY KEY,
                            session_id VARCHAR(255) REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
                            sender VARCHAR(50) NOT NULL,
                            message TEXT NOT NULL,
                            timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        );
                    """)
                conn.close()
                self.is_postgres_active = True
                logfire.info(f"🐘 PostgreSQL Database tables initialized successfully ({settings.POSTGRES_DB}@{settings.POSTGRES_HOST}).")
                return
            except Exception as e:
                logfire.warning(f"PostgreSQL Table initialization failed: {e}. Switching to local SQLite fallback database.")

        # Fallback to local SQLite database if Postgres is not accessible
        try:
            sq_conn = sqlite3.connect(SQLITE_DB_PATH)
            with sq_conn:
                sq_conn.execute("""
                    CREATE TABLE IF NOT EXISTS chat_sessions (
                        session_id TEXT PRIMARY KEY,
                        email TEXT,
                        status TEXT DEFAULT 'active',
                        interested_topics TEXT,
                        pitched_services TEXT,
                        lead_summary TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                sq_conn.execute("""
                    CREATE TABLE IF NOT EXISTS chat_messages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        session_id TEXT,
                        sender TEXT NOT NULL,
                        message TEXT NOT NULL,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id)
                    );
                """)
            sq_conn.close()
            logfire.info(f"💾 Local SQLite chat database initialized at {SQLITE_DB_PATH}")
        except Exception as sqlite_err:
            logfire.error(f"SQLite fallback DB initialization failed: {sqlite_err}")

    def save_message(self, session_id: str, sender: str, message: str):
        """Saves an individual chat message to PostgreSQL (or SQLite fallback)."""
        conn = self.get_pg_connection()
        if conn:
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO chat_sessions (session_id, updated_at) VALUES (%s, CURRENT_TIMESTAMP) ON CONFLICT (session_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;",
                        (session_id,)
                    )
                    cur.execute(
                        "INSERT INTO chat_messages (session_id, sender, message) VALUES (%s, %s, %s);",
                        (session_id, sender, message)
                    )
                conn.close()
                return
            except Exception as e:
                logfire.warning(f"Error saving message to PostgreSQL: {e}")

        # SQLite Fallback
        try:
            sq_conn = sqlite3.connect(SQLITE_DB_PATH)
            with sq_conn:
                sq_conn.execute(
                    "INSERT OR REPLACE INTO chat_sessions (session_id, updated_at) VALUES (?, CURRENT_TIMESTAMP);",
                    (session_id,)
                )
                sq_conn.execute(
                    "INSERT INTO chat_messages (session_id, sender, message) VALUES (?, ?, ?);",
                    (session_id, sender, message)
                )
            sq_conn.close()
        except Exception as sqlite_err:
            logfire.error(f"Error saving message to SQLite fallback: {sqlite_err}")

    def save_ended_session(
        self,
        session_id: str,
        email: str,
        messages: List[Dict[str, Any]],
        interested_topics: List[str],
        pitched_services: List[str],
        lead_summary: str
    ):
        """
        Saves full chat session history and sales lead information (email, searched topics, pitched services)
        to PostgreSQL (or SQLite fallback).
        """
        topics_str = json.dumps(interested_topics)
        pitched_str = json.dumps(pitched_services)

        conn = self.get_pg_connection()
        if conn:
            try:
                with conn.cursor() as cur:
                    # Upsert session summary record
                    cur.execute("""
                        INSERT INTO chat_sessions (session_id, email, status, interested_topics, pitched_services, lead_summary, updated_at)
                        VALUES (%s, %s, 'ended', %s, %s, %s, CURRENT_TIMESTAMP)
                        ON CONFLICT (session_id) 
                        DO UPDATE SET email = EXCLUDED.email,
                                      status = 'ended',
                                      interested_topics = EXCLUDED.interested_topics,
                                      pitched_services = EXCLUDED.pitched_services,
                                      lead_summary = EXCLUDED.lead_summary,
                                      updated_at = CURRENT_TIMESTAMP;
                    """, (session_id, email, topics_str, pitched_str, lead_summary))

                    # Batch save messages if provided
                    for msg in messages:
                        sender = msg.get("type") or msg.get("role") or "unknown"
                        text = msg.get("text") or msg.get("content") or ""
                        if text:
                            cur.execute("""
                                INSERT INTO chat_messages (session_id, sender, message)
                                VALUES (%s, %s, %s);
                            """, (session_id, sender, text))
                conn.close()
                logfire.info(f"✅ Lead session saved to PostgreSQL: email={email}, session={session_id}")
                return True
            except Exception as e:
                logfire.warning(f"Error saving ended session to PostgreSQL: {e}")

        # SQLite Fallback
        try:
            sq_conn = sqlite3.connect(SQLITE_DB_PATH)
            with sq_conn:
                sq_conn.execute("""
                    INSERT OR REPLACE INTO chat_sessions (session_id, email, status, interested_topics, pitched_services, lead_summary, updated_at)
                    VALUES (?, ?, 'ended', ?, ?, ?, CURRENT_TIMESTAMP);
                """, (session_id, email, topics_str, pitched_str, lead_summary))

                for msg in messages:
                    sender = msg.get("type") or msg.get("role") or "unknown"
                    text = msg.get("text") or msg.get("content") or ""
                    if text:
                        sq_conn.execute("""
                            INSERT INTO chat_messages (session_id, sender, message)
                            VALUES (?, ?, ?);
                        """, (session_id, sender, text))
            sq_conn.close()
            logfire.info(f"✅ Lead session saved to SQLite fallback: email={email}, session={session_id}")
            return True
        except Exception as sqlite_err:
            logfire.error(f"Error saving ended session to SQLite fallback: sqlite_err={sqlite_err}")
            return False

db_service = DatabaseService()
