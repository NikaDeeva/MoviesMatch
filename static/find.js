document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('findBtn');

    async function get_movies(){
        const response = await fetch("/get_movies", { method: "GET" });
        const data = await response.json();
        return data;
    }

    btn.addEventListener('click', async function () {
        //  e.preventDefault();
        const movies = await get_movies();
        const genre = document.getElementById('genre').value;
        const mood = document.getElementById('mood').value;
        // const duration = document.getElementById('duration').value;

        for (const movie of movies) {
            movie.score = 0; 
            // if (movie.duration <= 90) movie.length = 'short';
            // else if (movie.duration <= 120) movie.length = 'medium';
            // else movie.length = 'long';

            if (movie.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())) movie.score += 2;
            if (movie.mood === mood) movie.score += 1;
            // if (movie.length === duration) movie.score += 1;
        }

        const filteredMovies = movies.filter(movie => movie.score !== 0);
        const sortedMovies = filteredMovies.sort((a, b) => b.score - a.score);

        const list = document.getElementById('findList');
        list.innerHTML = ''; 

        for (const m of sortedMovies) {
            const li = document.createElement('li');
            li.classList.add('find__item');
            li.innerHTML = `
                <img src="${m.poster ? m.poster : 'placeholder.jpg'}" alt="${m.name}">
                <h3 class="find__name">${m.name}</h3>
                <p class="find__year-wrap">Year: <span class="find__year">${m.year}</span></p>
                <p class="find__genre-wrap">Genre: <span class="find__genre">${m.genre.join(", ")}</span></p>
                <p class="find__rating-wrap">Rating: <span class="find__rating">${m.rating}</span></p>
                <div class="add__btn-wrap">
    <button class="add__btn" type="button" id="addToFavs">Add to favourites</button>
</div>
            `;
            list.appendChild(li);
        }
    });
});
