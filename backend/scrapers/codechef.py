from __future__ import annotations

import re
import json
from datetime import datetime

import requests


_RATING_RE = re.compile(r'class="rating-number[^"]*"\s*>\s*([0-9]+)\s*<', re.I)
_STARS_RE = re.compile(r'class="rating"\s*>\s*([^<]+?)\s*<', re.I)
_TOTAL_SOLVED_RE = re.compile(r"Total\s+Problems\s+Solved:\s*([0-9]+)", re.I)
_ALL_RATING_RE = re.compile(r"var\s+all_rating\s*=\s*(\[[\s\S]*?\])\s*;", re.I)


def get_codechef_stats(username: str | None):
    if not username:
        return {"error": "Missing username"}

    url = f"https://www.codechef.com/users/{username}"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        response = requests.get(url, headers=headers, timeout=12)
        response.raise_for_status()
        html = response.text or ""
    except Exception:
        return {"error": "Failed to fetch CodeChef stats"}

    rating_match = _RATING_RE.search(html)
    stars_match = _STARS_RE.search(html)
    total_solved_match = _TOTAL_SOLVED_RE.search(html)

    rating = int(rating_match.group(1)) if rating_match else None
    stars = (stars_match.group(1).strip() if stars_match else None)
    problems_solved = int(total_solved_match.group(1)) if total_solved_match else None

    # If the page structure changes, return a friendly error.
    if rating is None and not stars:
        return {"error": "Failed to parse CodeChef stats"}

    return {
        "username": username,
        "rating": rating,
        "stars": stars,
        "problems_solved": problems_solved,
    }


def get_codechef_rating_history(username: str | None, limit: int = 20):
    if not username:
        return {"error": "Missing username"}

    url = f"https://www.codechef.com/users/{username}"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        response = requests.get(url, headers=headers, timeout=12)
        response.raise_for_status()
        html = response.text or ""
    except Exception:
        return {"error": "Failed to fetch CodeChef rating history"}

    m = _ALL_RATING_RE.search(html)
    if not m:
        return {"error": "Failed to parse CodeChef rating history"}

    try:
        rows = json.loads(m.group(1))
    except Exception:
        return {"error": "Failed to parse CodeChef rating history"}

    history: list[dict[str, object]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        end_date = row.get("end_date")
        rating = row.get("rating")
        rank = row.get("rank")
        if not end_date or rating is None:
            continue

        try:
            d = datetime.fromisoformat(str(end_date).replace(" ", "T")).date().isoformat()
        except Exception:
            try:
                d = str(end_date).split(" ")[0]
            except Exception:
                continue

        try:
            rating_value = int(rating)
        except Exception:
            continue

        out: dict[str, object] = {"date": d, "rating": rating_value}
        if rank is not None:
            try:
                out["rank"] = int(rank)
            except Exception:
                pass
        history.append(out)

    if limit and len(history) > limit:
        history = history[-limit:]

    return {"username": username, "history": history}