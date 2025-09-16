import axiosInstance from './axiosInstance';

// 임시 피드백 저장
export const saveTempFeedback = async (feedbackData) => {
    return await axiosInstance.post('/api/temp-feedback/save', feedbackData);
};

// 임시 피드백 조회
export const getTempFeedback = async (sessionId) => {
    return await axiosInstance.get(`/api/temp-feedback/${sessionId}`);
};

// 임시 피드백 삭제
export const deleteTempFeedback = async (sessionId) => {
    return await axiosInstance.delete(`/api/temp-feedback/${sessionId}`);
};

// 임시 피드백 존재 확인
export const checkTempFeedbackExists = async (sessionId) => {
    return await axiosInstance.get(`/api/temp-feedback/${sessionId}/exists`);
};

// 임시 피드백 확정 (Redis -> DB)
export const confirmTempFeedback = async (sessionId) => {
    return await axiosInstance.post(`/api/guest/confirm/${sessionId}`);
};