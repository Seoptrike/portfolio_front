import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAdmin = ({ children }) => {
    const { isLogin, isAdmin, authReady } = useContext(AuthContext);
    const location = useLocation();

    if (!authReady) return null; // ← 권한 미확정이면 조용히 대기(전역 스피너가 있으면 그게 보임)

    if (!isLogin) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }
    if (!isAdmin) {
        return <Navigate to="/notfound" replace />;
    }
    return children;
};

export default RequireAdmin;