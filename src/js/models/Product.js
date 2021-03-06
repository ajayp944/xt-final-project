import axios from 'axios';
import { apiurl, proxy } from '../config';

export default class Product {
    constructor() {

    }

    // product list
    async getResults() {
        try {
            const res = await axios(`${proxy}${apiurl}products`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }

    // add product in cart
    async addToCart() {
        try {
            const res = await axios.post(`${proxy}${apiurl}addToCart`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
