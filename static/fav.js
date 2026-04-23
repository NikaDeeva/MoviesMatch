document.addEventListener('DOMContentLoaded', () => {
    async function get_movies(){
        const response = await fetch("/get_fav", { method: "GET" });
        const data = await response.json();
        return data;
    }


   async function addFav(){
        const movies = await get_movies();
        
        const list = document.getElementById('favList');
        for (m in movies){ 
            const li = document.createElement('li');
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
        
           
        }
    }
)