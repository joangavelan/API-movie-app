const Modal = (() => {
    //cache the DOM
    const modalEl = document.querySelector('.modal');
    const loadingBars = document.querySelector('.loading-bars')
    const poster = document.querySelector('.poster');
    const overview = document.querySelector('.overview');
    const review = document.querySelector('.review');
    const release = document.querySelector('.release-year');

    const load = () => {
        modalEl.classList.add('show');
        loadingBars.classList.add('show');
    }

    const set = (movieObj) => {
        //setting up values
        poster.src = movieObj.image;
        overview.innerHTML = movieObj.overview;
        review.innerHTML = movieObj.review;
        release.innerHTML = movieObj.release;
        //loading bars removed 1.7s after the response
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