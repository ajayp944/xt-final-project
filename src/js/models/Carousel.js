import axios from 'axios';
import { apiurl, proxy } from '../config';

export default class Carousel {
    constructor() {

    }

    async getResults() {
        try {
            const res = await axios(`${proxy}${apiurl}banners`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
    }
}
