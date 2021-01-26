//cache the DOM
const moviesEl = document.querySelector('.movies');
const searchEl = document.querySelector('#search');
//API
let searchQuery = 'batman';
const API_KEY = '659755775c442c8c41820f55809c3842';

const getMovies = async () => {
    const MOVIE_ENDPOINT = 'https://api.themoviedb.org'
    const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    const response = await fetch(MOVIE_URL);
    const data = await response.json();
    const movies = [];

    data.results.forEach(movie => {
        const imagePath = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
        const obj = {
            title: movie.title,
            image: imagePath,
            overview: movie.overview,
            release: movie.release_data,
            reviews: movie.vote_average
        }
        movies.push(obj);
    });
    console.log(movies)
    return movies;
}

const render = (movies) => {
    let markup = '';
    movies.forEach(movie => {
        markup += `
            <div class="movie">
                <img src="${movie.image}" class="movie-image">
                <p class="movie-title">${movie.title}</p>
            </div>
        `
        moviesEl.innerHTML = markup;
    })
}


getMovies()
    .then(movies => {
        render(movies)
    })