/**
 * 사용자 인증 상태 관리를 위한 React Context
 * 애플리케이션 전역에서 사용자의 로그인 상태와 권한 정보를 공유
 *
 * @fileoverview 인증 관련 상태와 함수들을 전역적으로 관리하기 위한 Context 정의
 */

import { createContext } from 'react';

/**
 * 인증 Context 객체
 * 사용자의 로그인 상태, 권한 정보, 인증 관련 함수들을 포함
 *
 * Context 값:
 * @type {Object}
 * @property {boolean} isLogin - 로그인 여부
 * @property {boolean} isHost - 호스트 권한 여부
 * @property {boolean} isAdmin - 관리자 권한 여부
 * @property {string} loginName - 로그인된 사용자명
 * @property {string} loginId - 로그인된 사용자 ID
 * @property {Function} loginCheckHandler - 로그인 상태 확인 함수
 * @property {boolean} authReady - 인증 상태 초기화 완료 여부
 *
 * @example
 * const { isLogin, loginName, loginCheckHandler } = useContext(AuthContext);
 */
export const AuthContext = createContext({
    isLogin: false,
    isHost: false,
    isAdmin: false,
    loginName: '',
    loginId: '',
    loginCheckHandler: () => { },
    authReady: false,
});
