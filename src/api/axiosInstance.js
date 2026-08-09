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
  // 백엔드가 Render 무료 티어라 콜드 스타트에 30초 이상 걸릴 수 있음
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5,
});

export default instance;
