import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:8000/'
});

const $authHost = axios.create({
    baseURL: 'http://localhost:8000/'
});

const authInterseptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterseptor)

export {
    $host,
    $authHost
}