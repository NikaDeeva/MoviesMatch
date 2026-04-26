from flask import Flask, render_template, request, jsonify
from random import randint
from storage import load_movies, load_fav, save_to_fav
from models import Movie


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/save_to_fav/<int:movie_id>', methods=["POST"])
def add_to_fav(movie_id):

    movies = load_movies()  # всі фільми
    movie = next((m for m in movies if m.id == movie_id), None)

    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    fav = load_fav()

    # щоб не було дублікатів
    if not any(f.id == movie_id for f in fav):
        fav.append(movie)
        save_to_fav(fav)

    return jsonify({"message": "ok", "id": movie_id})

@app.route("/get_movies", methods=["GET"])
def get_movies():
    movies = load_movies()  # завантажуємо movies_with_posters.json
    return jsonify([movie.__dict__ for movie in movies])

@app.route("/get_fav", methods=["GET"])
def get_fav():
    favs = load_fav()
    return jsonify([f.__dict__ for f in favs])

@app.route("/delete_fav/<int:fav_id>", methods=["DELETE"])
def delete_fav(fav_id):
    favs = load_fav()
    favs = [f for f in favs if f.id != fav_id]
    save_to_fav(favs)
    return jsonify({"message": "deleted", "id": fav_id})

if __name__ == "__main__":
    app.run(debug=True)