import axios from './axiosInstance';

export const insertWorkExp = (data) => {
    return axios.post('/api/career/work', data);
};

export const insertEduHistory = (data) => {
    return axios.post('/api/career/education', data);
};

export const deleteWorkExp = (key) => {
    return axios.delete(`/api/career/work/${key}`);
}

export const deleteEduHistory = (key) => {
    return axios.delete(`/api/career/education/${key}`);
}

export const updateWorkExp = (data) => {
    return axios.put(`/api/career/work`, data);
}

export const updateEduHistory = (data) => {
    return axios.put(`/api/career/education`, data);
}