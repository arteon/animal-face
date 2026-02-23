"""Pytest configuration."""
import sys
import os
from unittest.mock import MagicMock

# Add backend directory to path so imports work
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

# Stub heavy optional dependencies that may not be installed in the test env
for _mod in (
    "mediapipe",
    "mediapipe.solutions",
    "mediapipe.solutions.face_mesh",
):
    if _mod not in sys.modules:
        sys.modules[_mod] = MagicMock()
