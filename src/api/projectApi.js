import axios from './axiosInstance';

export const getUserProject = (username) => axios.get(`/api/project/${username}`);

export const insertProject = (projects) => axios.post(`/api/project`, projects);

export const updateProject = (projectId,projects) => axios.put(`/api/project/${projectId}`, projects);

export const deleteProject = (projectId) => axios.delete(`/api/project/${projectId}`);

export const getProjectById = (projectId) => axios.get(`/api/project/detail/${projectId}`);