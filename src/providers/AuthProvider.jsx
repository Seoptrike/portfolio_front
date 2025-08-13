import React, { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom';

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [loginName, setLoginName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [loginId, setLoginId] = useState('');
    const location = useLocation();

    const extractUsernameFromPath = (pathname) => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0) {
            return segments[0]; // username 위치 고정
        }
        return null;
    };

    const loginCheckHandler = async () => {
        const res = await loginCheck();
        console.log(res.data)
        if (res.data.status === 'LOGIN') {
            const username = res.data.username;
            const userId = res.data.userId;
            console.log("LOGIN 이름:" + res.data.username);
            setIsLogin(true);
            setLoginId(userId);
            setLoginName(username);
            const urlUsername = extractUsernameFromPath(location.pathname);
            console.log("URL 이름:" + extractUsernameFromPath(location.pathname));
            if (urlUsername && username === urlUsername) {
                const hostRes = await hostCheck(username);
                setIsHost(hostRes.data === 'HOST');
            } else {
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
        <AuthContext.Provider value={{ isLogin, loginId, loginName, isHost, loginCheckHandler }}>
            {children}
        </AuthContext.Provider>
    );
}
