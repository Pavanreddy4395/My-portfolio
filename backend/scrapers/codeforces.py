from __future__ import annotations

from datetime import datetime, timezone

import requests


def _get_codeforces_problems_solved(username: str) -> int | None:
    url = f"https://codeforces.com/api/user.status?handle={username}&from=1&count=10000"
    response = requests.get(url, timeout=12)
    response.raise_for_status()
    data = response.json()
    if data.get("status") != "OK":
        return None

    unique: set[tuple[int | None, str | None]] = set()
    for sub in (data.get("result") or []):
        if not isinstance(sub, dict):
            continue
        if (sub.get("verdict") or "").upper() != "OK":
            continue
        problem = sub.get("problem")
        if not isinstance(problem, dict):
            continue
        contest_id = problem.get("contestId")
        index = problem.get("index")
        key = (int(contest_id) if contest_id is not None else None, str(index) if index is not None else None)
        if key[1] is None:
            continue
        unique.add(key)

    return len(unique)


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

    problems_solved: int | None = None
    try:
        problems_solved = _get_codeforces_problems_solved(username)
    except Exception:
        problems_solved = None

    return {
        "handle": user.get("handle") or username,
        "rating": user.get("rating"),
        "max_rating": user.get("maxRating"),
        "rank": user.get("rank"),
        "max_rank": user.get("maxRank"),
        "problems_solved": problems_solved,
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
        rank = row.get("rank")
        if ts is None or new_rating is None:
            continue
        try:
            d = datetime.fromtimestamp(int(ts), tz=timezone.utc).date().isoformat()
            out_row: dict[str, object] = {"date": d, "rating": int(new_rating)}
            if rank is not None:
                try:
                    out_row["rank"] = int(rank)
                except Exception:
                    pass
            history.append(out_row)
        except Exception:
            continue

    return {"handle": username, "history": history}