import axios from 'axios';
import qs from 'qs';

export let instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    withCredentials: true
});

export const GET = (url, param) => {
    return instance.get(url, qs.stringify(param));
};

export const POST = (url, param) => {
    return instance.post(url, qs.stringify(param));
};
