import axios from './axiosInstance';

export const getCategories = () => axios.get('/api/tech-categories');
export const insertCategory = (name) => axios.post('/api/tech-categories', name);
export const updateCategory = (category) => axios.put('/api/tech-categories', category);
export const deleteCategory = (categoryId) => axios.delete(`/api/tech-categories/${categoryId}`);
