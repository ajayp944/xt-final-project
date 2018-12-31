import axios from 'axios';
import { apiurl, proxy } from '../config';

export default class Product {
    constructor() {

    }

    async getResults() {
        try {
            const res = await axios(`${proxy}${apiurl}products`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
