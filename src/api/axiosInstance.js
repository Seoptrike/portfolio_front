// src/api/axiosInstance.js
import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); // 꼬리 슬래시 제거
if (!baseURL) console.error('VITE_API_URL is missing'); // 방어

export default axios.create({
  baseURL,          // 예: https://.../api
  withCredentials: true,
});
