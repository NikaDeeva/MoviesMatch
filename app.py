from flask import Flask, render_template, request, jsonify
from random import randint
from storage import load_movies, load_fav, save_to_fav
from models import Movie


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/save_to_fav/<int:movie_id>', methods=["POST"])
def add_to_fav():
    data = request.get_json()
    fav_movie = Movie(
    name=data["name"],
    year=int(data["year"]),
    duration=int(data["duration"]),
    genre=list(data["genre"]),
    mood=data["mood"],
    rating=int(data["rating"]),
    id=int(data["id"]),
    poster=data["poster"]
)
    fav = load_fav()
    fav.append(fav_movie)
    save_to_fav(fav)  
    return jsonify({"message": "ok", "id": fav_movie.id})

@app.route("/get_movies", methods=["GET"])
def get_movies():
    movies = load_movies()  # завантажуємо movies_with_posters.json
    return jsonify([movie.__dict__ for movie in movies])

@app.route("/get_fav", methods=["GET"])
def get_fav():
    favs = load_fav()
    return jsonify([fav.__dict__ for fav in favs])

@app.route("/delete_fav/<int:fav_id>", methods=["DELETE"])
def delete_fav(fav_id):
    favs = load_fav()
    favs = [f for f in favs if f.id != fav_id]  
    save_to_fav(favs) 
    return jsonify({"message": "fav deleted"})

if __name__ == "__main__":
    app.run(debug=True)