import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from scrapers.codeforces import get_codeforces_rating_history, get_codeforces_stats
from scrapers.leetcode import get_leetcode_calendar, get_leetcode_stats


load_dotenv()

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/codeforces")
def codeforces():
  username = os.getenv("CODEFORCES_USERNAME")
  return get_codeforces_stats(username)


@app.get("/codeforces/rating-history")
def codeforces_rating_history():
  username = os.getenv("CODEFORCES_USERNAME")
  return get_codeforces_rating_history(username)


@app.get("/leetcode")
def leetcode():
  username = os.getenv("LEETCODE_USERNAME")
  return get_leetcode_stats(username)


@app.get("/leetcode/calendar")
def leetcode_calendar():
  username = os.getenv("LEETCODE_USERNAME")
  return get_leetcode_calendar(username)