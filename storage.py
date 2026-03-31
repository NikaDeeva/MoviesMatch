import json
import os
from models import Movie


def load_data(filename):
    if not os.path.exists(filename):
        return []

    with open(filename, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            return [Movie(**item) for item in data]
        except json.JSONDecodeError:
            return []


def save_data(filename, movies):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump([movie.__dict__ for movie in movies], f, indent=4)


def load_movies():
    return load_data("movies.json")


def load_fav():
    return load_data("fav.json")


def save_to_fav(movies):
    save_data("fav.json", movies)

