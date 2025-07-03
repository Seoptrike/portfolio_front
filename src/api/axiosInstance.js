// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ← Vite에서는 이렇게
  withCredentials: true,
});

export default axiosInstance;
