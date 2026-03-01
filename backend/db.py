import logging
import os
import time

import psycopg2
from psycopg2.extras import RealDictCursor

logger = logging.getLogger(__name__)
_connection = None
_last_health_check = 0.0
_HEALTH_CHECK_INTERVAL = 30.0  # seconds


def _get_connection():
    global _connection, _last_health_check
    now = time.monotonic()

    if _connection is not None and not _connection.closed:
        if now - _last_health_check < _HEALTH_CHECK_INTERVAL:
            return _connection
        try:
            with _connection.cursor() as cur:
                cur.execute("SELECT 1")
            _last_health_check = now
            return _connection
        except Exception:
            logger.warning("DB connection stale, reconnecting...")
            try:
                _connection.close()
            except Exception:
                pass
            _connection = None

    for attempt in range(3):
        try:
            _connection = psycopg2.connect(
                host=os.environ["DB_HOST"],
                port=int(os.environ.get("DB_PORT", 5432)),
                dbname=os.environ["DB_NAME"],
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
                connect_timeout=5,
            )
            _connection.autocommit = False
            _last_health_check = now
            return _connection
        except psycopg2.OperationalError:
            if attempt == 2:
                raise
            logger.warning("DB connect attempt %d failed, retrying...", attempt + 1)

    raise RuntimeError("Failed to establish database connection")


def save_result(
    animal_id: str,
    *,
    client_ip: str = "",
    user_agent: str = "",
    accept_language: str = "",
    referer: str = "",
    country: str = "",
):
    conn = _get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO animal_face_results
                   (animal_id, client_ip, user_agent, accept_language, referer, country)
                   VALUES (%s, %s, %s, %s, %s, %s)""",
                (animal_id, client_ip, user_agent[:512], accept_language, referer, country),
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


def get_stats() -> dict:
    conn = _get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT COUNT(*) AS total FROM animal_face_results")
        total = cur.fetchone()["total"]

        cur.execute(
            """
            SELECT animal_id, COUNT(*) AS count
            FROM animal_face_results
            GROUP BY animal_id
            ORDER BY count DESC
            """
        )
        per_animal = [dict(row) for row in cur.fetchall()]

    return {"total": total, "per_animal": per_animal}
