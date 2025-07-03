import axios from './axiosInstance';

const safeApiCall = async (apiFunc, defaultValue = null) => {
    try {
        const res = await apiFunc();
        return res;
    } catch (err) {
        console.error("❌ API 요청 실패:", err);
        return defaultValue;
    }
};

// API 함수들
export const login = (loginData) =>
    safeApiCall(() => axios.post('/api/auth/login', loginData));

export const register = (userData) =>
    safeApiCall(() => axios.post('/api/auth/register', userData));

export const loginCheck = () =>
    safeApiCall(() => axios.get('/api/auth/loginCheck'));

export const hostCheck = (username) =>
    safeApiCall(() => axios.get(`/api/auth/hostCheck/${username}`));

export const logout = () =>
    safeApiCall(() => axios.post('/api/auth/logout'));
