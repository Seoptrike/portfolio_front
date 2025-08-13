import axios from './axiosInstance';

export const getUserAllList = () => {
    return axios.get('/api/user/getUserAllList');
};

export const getUserTotalData = (username) => {
    return axios.get(`/api/user/portfolio/${username}`)
};

export const searchUsername = (username) => {
    return axios.get(`/api/user/search/${username}`)
};

export const getUserData= (username) => {
    return axios.get(`/api/user/${username}`)
}

export const softDeleteUser = (username) => {
    return axios.put(`/api/user/${username}`)
}

export const updateUserData = (data) => {
    return axios.put(`/api/user`, data)
}