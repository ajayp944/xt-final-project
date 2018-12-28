import axios from 'axios';
import { apiurl, proxy } from '../config';

export default class Category {
    constructor() {

    }

    async getResults() {
        try {
            const res = await axios(`${proxy}${apiurl}categories`);
            console.log(res);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
