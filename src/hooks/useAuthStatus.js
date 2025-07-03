import { useState, useEffect } from 'react';
import { loginCheck, hostCheck } from '../api/AuthApi';

export default function useAuthStatus(username) {
    const [isLogin, setIsLogin] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const loginRes = await loginCheck();
                const isLoggedIn = loginRes?.data === 'LOGIN';
                setIsLogin(isLoggedIn);

                if (isLoggedIn && username) {
                    const hostRes = await hostCheck(username);
                    setIsHost(hostRes?.data === 'HOST');
                } else {
                    setIsHost(false);
                }
            } catch (error) {
                console.error('Auth status check failed', error);
                setIsLogin(false);
                setIsHost(false);
            }
        };

        fetchAuthStatus();
    }, [username]);

    

    return { isLogin, isHost };
}
