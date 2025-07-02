import axios from './axiosInstance';

export const getUserAllList = () => {
    return axios.get('/api/user/getUserAllList');
};

export const getUserTotalData = (username) => {
    return axios.post('/api/total/getUserTotalData',{username})
};