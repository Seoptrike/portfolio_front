/**
 * Axios 인스턴스 설정 모듈
 * API 호출을 위한 기본 설정이 적용된 axios 인스턴스를 제공
 *
 * @fileoverview 환경변수에서 API URL을 가져와 기본 설정을 적용한 axios 인스턴스
 */

import axios from 'axios';

// 환경변수에서 API URL 가져오기 (끝의 슬래시 제거)
const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

// API URL이 설정되지 않은 경우 에러 로깅
if (!baseURL) console.error('VITE_API_URL is missing');

/**
 * 기본 설정이 적용된 axios 인스턴스
 *
 * 설정:
 * - baseURL: 환경변수의 VITE_API_URL 사용
 * - withCredentials: 쿠키 및 인증 정보 자동 포함
 *
 * @type {import('axios').AxiosInstance}
 */
const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000, // 5초 타임아웃
  headers: {
    'Content-Type': 'application/json',
    // Connection 헤더 제거 (브라우저가 자동 관리)
  },
  maxRedirects: 5,
});

// 요청/응답 시간 로깅
instance.interceptors.request.use((config) => {
  config.metadata = { startTime: performance.now() };
  console.log(`🌐 API 요청 시작: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const duration = performance.now() - response.config.metadata.startTime;
    console.log(`✅ API 응답: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration.toFixed(2)}ms`);
    return response;
  },
  (error) => {
    if (error.config?.metadata) {
      const duration = performance.now() - error.config.metadata.startTime;
      console.log(`❌ API 에러: ${error.config.method?.toUpperCase()} ${error.config.url} - ${duration.toFixed(2)}ms`);
    }
    return Promise.reject(error);
  }
);

export default instance;
