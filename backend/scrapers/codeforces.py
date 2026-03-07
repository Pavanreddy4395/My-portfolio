from __future__ import annotations

from datetime import datetime, timezone

import requests


def get_codeforces_stats(username: str | None):
    if not username:
        return {"error": "Missing username"}

    url = f"https://codeforces.com/api/user.info?handles={username}"

    try:
        response = requests.get(url, timeout=12)
        response.raise_for_status()
        data = response.json()
    except Exception:
        return {"error": "Failed to fetch Codeforces stats"}

    if data.get("status") != "OK":
        return {"error": "User not found"}

    user = (data.get("result") or [{}])[0]

    return {
        "handle": user.get("handle") or username,
        "rating": user.get("rating"),
        "max_rating": user.get("maxRating"),
        "rank": user.get("rank"),
        "max_rank": user.get("maxRank"),
    }


def get_codeforces_rating_history(username: str | None, limit: int = 20):
    if not username:
        return {"error": "Missing username"}

    url = f"https://codeforces.com/api/user.rating?handle={username}"

    try:
        response = requests.get(url, timeout=12)
        response.raise_for_status()
        data = response.json()
    except Exception:
        return {"error": "Failed to fetch Codeforces rating history"}

    if data.get("status") != "OK":
        return {"error": "User not found"}

    result = data.get("result") or []
    points = result[-limit:] if limit and len(result) > limit else result

    history: list[dict[str, object]] = []
    for row in points:
        if not isinstance(row, dict):
            continue
        ts = row.get("ratingUpdateTimeSeconds")
        new_rating = row.get("newRating")
        if ts is None or new_rating is None:
            continue
        try:
            d = datetime.fromtimestamp(int(ts), tz=timezone.utc).date().isoformat()
            history.append({"date": d, "rating": int(new_rating)})
        except Exception:
            continue

    return {"handle": username, "history": history}