import Carousel from './models/Carousel';
import * as carouselView from './views/carouselView';
import Category from './models/Category';
import * as categoryView from './views/categoryView';

/** Global state of the app
 * - Carousel object
 * - Category object
 */
const state = {};

/** 
 * Carousel CONTROLLER
 */
const controlCarousel = async () => {

    // 1) New Carousel object and add to state
    state.carousel = new Carousel();

    try {

        // 2) Get Carousel lsit
        await state.carousel.getResults();

        // 3) Render results on UI
        carouselView.renderResults(state.carousel.result);
    } catch (err) {
        console.log(err);

    }
}

/** 
 * Category CONTROLLER
 */
const controlCategory = async () => {

    // 1) New Category object and add to state
    state.category = new Category();

    try {

        // 2) Get Category lsit
        await state.category.getResults();

        // 3) Render results on UI
        categoryView.renderResults(state.category.result);
    } catch (err) {
        console.log(err);

    }
}


// On window load get data
window.addEventListener('load', () => {

    if (window.location.pathname == '/index.html' || window.location.pathname == '/') {

        //Carousel
        controlCarousel();

        //Category
        controlCategory();
    }
});


