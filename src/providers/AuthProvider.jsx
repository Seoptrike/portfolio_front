/**
 * 인증 상태 관리를 위한 Provider 컴포넌트
 * 애플리케이션 전체의 사용자 인증 상태를 관리하고 Context를 통해 제공
 *
 * @fileoverview 로그인, 관리자 권한, 호스트 권한 등 인증 관련 상태를 중앙 관리
 */

import React, { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

/**
 * 인증 상태 제공자 컴포넌트
 * 자동으로 로그인 상태를 확인하고 경로 변경 시 호스트 권한을 업데이트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트들
 * @returns {JSX.Element} AuthContext Provider로 감싼 자식 컴포넌트들
 */
export default function AuthProvider({ children }) {
    // 로그인 상태 (null: 미확정, true/false: 확정)
    const [isLogin, setIsLogin] = useState(null);
    // 관리자 권한 상태 (null: 미확정, true/false: 확정)
    const [isAdmin, setIsAdmin] = useState(null);
    // 로그인된 사용자 이름
    const [loginName, setLoginName] = useState('');
    // 로그인된 사용자 ID
    const [loginId, setLoginId] = useState('');
    // 현재 페이지의 호스트 권한 여부
    const [isHost, setIsHost] = useState(false);

    const location = useLocation();

    /**
     * URL 경로에서 사용자명을 추출하는 함수
     * 경로의 첫 번째 세그먼트를 사용자명으로 간주
     *
     * @param {string} pathname - URL 경로
     * @returns {string|null} 추출된 사용자명 또는 null
     *
     * @example
     * extractUsernameFromPath('/john/projects') // returns 'john'
     * extractUsernameFromPath('/') // returns null
     */
    const extractUsernameFromPath = (pathname) => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0) {
            return segments[0];
        }
        return null;
    };

    /**
     * 로그인 상태를 확인하고 사용자 정보를 업데이트하는 함수
     * API를 통해 현재 로그인 상태를 확인하고 관련 권한들을 설정
     *
     * 처리 과정:
     * 1. 로그인 상태 확인 API 호출
     * 2. 로그인된 경우: 사용자 정보 및 관리자 권한 설정
     * 3. 현재 URL과 사용자명을 비교하여 호스트 권한 설정
     * 4. 로그인되지 않은 경우: 모든 상태 초기화
     */
    const loginCheckHandler = async () => {
        try {
            // 쿠키 기반 로그인 상태 확인
            const res = await loginCheck();
            const data = res?.data;

            if (data?.status === 'LOGIN') {
                const { username, userId } = data;
                const roles = data.roles || [];

                // 기본 로그인 정보 설정
                setIsLogin(true);
                setLoginId(userId);
                setLoginName(username);

                // 관리자 권한 확인
                const admin = roles.includes('ROLE_ADMIN');
                setIsAdmin(admin);

                // 호스트 권한 설정 (관리자이거나 본인 페이지인 경우)
                const urlUsername = extractUsernameFromPath(location.pathname);
                setIsHost(admin || (urlUsername && username === urlUsername));
            } else {
                // 로그인되지 않은 경우 모든 상태 초기화
                setIsLogin(false);
                setLoginId('');
                setLoginName('');
                setIsAdmin(false);
                setIsHost(false);
            }
        } catch (e) {
            // 네트워크 오류나 401 등의 에러 발생 시 상태 초기화
            setIsLogin(false);
            setLoginId('');
            setLoginName('');
            setIsAdmin(false);
            setIsHost(false);
        }
    };

    // 경로 변경 시마다 로그인 상태 재확인 (호스트 권한 업데이트를 위해)
    useEffect(() => {
        loginCheckHandler();
    }, [location.pathname]);

    // 인증 상태가 초기화 완료되었는지 확인
    const authReady = isLogin !== null && isAdmin !== null;

    return (
        <AuthContext.Provider value={{ isLogin, loginId, loginName, isAdmin, isHost, loginCheckHandler, authReady }}>
            {children}
        </AuthContext.Provider>
    );
}
