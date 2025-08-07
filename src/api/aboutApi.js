import axios from './axiosInstance';

export const fetchAboutList = (username) => {
    return axios.get(`/api/about/${username}`)
}

export const insertAboutDetail = (detailData) => {
    return axios.post(`/api/about/details`, detailData)
}

export const updateAboutDetail = (detailData) => {
    return axios.put(`/api/about/details`, detailData);
}

export const deleteAboutDetail = (detailId) => {
    return axios.delete(`/api/about/details/${detailId}`);
}

export const createAbout = (data) => {
    return axios.post(`/api/about`, data);
}