import { elements } from "../views/base";

//default
export default class Cart {
    constructor() {
        this.cartItems = [];
        this.cartCount = 0;
    }

    //add product in cart
    addToCart(id, name, price, imageURL, stock, count, type = 'add') {
        const cartItem = { id, name, price, imageURL, stock, count };
        let cartLocalCartItems = JSON.parse(localStorage.getItem('cartItem')) ? JSON.parse(localStorage.getItem('cartItem')) : [];
        if (this.isCart(id)) {

            const index = cartLocalCartItems.findIndex(el => el.id === id);

            if (stock <= cartLocalCartItems[index].count && type == 'add') {
                alert(`You can maximum add ${stock} item in your cart`);
                return false;
            }
            if (type === 'remove') {
                cartLocalCartItems[index].count -= 1;
            } else {
                cartLocalCartItems[index].count += 1;
            }
            if (cartLocalCartItems[index].count == 0) {
                cartLocalCartItems.splice(index, 1);
            }
        } else {
            cartLocalCartItems.push(cartItem);
        }

        let tmpCartCount = 0;

        // Cart Count
        cartLocalCartItems.forEach((curr) => {
            tmpCartCount = tmpCartCount + curr.count;
        });

        let c = 0;
        c = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) + (tmpCartCount - localStorage.getItem('cartCount')) : tmpCartCount;
        // Perist data in localStorage
        this.persistData(cartLocalCartItems, c);
        return true;
    }

    //Check product in cart
    isCart(id) {
        if (JSON.parse(localStorage.getItem('cartItem'))) {
            return JSON.parse(localStorage.getItem('cartItem')).findIndex(el => el.id === id) !== -1;
        } else {
            return false;
        }
    }

    //Get Cart Item
    getNumcartItem() {
        return this.readStorage();
    }

    //Set data in cart
    persistData(cartItems, cartCount) {
        localStorage.setItem('cartItem', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount);
        this.readStorage();
    }

    //store item in cart
    readStorage() {

        // Restoring cartItem from the localStorage
        const storage = JSON.parse(localStorage.getItem('cartItem'));
        if (storage) this.cartItems = storage;

        // Restoring cartCount from the localStorage
        const cartCount = localStorage.getItem('cartCount');
        if (cartCount) this.cartCount = cartCount;

        //render cart count
        const resultsArr = Array.from(elements.cartCountAll);
        resultsArr.forEach(el => {
            el.innerHTML = cartCount ? cartCount : 0;
        });
    }
}