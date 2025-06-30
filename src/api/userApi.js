import axios from './axiosInstance';

export const getUserListAll = () => {
    return axios.get('/api/users/getUserListAll');
};