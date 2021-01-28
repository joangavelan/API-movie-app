//cache the DOM
const moviesEl = document.querySelector('.movies');
const searchEl = document.querySelector('#search');
const modalEl = document.querySelector('.modal');
const categoriesEl = document.querySelector('.categories');
//API
const API_KEY = '659755775c442c8c41820f55809c3842';
const MOVIE_ENDPOINT = 'https://api.themoviedb.org'
//query
let searchQuery = 'batman';

//helper functions
const getYear = (fullDate) => new Date(fullDate).getFullYear();
const setValue = (elem, value) => elem.innerHTML = value; 

const getMovies = async (query) => {
    const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${query}`;
    const response = await fetch(MOVIE_URL);
    const data = await response.json();
    const movies = [];

    data.results.forEach(movie => {
        const imagePath = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
        const obj = {
            id: movie.id,
            title: movie.title,
            image: imagePath,
        }
        movies.push(obj);
    });
    render(movies);
}

getMovies(searchQuery);

const getMovieData = async (ID) => {
    //fetching movie
    const MOVIE_URL = `${MOVIE_ENDPOINT}/3/movie/${ID}?api_key=${API_KEY}`;
    const response = await fetch(MOVIE_URL);
    const movie = await response.json();
    //storing wanted data
    const imagePath = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
    const movieObj = {
        title: movie.title,
        image: imagePath,
        overview: movie.overview,
        release: getYear(movie.release_date),
        review: movie.vote_average
    }
    //showing data
    openModal(movieObj);
}

const getGenres = async () => {
    const GENRES_URL = `${MOVIE_ENDPOINT}/3/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(GENRES_URL);
    const data = await response.json();

    let markup = '';

    data.genres.forEach(genre => {
        markup += `
            <li data-id="${genre.id}"><a href="#">${genre.name}</a></li>
        `
    })
    categoriesEl.innerHTML = markup;
}

getGenres()

const render = (movies) => {
    let markup = '';
    movies.forEach(movie => {
        markup += `
            <div class="movie" data-id="${movie.id}">
                <img src="${movie.image}" class="movie-image">
                <p class="movie-title">${movie.title}</p>
            </div>
        `
        moviesEl.innerHTML = markup;
    })
}

const openModal = (movieObj) => {
    modalEl.classList.add('show');
    //cache the DOM
    const poster = document.querySelector('.poster');
    const overview = document.querySelector('.overview');
    const review = document.querySelector('.review');
    const release = document.querySelector('.release-year');
    //setting up values
    poster.src = movieObj.image;
    setValue(overview, movieObj.overview);
    setValue(review, movieObj.review);
    setValue(release, movieObj.release)
}

searchEl.addEventListener('keypress', event => {
    if(event.keyCode === 13) {
        searchQuery = searchEl.value;
        getMovies(searchQuery);
        searchEl.value = '';
    }
})

moviesEl.addEventListener('click', function(event) {
    if(event.target.matches('.movie-image') || event.target.matches('.movie-title')) {
        const movieItem = event.target.parentElement;
        const movie_id = movieItem.dataset.id;
        getMovieData(movie_id);
    }
})

window.addEventListener('click', event => {
    const closeModal = document.querySelector('.close-icon');
    if(event.target === modalEl || event.target === closeModal) {
        modalEl.classList.remove('show');
    }
})