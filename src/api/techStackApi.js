import axios from './axiosInstance';

export const getAllStack = (category) => axios.get(`/api/tech-stacks?category=${category}`);