# import requests


# def get_tryhackme_stats(username):

#     url = f"https://tryhackme.com/api/user/rank/{username}"

#     r = requests.get(url)
#     data = r.json()

#     return {
#         "rank": data.get("rank"),
#         "level": data.get("level"),
#         "points": data.get("points")
#     }


# def get_tryhackme_rooms(username):

#     url = f"https://tryhackme.com/api/user/profile/{username}"

#     r = requests.get(url)
#     data = r.json()

#     return {
#         "rooms_completed": data.get("rooms_completed"),
#         "badges": len(data.get("badges", [])),
#         "streak": data.get("streak")
#     }


# def get_tryhackme_skills(username):

#     url = f"https://tryhackme.com/api/user/profile/{username}"

#     r = requests.get(url)
#     data = r.json()

#     return data.get("skills", {})