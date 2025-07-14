import React, { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [loginName, setLoginName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const location = useLocation();

    const extractUsernameFromPath = (pathname) => {
        const regex = /\/(?:main|about|projects|guestbook)\/([^/]+)/;
        const match = pathname.match(regex);
        return match ? match[1] : null;
    };

    const loginCheckHandler = async () => {
        const res = await loginCheck();
        if (res.data.status === 'LOGIN') {
            const username = res.data.username;
            setIsLogin(true);
            setLoginName(username);
            const urlUsername = extractUsernameFromPath(location.pathname);

            if (urlUsername && username === urlUsername) {
                const hostRes = await hostCheck(username);
                setIsHost(hostRes.data === 'HOST');
            }else{
                setIsHost(false);
            }
        } else {
            setIsLogin(false);
            setLoginName('');
            setIsHost(false);
        }
    };

    useEffect(() => {
        loginCheckHandler();
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{ isLogin, loginName, isHost, loginCheckHandler }}>
            {children}
        </AuthContext.Provider>
    );
}
