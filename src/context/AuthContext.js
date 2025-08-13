// src/context/AuthContext.js
import { createContext } from 'react';

export const AuthContext = createContext({
    isLogin: false,
    isHost: false,
    loginName: '',
    loginId:'',
    loginCheck: () => { },
});
