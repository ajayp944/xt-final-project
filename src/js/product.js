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
 * Product CONTROLLER
 */
const controlProduct = async () => {

    const filterKey = window.location.hash.replace('#', '');

    // 1) New Product object and add to state
    pState.product = new Product();

    try {

        // 2) Get Carousel lsit
        await pState.product.getResults();

        pState.prductsArr = pState.product.result;

        // 3) Render results on UI
        productView.renderResults(pState.prductsArr, filterKey);
    } catch (err) {
        console.log(err);
    }
}

// Prodcut add To Cart

const controlProductCart = async (prId, type) => {

    try {

        // 1) Http request to get cart success response

        await pState.product.addToCart();

        if (pState.product.result.response === "Success") {

            const index = pState.prductsArr.findIndex(el => el.id === prId);

            const product = pState.prductsArr[index];
            // 2) Add cart item in localstorage
            pState.cart.addToCart(
                product.id,
                product.name,
                product.price,
                product.imageURL,
                product.stock,
                1,
                type
            );

            // 3) Get Cart Items
            pState.cart.getNumcartItem();

        }

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

// Category Change throught list

elements.mMenuNav.addEventListener('click', e => {

    if (e.target.matches('.m-menu__link')) {
        const hashKey = e.target.closest('.m-menu__link').dataset.phash;
        if (window.location.hash.replace('#', '') == hashKey) {
            location.hash = "";
            event.preventDefault();
        }
    }
});

// Category Change throught selectbox

document.querySelector('#category-list').addEventListener('change', () => {
    location.hash = document.querySelector('#category-list').value;
});

// Handling Product add button clicks

elements.productsContainer.addEventListener('click', e => {
    if (e.target.matches('.buy-now')) {

        const prId = e.target.closest('.buy-now').dataset.prid;

        controlProductCart(prId, 'add');
    }
});

// Cart 
const controlCartItems = () => {

    // 1) New Cart object and add to state
    pState.cart = new Cart();

    // Get Cart Value
    const cartList = pState.cart.getNumcartItem();

    // Render cart item in box.
    cartItems();

}

//Cart Item render
const cartItems = () => {
    cartView.clearCart();
    cartView.renderCartItems(JSON.parse(localStorage.getItem('cartItem')));
};
