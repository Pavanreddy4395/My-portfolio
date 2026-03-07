from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
import json

import requests


def _post_graphql(username: str, query: str, variables: dict):
    url = "https://leetcode.com/graphql"
    response = requests.post(
        url,
        json={"query": query, "variables": variables},
        headers={"Content-Type": "application/json"},
        timeout=12,
    )
    response.raise_for_status()
    payload = response.json()
    if payload.get("errors"):
        raise RuntimeError("LeetCode API error")
    return payload


def get_leetcode_stats(username: str):
    if not username:
        return {"error": "Missing username"}

    query = """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
      }
    }
    """

    try:
        payload = _post_graphql(username, query, {"username": username})
    except Exception:
        return {"error": "Failed to fetch LeetCode stats"}

    user = (payload.get("data") or {}).get("matchedUser")
    if not user:
        return {"error": "User not found"}

    contest_rating = ((payload.get("data") or {}).get("userContestRanking") or {}).get("rating")
    try:
        contest_rating = int(round(float(contest_rating))) if contest_rating is not None else None
    except Exception:
        contest_rating = None

    ac_submission_num = ((user.get("submitStats") or {}).get("acSubmissionNum") or [])
    solved_by_difficulty = {
        (row.get("difficulty") or "").strip().lower(): int(row.get("count") or 0)
        for row in ac_submission_num
        if isinstance(row, dict)
    }

    total_solved = solved_by_difficulty.get("all", 0)
    easy_solved = solved_by_difficulty.get("easy", 0)
    medium_solved = solved_by_difficulty.get("medium", 0)
    hard_solved = solved_by_difficulty.get("hard", 0)

    ranking = ((user.get("profile") or {}).get("ranking"))

    return {
        "username": user.get("username") or username,
        "problems_solved": total_solved,
        "ranking": ranking,
        "rating": contest_rating,
        "easy_solved": easy_solved,
        "medium_solved": medium_solved,
        "hard_solved": hard_solved,
    }


def get_leetcode_rating_history(username: str, limit: int = 20):
    if not username:
        return {"error": "Missing username"}

    query = """
    query userContestHistory($username: String!) {
      userContestRankingHistory(username: $username) {
        contest {
          startTime
        }
        rating
        ranking
      }
    }
    """

    try:
        payload = _post_graphql(username, query, {"username": username})
        rows = (payload.get("data") or {}).get("userContestRankingHistory") or []
    except Exception:
        return {"error": "Failed to fetch LeetCode rating history"}

    history: list[dict[str, object]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue

        contest = row.get("contest")
        start_time = contest.get("startTime") if isinstance(contest, dict) else None
        rating = row.get("rating")
        rank = row.get("ranking")

        if start_time is None or rating is None:
            continue

        try:
            d = datetime.fromtimestamp(int(start_time), tz=timezone.utc).date().isoformat()
        except Exception:
            continue

        try:
            rating_value = int(round(float(rating)))
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


def get_leetcode_calendar(username: str, days: int = 364):
    if not username:
        return {"error": "Missing username"}

    query = """
    query userCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
      }
    }
    """

    try:
        payload = _post_graphql(username, query, {"username": username})
        user = (payload.get("data") or {}).get("matchedUser")
        calendar = ((user or {}).get("userCalendar") or {}).get("submissionCalendar")
        calendar_map = json.loads(calendar) if calendar else {}
    except Exception:
        return {"error": "Failed to fetch LeetCode calendar"}

    if not isinstance(calendar_map, dict):
      calendar_map = {}

    today = datetime.now(tz=timezone.utc).date()
    start = today - timedelta(days=days - 1)

    counts: list[int] = []
    for i in range(days):
        d: date = start + timedelta(days=i)
        ts = int(datetime(d.year, d.month, d.day, tzinfo=timezone.utc).timestamp())
        counts.append(int(calendar_map.get(str(ts), 0) or 0))

    return {"username": username, "days": days, "counts": counts}