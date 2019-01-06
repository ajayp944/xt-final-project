import { elements } from './views/base';
import Cart from './models/Cart';
import * as cartView from './views/cartView';

let cState = {};

//Cart
// On window load get data
window.addEventListener('load', () => {
    //Cart Items
    controlCartItems();
});

const controlCartItems = () => {

    // Cart 
    cState.cart = new Cart();
    // Get cart items
    const cartList = cState.cart.getNumcartItem();

    //Render cart item
    renderCartItems();

}

//Render Cart list
const renderCartItems = () => {
    //Clean Cart 
    cartView.clearCart();
    // Get Cart Item
    cState.cart.getNumcartItem();
    // Render Cart Item
    cartView.renderCartItems(JSON.parse(localStorage.getItem('cartItem')));
};

export const controlProductCart = async (prId, type) => {

    try {

        const index = cState.cart.cartItems.findIndex(el => el.id === prId);
        const product = cState.cart.cartItems[index];

        cState.cart.addToCart(
            product.id,
            product.name,
            product.price,
            product.imageURL,
            product.stock,
            1,
            type
        );

        cState.cart.getNumcartItem();

    } catch (err) {
        console.log(err);

    }
}
//Open Cart Popup
elements.headerUserItemsCart.addEventListener('click', e => {
    //render cart item
    renderCartItems();
    OpenPopup();
});

elements.closeCart.addEventListener('click', () => {
    ClosePopup();
});



const OpenPopup = () => {
    document.querySelector('.cart__overlay').style.display = 'block';
    document.querySelector('.cart__window').style.display = 'block';
};

const ClosePopup = () => {
    document.querySelector('.cart__overlay').style.display = 'none';
    document.querySelector('.cart__window').style.display = 'none';
};

//Manage product in cart

elements.cartItems.addEventListener('click', e => {

    //Remove Cart or decrease count of Item
    if (e.target.matches('.removeQty')) {
        const prId = e.target.closest('.removeQty').dataset.cartid;
        let qty = parseInt(e.target.nextElementSibling.value);
        e.target.nextElementSibling.value = parseInt(qty) - 1;
        controlProductCart(prId, 'remove');
        renderCartItems();
    }
    //Add Cart or decrease count of Item
    if (e.target.matches('.addQty')) {
        const prId = e.target.closest('.addQty').dataset.cartid;
        let qty = parseInt(e.target.previousElementSibling.value);
        e.target.previousElementSibling.value = parseInt(qty) + 1;
        console.log(e.target.nextElementSibling.value);
        controlProductCart(prId, 'add');
        renderCartItems();
    }
});


