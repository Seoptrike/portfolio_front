// LoadingProvider.jsx
import { useEffect, useMemo, useReducer, useRef } from "react";
import { LoadingContext } from "../context/LoadingContext";

function reducer(state, action) {
    switch (action.type) {
        case "START": return { count: state.count + 1 };
        case "STOP": return { count: Math.max(0, state.count - 1) };
        case "RESET": return { count: 0 };
        default: return state;
    }
}

export default function LoadingProvider({ children, attachAxios }) {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    const unmounted = useRef(false);

    const start = () => dispatch({ type: "START" });
    const stop = () => dispatch({ type: "STOP" });

    // withLoading: Promise 실행을 자동으로 start/stop로 감싸줌
    const withLoading = (fn) => async (...args) => {
        start();
        try {
            return await fn(...args);
        } finally {
            // 언마운트 후 불필요한 dispatch 방지
            if (!unmounted.current) stop();
        }
    };

    // axios 인스턴스 연결시 자동 로딩 on/off
    useEffect(() => {
        if (!attachAxios) return;

        const reqId = attachAxios.interceptors.request.use(
            (cfg) => { if (!cfg._skipLoading) start(); return cfg; },
            (err) => { stop(); return Promise.reject(err); }
        );
        const resId = attachAxios.interceptors.response.use(
            (res) => { if (!res.config?._skipLoading) stop(); return res; },
            (err) => { if (!err.config?._skipLoading) stop(); return Promise.reject(err); }
        );

        return () => {
            attachAxios.interceptors.request.eject(reqId);
            attachAxios.interceptors.response.eject(resId);
        };
    }, [attachAxios]);

    useEffect(() => {
        return () => { unmounted.current = true; };
    }, []);

    const loading = state.count > 0;

    const value = useMemo(
        () => ({ loading, start, stop, withLoading }),
        [loading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
}
