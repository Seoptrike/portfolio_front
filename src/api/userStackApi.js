import axios from './axiosInstance';

export const getUserStack = (userId) => axios.get(`/api/user-stack/${userId}`);

export const insertUserStack = (userStack) => axios.post(`/api/user-stack`, userStack);

export const updateUserStack = (userStack) => axios.put(`/api/user-stack`, userStack);