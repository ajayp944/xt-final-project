import { elements } from './base';

export const clearCart = () => {
    elements.cartItems.innerHTML = '';
};

export const renderCartItems = cartItems => {
    let markup = ``;
    let totalPrice = 0;
    if (cartItems.length <= 0) {
        elements.cartEmpty.style.display = 'block';
        elements.cartItems.style.display = 'none';
        markup = `<div class="cart-empty__box">
                    <div class="cart-empty__content">
                        <h3>No items in your cart</h3>
                        <p>Your favourite items just a click away.</p>
                    </div>
                </div>
                <div class="checkout">
                    <div class="checkout-box ">
                    <a class="btn btn--pink btn-shopping" href="product.html">
                        Start Shopping
                    </a>
                    </div>
                </div>`;
        elements.cartEmpty.innerHTML = markup;
    } else {
        elements.cartEmpty.style.display = 'none';
        elements.cartItems.style.display = 'block';
        
        cartItems.forEach(element => {
            markup = `
            <div class="cart-items__box">
                <div class="cart-items__left">
                    <img src="${element.imageURL}" alt="${element.name}" class="cart-items_img">
                </div>
                <div class="cart-items__right">
                    <div class="cart-items__title">
                        ${element.name}
                    </div>
                    <div class="cart-item__qty">
                        <div class="cart-item__qty--box">
                            <button class="cart-item__qty--btn removeQty" data-cartid="${element.id}"> – </button>
                            <input type="text" id="qty-${element.id}" value="${element.count}" class="cart-item__qty--input" readonly>
                            <label for="qty-${element.id}" class="display-none"> ${element.count} item added in ${element.name} cart</label>
                            <button class="cart-item__qty--btn addQty" data-cartid="${element.id}"> + </button>
                            <span class="cart-item__qty--price"> 
                                &nbsp; x    &nbsp; Rs.${element.price}
                            </span>
                        </div>
                    <div>
                    RS.${parseInt(element.count) * parseInt(element.price)}
                </div>
            </div>`
            elements.cartItems.insertAdjacentHTML('beforeend', markup);

            totalPrice = totalPrice + (parseInt(element.count) * parseInt(element.price));

        });

        let footerSection = `
        <div class="cart__footer">
            <div class="cart__footer--img" class="">
            <img src="./static/images/lowest-price.png" alt="Footer Logo">
            </div>
            <div class="cart__footer--content">
            <p>You can find it cheaper any where.</p>
            </div>
        </div>

        <div class="checkout">
            <div class="checkout-box">
            <p class="checkout-box__description">
                Promo code can be applied on payment page
            </p>
            <button class="btn btn--pink btn-cart">
                <span>
                Proceed to Checkout
                </span>
                <span class="checkout__totalPrice">
                Rs. ${totalPrice} &nbsp; >
                </span>
            </button>
            </div>
        </div>`;
        elements.cartItems.insertAdjacentHTML('beforeend', footerSection);
    }
};