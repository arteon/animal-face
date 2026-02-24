"""Pytest configuration — stubs heavy/infra dependencies before any import."""
import sys
import os
from unittest.mock import MagicMock

# Make backend/ directory importable as top-level
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

# Stub mediapipe before animal_matcher is imported (avoids native lib requirement)
for _mod in (
    "mediapipe",
    "mediapipe.solutions",
    "mediapipe.solutions.face_mesh",
):
    if _mod not in sys.modules:
        sys.modules[_mod] = MagicMock()

# Stub psycopg2 so db.py can be imported without a Postgres install
if "psycopg2" not in sys.modules:
    _psycopg2_mock = MagicMock()
    sys.modules["psycopg2"] = _psycopg2_mock
    sys.modules["psycopg2.extras"] = _psycopg2_mock.extras
