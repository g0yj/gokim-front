import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://54.180.116.0:8080/api',
    withCredentials: true,
})

export default instance;
