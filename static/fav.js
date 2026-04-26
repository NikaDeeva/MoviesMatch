document.addEventListener('DOMContentLoaded', () => {

    // ===================== FAVORITES =====================

    async function getFavs() {
        const response = await fetch("/get_fav");
        return await response.json();
    }

   async function renderFavs() {
    const movies = await getFavs();
    const list = document.getElementById('favList');

    list.innerHTML = '';

    for (const m of movies) {
        const li = document.createElement('li');
li.classList.add('find__item');
        li.innerHTML = `
             <h3 class="find__name">${m.name}</h3>
                <p class="find__year-wrap">Year: <span class="find__year">${m.year}</span></p>
                <p class="find__genre-wrap">Genre: <span class="find__genre">${m.genre.join(", ")}</span></p>
                <p class="find__rating-wrap">Rating: <span class="find__rating">${m.rating}</span></p>
            <button class="deleteFavBtn" data-id="${m.id}">
                Delete
            </button>
        `;

        list.appendChild(li);
    }
}

    // ===================== ADD TO FAVS =====================


      document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('addToFavBtn')) {

        const movieId = e.target.dataset.id;

        await fetch(`/save_to_fav/${movieId}`, {
            method: "POST"
        });

        await renderFavs();
    }
});

    // ===================== DELETE FROM FAVS =====================

    document.getElementById('favList').addEventListener('click', async (e) => {
    if (e.target.classList.contains('deleteFavBtn')) {

        const movieId = e.target.dataset.id;

        await fetch(`/delete_fav/${movieId}`, {
            method: "DELETE"
        });

        await renderFavs();
    }
});

    // initial load
    renderFavs();
});