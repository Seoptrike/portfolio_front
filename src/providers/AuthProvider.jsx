import React, { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(null);  // null=미확정, true/false=확정
    const [isAdmin, setIsAdmin] = useState(null);
    const [loginName, setLoginName] = useState('');
    const [loginId, setLoginId] = useState('');
    const [isHost, setIsHost] = useState(false);

    const location = useLocation();

    const extractUsernameFromPath = (pathname) => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0) {
            return segments[0]; // username 위치 고정
        }
        return null;
    };

    const loginCheckHandler = async () => {
        try {
            const res = await loginCheck(); // axios withCredentials 전제
            const data = res?.data;
            if (data?.status === 'LOGIN') {
                const { username, userId } = data;
                const roles = data.roles || [];

                setIsLogin(true);
                setLoginId(userId);
                setLoginName(username);

                const admin = roles.includes('ROLE_ADMIN');
                setIsAdmin(admin);

                const urlUsername = extractUsernameFromPath(location.pathname);
                setIsHost(admin || (urlUsername && username === urlUsername));
            } else {
                setIsLogin(false);
                setLoginId('');
                setLoginName('');
                setIsAdmin(false);
                setIsHost(false);
            }
        } catch (e) {
            // 401 등 에러 처리
            setIsLogin(false);
            setLoginId('');
            setLoginName('');
            setIsAdmin(false);
            setIsHost(false);
        }
    };

    useEffect(() => {
        loginCheckHandler();
    }, [location.pathname]);

    const authReady = isLogin !== null && isAdmin !== null;

    return (
        <AuthContext.Provider value={{ isLogin, loginId, loginName, isAdmin, isHost, loginCheckHandler, authReady }}>
            {children}
        </AuthContext.Provider>
    );
}
