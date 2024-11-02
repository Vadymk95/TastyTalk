import axios from 'axios';

const PORT = process.env.PORT || 3000;
const DEV_URL = `http://localhost:${PORT}`;
const defaultHost = `${DEV_URL}/api`;

const axiosInstance = axios.create({
    baseURL: defaultHost,
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
