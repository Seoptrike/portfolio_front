/**
 * 인증 상태 관리를 위한 커스텀 훅
 * 사용자의 로그인 상태와 호스트 권한을 확인하고 관리
 *
 * @fileoverview 로그인 상태와 호스트 권한을 비동기적으로 확인하는 React 훅
 */

import { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';

/**
 * 사용자의 인증 상태를 확인하는 커스텀 훅
 *
 * @param {string} username - 확인할 사용자명
 * @returns {Object} 인증 상태 객체
 * @returns {boolean} returns.isLogin - 로그인 여부
 * @returns {boolean} returns.isHost - 호스트 권한 여부
 *
 * @example
 * const { isLogin, isHost } = useAuthStatus('john_doe');
 */
export default function useAuthStatus(username) {
    // 로그인 상태
    const [isLogin, setIsLogin] = useState(false);
    // 호스트 권한 상태
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        /**
         * 인증 상태를 비동기적으로 확인하는 내부 함수
         * 1. 로그인 상태 확인
         * 2. 로그인된 경우 호스트 권한 확인
         */
        const fetchAuthStatus = async () => {
            try {
                // 로그인 상태 확인
                const loginRes = await loginCheck();
                const isLoggedIn = loginRes?.data === 'LOGIN';
                setIsLogin(isLoggedIn);

                // 로그인된 사용자의 호스트 권한 확인
                if (isLoggedIn && username) {
                    const hostRes = await hostCheck(username);
                    setIsHost(hostRes?.data === 'HOST');
                } else {
                    setIsHost(false);
                }
            } catch (error) {
                console.error('Auth status check failed', error);
                // 에러 발생 시 모든 권한 false로 설정
                setIsLogin(false);
                setIsHost(false);
            }
        };

        fetchAuthStatus();
    }, [username]); // username이 변경될 때마다 재실행

    return { isLogin, isHost };
}
