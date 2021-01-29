const Modal = (() => {
    //cache the DOM
    const modalEl = document.querySelector('.modal');
    const loadingBars = document.querySelector('.loading-bars')
    const posterEl = document.querySelector('.poster');
    const overviewEl = document.querySelector('.overview');
    const reviewEl = document.querySelector('.review');
    const releaseEl = document.querySelector('.release-year');

    const load = () => {
        modalEl.classList.add('show');
        loadingBars.classList.add('show');
    }

    const set = (movie) => {
        //setting up values
        posterEl.src = movie.image;
        overviewEl.innerHTML = movie.overview;
        reviewEl.innerHTML = movie.review;
        releaseEl.innerHTML = movie.release;
        //loading bars removed 1s after response
        setTimeout(() => {
            loadingBars.classList.remove('show');
        }, 1000);
    }

    return {
        load,
        set
    }

})();

export default Modal;