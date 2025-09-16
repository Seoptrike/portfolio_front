/**
 * 인증 관련 API 호출 함수들
 * 로그인, 회원가입, 로그아웃 등 사용자 인증과 관련된 모든 API 요청을 처리
 *
 * @fileoverview 사용자 인증 및 권한 확인을 위한 API 함수 모음
 */

import axios from './axiosInstance';

/**
 * 사용자 로그인 API 호출
 *
 * @param {Object} data - 로그인 정보
 * @param {string} data.username - 사용자명
 * @param {string} data.password - 비밀번호
 * @returns {Promise} axios 응답 Promise
 */
export const login = (data) => axios.post('/api/auth/login', data);

/**
 * 사용자 회원가입 API 호출
 *
 * @param {Object} data - 회원가입 정보
 * @param {string} data.username - 사용자명
 * @param {string} data.password - 비밀번호
 * @param {string} data.email - 이메일
 * @returns {Promise} axios 응답 Promise
 */
export const register = (data) => axios.post('/api/auth/register', data);

/**
 * 현재 로그인 상태 확인 API 호출
 * 쿠키 기반으로 로그인 상태를 확인하고 사용자 정보를 반환
 *
 * @returns {Promise} 로그인 상태 및 사용자 정보가 포함된 axios 응답 Promise
 */
export const loginCheck = () => axios.get('/api/auth/loginCheck');

/**
 * 특정 사용자의 호스트 권한 확인 API 호출
 * 현재 로그인된 사용자가 특정 사용자명에 대한 호스트 권한을 가지는지 확인
 *
 * @param {string} username - 확인할 사용자명
 * @returns {Promise} 호스트 권한 확인 결과가 포함된 axios 응답 Promise
 */
export const hostCheck = (username) => axios.get(`/api/auth/hostCheck/${username}`);

/**
 * 사용자 로그아웃 API 호출
 * 서버에서 세션을 종료하고 쿠키를 삭제
 *
 * @returns {Promise} axios 응답 Promise
 */
export const logout = () => axios.post('/api/auth/logout');

