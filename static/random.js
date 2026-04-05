document.addEventListener('DOMContentLoaded', () => {
     const btn = document.getElementById('randomBtn');
     async function getMovies() {
        const movies = await fetch("/get_movies", methods=["GET"]);
        const data = await movies.json();
        return data;
     }
     btn.addEventListener('click', () => {
        const movies = getMovies;
        let id = Math.floor(Math.random * 72);
       const movie = movies[id];
       renderMovie(movie.img, movie.name, movie.year, movie.duration, movie.genre, movie.mood, movie.rating)
     });
     function renderMovie(img, name, year, duration, genre, mood, rating){
      const div = document.getElementsByClassName('random__movie');
      div.innerHTML = `  <img src="${img}" alt="movieImage">
                <h3 class="random__name">${name}</h3>
                <span class="random__year">${year}</span>
                <span class="random__genre"></span>
                <span class="random__rating">${rating}</span>`
     }
})