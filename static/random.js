document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('randomBtn');

    async function getMovies() {
        const response = await fetch("/get_movies", { method: "GET" });
        const data = await response.json();
        return data;
    }

    btn.addEventListener('click', async () => {
        const movies = await getMovies();
        let id = Math.floor(Math.random() * movies.length);
        const movie = movies[id];
        const div = document.getElementById('randomMovie');
        div.innerHTML = '';
        div.classList.add('random__movie-added')
        renderMovie(movie.poster, movie.name, movie.year, movie.rating, movie.genre);

    });

    function renderMovie(poster, name, year, rating, genre){
        const div = document.getElementById('randomMovie');
        div.innerHTML = `
          <img src="${poster ? poster : 'placeholder.jpg'}" alt="${name}">
            <h3 class="random__name">${name}</h3>
            <p class="random__year-wrap">Year: <span class="random__year">${year}</span></p>
            <p class="random__genre-wrap">Genre: <span class="random__genre">${genre.join(", ")}</span></p>
            <p class="random__rating-wrap">Rating: <span class="random__rating">${rating}</span></p>
            
        `;
    }
});