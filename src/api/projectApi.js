import axios from './axiosInstance';

export const getUserProject = (username) => axios.get(`/api/project/user/${username}`);

export const insertProject = (projects) => axios.post(`/api/project`, projects);

export const updateProject = (projectId,projects) => axios.put(`/api/project/${projectId}`, projects);

export const deleteProject = (projectId) => axios.delete(`/api/project/${projectId}`);

export const getProject = (projectId) => axios.get(`/api/projcet/${projectId}`);