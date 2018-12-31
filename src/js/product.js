import Product from './models/Product';
import * as productView from './views/productView';

import Category from './models/Category';
import * as categoryView from './views/categoryView';


/** Global state of the app
 * - Product object
 * - Category object
 */
const pState = {};


/** 
 * Category CONTROLLER
 */
const controlCategory = async () => {

    // 1) New Category object and add to state
    pState.category = new Category();

    try {

        // 2) Get Category lsit
        await pState.category.getResults();

        // 3) Render results on UI
        categoryView.renderResultProductCategory(pState.category.result);
    } catch (err) {
        console.log(err);

    }
}

/** 
 * Carousel CONTROLLER
 */
const controlProduct = async () => {

    const filterKey = window.location.hash.replace('#', '');




    // 1) New Carousel object and add to state
    pState.product = new Product();

    try {

        // 2) Get Carousel lsit
        await pState.product.getResults();


        // 3) Render results on UI
        productView.renderResults(pState.product.result, filterKey);
    } catch (err) {
        console.log(err);

    }
}




// On window load get data
window.addEventListener('load', () => {

    if (window.location.pathname == '/product.html') {

        //Products
        controlProduct();

        //Category
        controlCategory();
    }

});

// On Hash Change

window.addEventListener("hashchange", () => {

    const filterKey = window.location.hash.replace('#', '');
    productView.renderResults(pState.product.result, filterKey);
});
