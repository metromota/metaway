import { Storage } from '../storage/storage';
import axios from 'axios';

axios.defaults.baseURL = 'https://demometaway.vps-kinghost.net:8485/';

const success = (request) => {

    const isLogin = request.url === "/api/auth/login"
    if (isLogin) { return request }

    if (Storage.getToken()) {
        const token = Storage.getToken()
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
}

const error = (error) => Promise.reject(error);

axios.interceptors.request.use(success, error);

export default axios;