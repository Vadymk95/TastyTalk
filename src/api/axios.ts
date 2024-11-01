// src/api/axios.ts
import axios from 'axios';

const defaultHost = 'http://localhost:3000/api';

const axiosInstance = axios.create({
    baseURL: process.env.VITE_API_URL || defaultHost,
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
