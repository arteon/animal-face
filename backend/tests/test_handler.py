"""Tests for Lambda handler functions."""
import base64
import json
from unittest.mock import patch, MagicMock
import pytest


def _make_event(body=None, headers=None, is_base64=False):
    return {
        "body": body,
        "headers": headers or {},
        "isBase64Encoded": is_base64,
    }


class TestAnalyze:
    """Tests for the analyze endpoint."""

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_returns_200_with_matches(self, mock_matcher, mock_db):
        mock_matcher.extract_features.return_value = {"eye_width_ratio": 0.12}
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

    def test_empty_body_returns_400(self):
        import handler
        event = _make_event(body=None)
        result = handler.analyze(event, None)
        assert result["statusCode"] == 400

    def test_invalid_base64_returns_400(self):
        import handler
        event = _make_event(body="!!!not-base64!!!", is_base64=True)
        result = handler.analyze(event, None)
        assert result["statusCode"] == 400

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_oversized_image_returns_413(self, mock_matcher, mock_db):
        import handler
        # 11MB of data
        large_data = b"x" * (11 * 1024 * 1024)
        event = _make_event(
            body=base64.b64encode(large_data).decode(),
            is_base64=True,
        )
        result = handler.analyze(event, None)
        assert result["statusCode"] == 413

    @patch("handler.db")
    @patch("handler.animal_matcher")
    def test_no_face_returns_422(self, mock_matcher, mock_db):
        mock_matcher.extract_features.side_effect = ValueError("No face detected")
        import handler
        event = _make_event(
            body=base64.b64encode(b"fake-image").decode(),
            is_base64=True,
        )
        result = handler.analyze(event, None)
        assert result["statusCode"] == 422


class TestStats:
    """Tests for the stats endpoint."""

    @patch("handler.db")
    def test_returns_correct_contract(self, mock_db):
        mock_db.get_stats.return_value = {
            "total": 100,
            "per_animal": [
                {"animal_id": "cat", "count": 60},
                {"animal_id": "dog", "count": 40},
            ],
        }
        import handler
        result = handler.stats({}, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 200
        assert "totalAnalyses" in body
        assert "animalCounts" in body
        assert body["totalAnalyses"] == 100
        assert body["animalCounts"]["cat"] == 60

    @patch("handler.db")
    def test_db_error_returns_500_without_details(self, mock_db):
        mock_db.get_stats.side_effect = Exception("connection refused")
        import handler
        result = handler.stats({}, None)
        body = json.loads(result["body"])

        assert result["statusCode"] == 500
        assert "connection refused" not in body["error"]


class TestCorsHeaders:
    """Tests for CORS headers."""

    @patch("handler.db")
    def test_stats_has_cors_headers(self, mock_db):
        mock_db.get_stats.return_value = {"total": 0, "per_animal": []}
        import handler
        result = handler.stats({}, None)
        assert "Access-Control-Allow-Origin" in result["headers"]
        assert "Access-Control-Allow-Methods" in result["headers"]
