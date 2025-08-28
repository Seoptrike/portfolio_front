import axios from './axiosInstance';

export const login = (data) => axios.post('/api/auth/login', data);

export const register = (data) => axios.post('/api/auth/register', data);

export const loginCheck = () => axios.get('/api/auth/loginCheck');

export const hostCheck = (username) => axios.get(`/api/auth/hostCheck/${username}`);

export const logout = () => axios.post('/api/auth/logout');

