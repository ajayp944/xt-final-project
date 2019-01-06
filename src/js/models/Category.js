import axios from 'axios';
import { apiurl, proxy } from '../config';

export default class Category {
    constructor() {

    }
    // hhtp request for category
    async getResults() {
        try {
            const res = await axios(`${proxy}${apiurl}categories`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
