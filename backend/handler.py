import base64
import json
import logging
import os
import re

import animal_matcher
import db

logger = logging.getLogger(__name__)

CORS_HEADERS = {
    "Access-Control-Allow-Origin":  os.environ.get("CORS_ORIGIN", "*"),
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Accept-Language",
}

MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB


def _response(status: int, body: dict) -> dict:
    return {
        "statusCode": status,
        "headers":    {**CORS_HEADERS, "Content-Type": "application/json"},
        "body":       json.dumps(body),
    }


def options(event: dict, context) -> dict:
    return {
        "statusCode": 204,
        "headers": CORS_HEADERS,
        "body": "",
    }


def _extract_image_from_multipart(body: bytes, content_type: str) -> bytes:
    boundary_match = re.search(r"boundary=([^\s;]+)", content_type)
    if not boundary_match:
        raise ValueError("Missing boundary in Content-Type header.")

    boundary = boundary_match.group(1).strip(' "').encode()
    parts = body.split(b"--" + boundary)

    for part in parts:
        if b"Content-Disposition" not in part:
            continue
        if b'name="image"' not in part and b'name="file"' not in part:
            continue
        split = part.split(b"\r\n\r\n", 1)
        if len(split) < 2:
            continue
        image_data = split[1]
        if image_data.endswith(b"--\r\n"):
            image_data = image_data[:-4]
        elif image_data.endswith(b"--"):
            image_data = image_data[:-2]
        if image_data.endswith(b"\r\n"):
            image_data = image_data[:-2]
        return image_data

    raise ValueError("No image field found in multipart form data.")


def analyze(event: dict, context) -> dict:
    is_base64 = event.get("isBase64Encoded", False)
    raw_body = event.get("body", "")

    if raw_body is None:
        return _response(400, {"error": "Empty request body."})

    if is_base64:
        try:
            body_bytes = base64.b64decode(raw_body)
        except Exception:
            return _response(400, {"error": "Invalid base64-encoded body."})
    else:
        body_bytes = raw_body.encode("utf-8")

    content_type = ""
    headers = event.get("headers") or {}
    client_ip = ""
    user_agent = ""
    accept_language = ""
    referer = ""
    country = ""
    for key, value in headers.items():
        lower_key = key.lower()
        if lower_key == "content-type":
            content_type = value
        elif lower_key == "x-forwarded-for":
            client_ip = value.split(",")[0].strip()
        elif lower_key == "user-agent":
            user_agent = value
        elif lower_key == "accept-language":
            accept_language = value[:128]
        elif lower_key == "referer":
            referer = value[:512]
        elif lower_key == "cloudfront-viewer-country":
            country = value

    if not client_ip:
        client_ip = event.get("requestContext", {}).get("identity", {}).get("sourceIp", "")

    if "multipart/form-data" in content_type:
        try:
            image_bytes = _extract_image_from_multipart(body_bytes, content_type)
        except ValueError as exc:
            return _response(400, {"error": str(exc)})
    else:
        image_bytes = body_bytes

    if len(image_bytes) > MAX_IMAGE_SIZE:
        return _response(413, {"error": "Image too large. Maximum size is 10MB."})

    try:
        features = animal_matcher.extract_features(image_bytes)
    except ValueError as exc:
        return _response(422, {"error": str(exc)})

    matches = animal_matcher.match_animal(features)
    top_animal = matches[0]["id"] if matches else "unknown"

    try:
        db.save_result(
            top_animal,
            client_ip=client_ip,
            user_agent=user_agent,
            accept_language=accept_language,
            referer=referer,
            country=country,
        )
    except Exception:
        logger.warning("Failed to save analysis result for animal: %s", top_animal, exc_info=True)

    return _response(200, {"topAnimal": top_animal, "matches": matches})


def health(event: dict, context) -> dict:
    return _response(200, {"status": "ok", "service": "animal-face-api"})


def stats(event: dict, context) -> dict:
    try:
        raw = db.get_stats()
        result = {
            "totalAnalyses": raw["total"],
            "animalCounts": {row["animal_id"]: row["count"] for row in raw["per_animal"]},
        }
    except Exception:
        logger.exception("Failed to retrieve statistics")
        return _response(500, {"error": "Failed to retrieve statistics."})
    return _response(200, result)
