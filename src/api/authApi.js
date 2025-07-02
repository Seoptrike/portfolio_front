import axios from './axiosInstance';

export const login = (loginData) => {
    return axios.post('/api/auth/login',loginData);
};

export const register = (userData) => {
    return axios.post('/api/auth/register',userData);
}
