import axios from 'axios';

axios.defaults.baseURL = 'https://demometaway.vps-kinghost.net:8485/';

const success = (request) => {
    const isLogin = request.url === "/api/auth/login"
    if (isLogin) { return request }

    const token = localStorage.getItem('@metaway-token');
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}
const error = (error) => Promise.reject(error);

axios.interceptors.request.use(success, error);

export default axios;