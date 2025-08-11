import axios from './axiosInstance';

export const fetchAchieveList = (username) => {
    return axios.get(`/api/achieve/${username}`)
}

export const insertAchieve = (detailData) => {
    return axios.post(`/api/achieve`, detailData)
}

export const updateAchieve = (detailData) => {
    return axios.put(`/api/achieve`, detailData);
}

export const deleteAchieve = (detailId) => {
    return axios.delete(`/api/achieve/${detailId}`);
}

