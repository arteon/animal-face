"""Tests for Lambda handler functions — 5 API scenario simulations."""
import base64
import json
from unittest.mock import patch
import pytest


def _make_event(body=None, headers=None, is_base64=False):
    return {
        "body": body,
        "headers": headers or {},
        "isBase64Encoded": is_base64,
    }


# ---------------------------------------------------------------------------
# Simulation 1: Health check endpoint
# ---------------------------------------------------------------------------

class TestHealth:
    def test_health_returns_200_with_status_and_service(self):
        import handler
        result = handler.health({}, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 200
        assert body["status"] == "ok"
        assert body["service"] == "animal-face-api"


# ---------------------------------------------------------------------------
# Simulation 2 & 3: Stats endpoint — success and DB failure
# ---------------------------------------------------------------------------

class TestStats:
    @patch("handler.db")
    def test_stats_success_returns_correct_contract(self, mock_db):
        mock_db.get_stats.return_value = {
            "total": 100,
            "per_animal": [{"animal_id": "dog", "count": 30}],
        }
        import handler
        result = handler.stats({}, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 200
        assert body["totalAnalyses"] == 100
        assert "animalCounts" in body
        assert body["animalCounts"]["dog"] == 30

    @patch("handler.db")
    def test_stats_db_failure_returns_500(self, mock_db):
        mock_db.get_stats.side_effect = Exception("connection refused")
        import handler
        result = handler.stats({}, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 500
        assert "connection refused" not in body["error"]

    @patch("handler.db")
    def test_stats_has_cors_headers(self, mock_db):
        mock_db.get_stats.return_value = {"total": 0, "per_animal": []}
        import handler
        result = handler.stats({}, None)
        assert "Access-Control-Allow-Origin" in result["headers"]
        assert "Access-Control-Allow-Methods" in result["headers"]


# ---------------------------------------------------------------------------
# Simulation 4 & 5: Analyze endpoint — empty body and oversized image
# ---------------------------------------------------------------------------

class TestAnalyze:
    def test_empty_body_returns_400(self):
        import handler
        event = _make_event(body=None, headers={})
        result = handler.analyze(event, None)
        assert result["statusCode"] == 400

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_oversized_image_returns_413(self, mock_matcher, mock_db):
        import handler
        large_data = b"x" * (11 * 1024 * 1024)  # 11 MB > 10 MB limit
        event = _make_event(
            body=base64.b64encode(large_data).decode(),
            headers={"content-type": "application/octet-stream"},
            is_base64=True,
        )
        result = handler.analyze(event, None)
        assert result["statusCode"] == 413

    def test_invalid_base64_returns_400(self):
        import handler
        event = _make_event(body="!!!not-base64!!!", is_base64=True)
        result = handler.analyze(event, None)
        assert result["statusCode"] == 400

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_no_face_detected_returns_422(self, mock_matcher, mock_db):
        mock_matcher.extract_features.side_effect = ValueError("No face detected in the image.")
        import handler
        event = _make_event(
            body=base64.b64encode(b"fake-image").decode(),
            is_base64=True,
        )
        result = handler.analyze(event, None)
        assert result["statusCode"] == 422

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_successful_analyze_returns_top_animal_and_matches(self, mock_matcher, mock_db):
        mock_matcher.extract_features.return_value = {"eye_width_ratio": 0.13}
        mock_matcher.match_animal.return_value = [
            {"id": "cat", "name": "Cat", "emoji": "🐱", "percentage": 78.5},
            {"id": "fox", "name": "Fox", "emoji": "🦊", "percentage": 21.5},
        ]
        import handler
        event = _make_event(
            body=base64.b64encode(b"fake-image-data").decode(),
            is_base64=True,
        )
        result = handler.analyze(event, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 200
        assert body["topAnimal"] == "cat"
        assert isinstance(body["matches"], list)
        assert len(body["matches"]) == 2
