import { elements } from './base';


export const clearCart = () => {
    elements.cartItems.innerHTML = '';
};

export const renderCartItems = cartItems => {
    let markup = ``;
    let totalPrice = 0;
    if (cartItems.length <= 0) {
        markup = `<div class="cart-empty__box">
            <h3>NO Items in the cart</h3>
            <p> Your favorite items are just a click away.
        </div>`;
        elements.cartItems.insertAdjacentHTML('beforeend', markup);
        document.querySelector('.checkout-box').style.display = 'none';
    } else {
        cartItems.forEach(element => {
            markup = `<div class="cart-items__box">
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
                    <input type="text" value="${element.count}" class="cart-item__qty--input" readonly>
                    <button class="cart-item__qty--btn addQty" data-cartid="${element.id}"> + </button>
                    <span class="cart-item__qty--price"> 
                        &nbsp; x    &nbsp; Rs.${element.price}
                        </span>
                    </div>
                    <div>
                    RS.${parseInt(element.count) * parseInt(element.price)}
                    </div>
                </div>
            </div>`
            elements.cartItems.insertAdjacentHTML('beforeend', markup);

            totalPrice = totalPrice + (parseInt(element.count) * parseInt(element.price));

        });
    }
    elements.checkoutTotalPrice.innerHTML = totalPrice + ' >';

    // cart-items

    // const markup = `
    //     <li>
    //         <a class="likes__link" href="#${like.id}">
    //             <figure class="likes__fig">
    //                 <img src="${like.img}" alt="${like.title}">
    //             </figure>
    //             <div class="likes__data">
    //                 <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
    //                 <p class="likes__author">${like.author}</p>
    //             </div>
    //         </a>
    //     </li>
    // `;
    // elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}