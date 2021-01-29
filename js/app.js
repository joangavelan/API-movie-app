import Modal from './modules/modal.js';

const App = (() => {
    //cache the DOM
    const moviesEl = document.querySelector('.movies');
    const searchEl = document.querySelector('#search');
    const modalEl = document.querySelector('.modal');
    const categoriesEl = document.querySelector('.categories');
    //API
    const API_KEY = '659755775c442c8c41820f55809c3842';
    const MOVIE_ENDPOINT = 'https://api.themoviedb.org'

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
        renderMovies(movies);
    }

    const getMovieData = async (ID) => {
        //fetching movie
        const MOVIE_URL = `${MOVIE_ENDPOINT}/3/movie/${ID}?api_key=${API_KEY}`;
        const response = await fetch(MOVIE_URL);
        const movieObj = await response.json();

        //storing wanted data
        const imagePath = `https://image.tmdb.org/t/p/w400/${movieObj.poster_path}`;
        const movie = {
            title: movieObj.title,
            image: imagePath,
            overview: movieObj.overview,
            release: getYear(movieObj.release_date),
            review: movieObj.vote_average
        }
        //showing data
        Modal.set(movie);
    }

    const getGenres = async () => {
        const GENRES_URL = `${MOVIE_ENDPOINT}/3/genre/movie/list?api_key=${API_KEY}`;
        const response = await fetch(GENRES_URL);
        const data = await response.json()
        const genres = data.genres;
        renderGenres(genres);
    }

    const getMoviesByGenre = async (ID) => {
        const GENRE_URL = `${MOVIE_ENDPOINT}/3/discover/movie?api_key=${API_KEY}&with_genres=${ID}`;
        const response = await fetch(GENRE_URL);
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
        renderMovies(movies);
    }

    const getTrendingMovies = async () => {
        const GENRE_URL = `${MOVIE_ENDPOINT}/3/trending/movie/week?api_key=${API_KEY}`;
        const response = await fetch(GENRE_URL);
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
        renderMovies(movies);
    }

    //render functions
    const renderMovies = (movies) => {
        let markup = '';
        movies.forEach(movie => {
            markup += `
                <div class="movie" data-id="${movie.id}">
                    <img src="${movie.image}" class="movie-image">
                    <p class="movie-title">${movie.title}</p>
                </div>
            `
            setValue(moviesEl, markup);
        })
    }

    const renderGenres = (genres) => {
        let markup = '';
        genres.forEach(genre => {
            markup += `
                <li>
                    <i class="fas fa-cubes"></i>
                    <a class="category" data-id="${genre.id}" href="#">${genre.name}</a>
                </li>
            `
        })
        setValue(categoriesEl, markup);
    }

    const init = () => {
        getGenres();
        getTrendingMovies();
    }

    const listeners = () => {
        categoriesEl.addEventListener('click', event => {
            if(event.target.matches('.category')) {
                const genre_id = event.target.dataset.id;
                getMoviesByGenre(genre_id);
            }
        })
    
        searchEl.addEventListener('keypress', event => {
            if(event.keyCode === 13) {
                const searchQuery = searchEl.value;
                getMovies(searchQuery);
                searchEl.value = '';
            }
        })
    
        moviesEl.addEventListener('click', event => {
            if(event.target.matches('.movie-image') || event.target.matches('.movie-title')) {
                const movieItem = event.target.parentElement;
                const movie_id = movieItem.dataset.id;
                Modal.load();
                getMovieData(movie_id);
            }
        })
    
        window.addEventListener('click', event => {
            //close modal
            const closeModal = document.querySelector('.close-icon');
            if(event.target === modalEl || event.target === closeModal) {
                modalEl.classList.remove('show');
            }
            //logo action
            if(event.target.matches('.logo') || event.target.matches('.logo-span')) {
                getTrendingMovies();
            }
        })
    }

    return {
        init,
        listeners
    }
    
})();

App.init();
App.listeners();