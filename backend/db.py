import logging
import os

import psycopg2
from psycopg2.extras import RealDictCursor

logger = logging.getLogger(__name__)
_connection = None


def _get_connection():
    global _connection
    if _connection is not None and not _connection.closed:
        try:
            with _connection.cursor() as cur:
                cur.execute("SELECT 1")
            return _connection
        except Exception:
            logger.warning("DB connection stale, reconnecting...")
            try:
                _connection.close()
            except Exception:
                pass
            _connection = None

    _connection = psycopg2.connect(
        host=os.environ["DB_HOST"],
        port=int(os.environ.get("DB_PORT", 5432)),
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        connect_timeout=5,
    )
    _connection.autocommit = False
    return _connection


def save_result(animal_id: str):
    conn = _get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO animal_face_results (animal_id) VALUES (%s)",
                (animal_id,),
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
