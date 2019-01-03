import Product from './models/Product';
import * as productView from './views/productView';

import Category from './models/Category';
import * as categoryView from './views/categoryView';

import { elements } from './views/base';
import Cart from './models/Cart';
import * as cartView from './views/cartView';

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

    //Products
    controlProduct();

    //Category
    controlCategory();

    //Cart Items

    controlCartItems();


});

// On Hash Change

window.addEventListener("hashchange", (e) => {

    const hashKey = window.location.hash.replace('#', '');
    productView.renderResults(pState.product.result, hashKey);
    if (pState.category) categoryView.highlightSelected(hashKey);
});


elements.mMenuNav.addEventListener('click', e => {

    if (e.target.matches('.m-menu__link')) {
        const hashKey = e.target.closest('.m-menu__link').dataset.phash;
        if (window.location.hash.replace('#', '') == hashKey) {
            location.hash = "";
            event.preventDefault();
        }
    }
});

document.querySelector('#category-list').addEventListener('change', () => {
    location.hash = document.querySelector('#category-list').value;
});

// Handling recipe button clicks
elements.productsContainer.addEventListener('click', e => {
    if (e.target.matches('.buy-now')) {

        const prId = e.target.closest('.buy-now').dataset.prid;

        controlProducAddToCart(prId);
    }
});


const controlCartItems = () => {

    pState.cart = new Cart();

    const cartList = pState.cart.getNumcartItem();

    cartItems();

}



// Prodcut add To Cart

const controlProducAddToCart = async (prId) => {

    try {

        // 1) Prdoucts List

        const products = pState.product.result;

        //TODO remove comment
        // 2) Get Carousel lsit 
        // await pState.product.addToCart();

        // if (pState.product.result.response === "Success") {
        // productView.addToCart(prId, products);


        const index = products.findIndex(el => el.id === prId);

        const product = products[index];

        pState.cart.addToCart(
            product.id,
            product.name,
            product.price,
            product.imageURL,
            product.stock,
            1
        );

        pState.cart.getNumcartItem();

        // }

    } catch (err) {
        console.log(err);

    }
}


//Cart

elements.headerUserItemsCart.addEventListener('click', e => {
    cartItems();
    OpenPopup();
});

elements.closeCart.addEventListener('click', () => {
    ClosePopup();
});


const cartItems = () => {
    cartView.clearCart();
    cartView.renderCartItems(pState.cart.cartItems);
};


const OpenPopup = () => {
    document.querySelector('.cart__overlay').style.display = 'block';
    document.querySelector('.cart__window').style.display = 'block';
};

const ClosePopup = () => {
    document.querySelector('.cart__overlay').style.display = 'none';
    document.querySelector('.cart__window').style.display = 'none';
};

