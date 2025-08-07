import React, { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom';

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [loginName, setLoginName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const location = useLocation();

    const extractUsernameFromPath = (pathname) => {
        const segments = pathname.split("/").filter(Boolean);

        if (segments[0] === "profile" || segments[0] === "about") {
            return segments[1] ?? null;
        }

        if (segments[0] === "project") {
            if (segments[1] === "detail" || segments[1] === "insert" || segments[1] === "update") {
                return segments[2] ?? null;
            } else {
                return segments[1] ?? null;
            }
        }

        if (segments[0] === "guestbook") {
            return segments[1] === "list" ? segments[2] ?? null : segments[1] ?? null;
        }

        return null;
    };

    const loginCheckHandler = async () => {
        const res = await loginCheck();
        if (res.data.status === 'LOGIN') {
            const username = res.data.username;
            console.log("LOGIN 이름:" + res.data.username);
            setIsLogin(true);
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
        <AuthContext.Provider value={{ isLogin, loginName, isHost, loginCheckHandler }}>
            {children}
        </AuthContext.Provider>
    );
}
