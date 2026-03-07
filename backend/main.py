import os
import threading
import time

try:
  from dotenv import load_dotenv
except ModuleNotFoundError:  # pragma: no cover
  def load_dotenv(*_args, **_kwargs):
    return False
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from scrapers.codeforces import get_codeforces_rating_history, get_codeforces_stats
from scrapers.codechef import get_codechef_stats
from scrapers.codechef import get_codechef_rating_history
from scrapers.leetcode import get_leetcode_calendar, get_leetcode_rating_history, get_leetcode_stats


load_dotenv()


CACHE_TTL_SECONDS = int(os.getenv("SCRAPER_CACHE_TTL_SECONDS", "86400") or "86400")


_cache_lock = threading.Lock()
_cache: dict[str, dict[str, object]] = {}


def _load_and_store(cache_key: str, loader):
  data = loader()
  fetched_at = time.time()
  with _cache_lock:
    _cache[cache_key] = {
      "data": data,
      "fetched_at": fetched_at,
    }
  return data


def _get_cached(cache_key: str, loader):
  now = time.time()
  with _cache_lock:
    entry = _cache.get(cache_key)
    if entry is not None:
      fetched_at = float(entry.get("fetched_at") or 0)
      if (now - fetched_at) < CACHE_TTL_SECONDS:
        return entry.get("data")

  # Cache missing or expired: load synchronously for this request.
  return _load_and_store(cache_key, loader)


def _refresh_loop():
  # Refresh immediately on startup, then once per TTL period.
  while True:
    try:
      _load_and_store(
        "codeforces",
        lambda: get_codeforces_stats(os.getenv("CODEFORCES_USERNAME")),
      )
      _load_and_store(
        "codeforces_rating_history",
        lambda: get_codeforces_rating_history(os.getenv("CODEFORCES_USERNAME")),
      )
      _load_and_store(
        "leetcode",
        lambda: get_leetcode_stats(os.getenv("LEETCODE_USERNAME") or ""),
      )
      _load_and_store(
        "leetcode_calendar",
        lambda: get_leetcode_calendar(os.getenv("LEETCODE_USERNAME") or ""),
      )
      _load_and_store(
        "leetcode_rating_history",
        lambda: get_leetcode_rating_history(os.getenv("LEETCODE_USERNAME") or ""),
      )
    except Exception:
      # Scrapers already handle most failures by returning {"error": ...}.
      # If something unexpected happens, keep existing cached data.
      pass

    time.sleep(CACHE_TTL_SECONDS)

app = FastAPI()


@app.on_event("startup")
def _start_daily_refresh():
  threading.Thread(target=_refresh_loop, daemon=True).start()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/codeforces")
def codeforces():
  return _get_cached(
    "codeforces",
    lambda: get_codeforces_stats(os.getenv("CODEFORCES_USERNAME")),
  )


@app.get("/codeforces/rating-history")
def codeforces_rating_history():
  return _get_cached(
    "codeforces_rating_history",
    lambda: get_codeforces_rating_history(os.getenv("CODEFORCES_USERNAME")),
  )


@app.get("/leetcode")
def leetcode():
  return _get_cached(
    "leetcode",
    lambda: get_leetcode_stats(os.getenv("LEETCODE_USERNAME") or ""),
  )


@app.get("/leetcode/calendar")
def leetcode_calendar():
  return _get_cached(
    "leetcode_calendar",
    lambda: get_leetcode_calendar(os.getenv("LEETCODE_USERNAME") or ""),
  )


@app.get("/leetcode/rating-history")
def leetcode_rating_history():
  return _get_cached(
    "leetcode_rating_history",
    lambda: get_leetcode_rating_history(os.getenv("LEETCODE_USERNAME") or ""),
  )

@app.get("/codechef")
def codechef():
  # Real-time: do not cache CodeChef.
  return get_codechef_stats(os.getenv("CODECHEF_USERNAME"))


@app.get("/codechef/rating-history")
def codechef_rating_history():
  # Real-time: do not cache CodeChef.
  return get_codechef_rating_history(os.getenv("CODECHEF_USERNAME"))