import { elements } from "../views/base";

export default class Cart {
    constructor() {
        this.cartItems = [];
        this.cartCount = 0;
    }


    addToCart(id, name, price, imageURL, stock, count, type = 'add') {
        const cartItem = { id, name, price, imageURL, stock, count };

        if (this.isCart(id)) {

            const index = this.cartItems.findIndex(el => el.id === id);

            if (stock <= this.cartItems[index].count && type == 'add') {
                alert(`You can maximum add ${stock} item in your cart`);
                return false;
            }
            if (type === 'remove') {
                this.cartItems[index].count -= 1;
            } else {
                this.cartItems[index].count += 1;
            }
            if (this.cartItems[index].count == 0) {
                this.cartItems.splice(index, 1);
            }
        } else {
            this.cartItems.push(cartItem);
        }

        let tmpCartCount = 0;

        // Cart Count
        const cartCount = this.cartItems.forEach((curr) => {
            tmpCartCount = tmpCartCount + curr.count;
        });
        console.log(this.cartItems);

        console.log(tmpCartCount);
        console.log(localStorage.getItem('cartCount'));

        this.cartCount = parseInt(this.cartCount) + (tmpCartCount - localStorage.getItem('cartCount'));

        console.log(this.cartCount);

        // Perist data in localStorage
        this.persistData();

        return cartItem;
    }

    deleteCart(id) {
        const index = this.cartItems.findIndex(el => el.id === id);
        this.cartItems.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    isCart(id) {
        return this.cartItems.findIndex(el => el.id === id) !== -1;
    }


    getNumcartItem() {
        return this.readStorage();
    }

    persistData() {
        localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
        localStorage.setItem('cartCount', this.cartCount);
        this.readStorage();
    }

    readStorage() {

        // Restoring cartItem from the localStorage
        const storage = JSON.parse(localStorage.getItem('cartItem'));
        if (storage) this.cartItems = storage;

        // Restoring cartCount from the localStorage
        const cartCount = localStorage.getItem('cartCount');
        if (cartCount) this.cartCount = cartCount;

        const resultsArr = Array.from(elements.cartCountAll);
        resultsArr.forEach(el => {
            el.innerHTML = cartCount;
        });
    }
}