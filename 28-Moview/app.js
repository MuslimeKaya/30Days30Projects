// Film API
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// Sayfa yüklendiğinde filmleri getir
getMovies(API_URL);

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            showMovies(data.results);
        } else {
            main.innerHTML = '<div class="error">Film bulunamadı!</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        main.innerHTML = '<div class="error">Bir hata oluştu! Lütfen daha sonra tekrar deneyin.</div>';
    }
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        if (poster_path) {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');

            movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
          <h3>${title}</h3>
          <p>${overview || 'Bu film için açıklama bulunmamaktadır.'}</p>
        </div>
      `;

            main.appendChild(movieEl);
        }
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'yellow';
    } else if (vote >= 3) {
        return 'blue';
    } else {
        return 'pink';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});