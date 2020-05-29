import axios from 'axios';
import {API_BASE_URL} from "~/constants";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const configuration = { ...config };
    const { params } = configuration;

    configuration.params = {
        ...params,
        language: 'en-US',
    };
    return configuration;
}, e => (
    Promise.reject(e)
));

export default api;
