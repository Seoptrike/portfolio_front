import { useEffect, useMemo, useReducer } from "react";
import { LoadingContext } from "../context/LoadingContext";

function reducer(state, action) {
  switch (action.type) {
    case "START": return { count: state.count + 1 };
    case "STOP":  return { count: Math.max(0, state.count - 1) };
    case "RESET": return { count: 0 };
    default:      return state;
  }
}

export default function LoadingProvider({ children, attachAxios }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const isLoading = state.count > 0;
  const start = () => dispatch({ type: "START" });
  const stop  = () => dispatch({ type: "STOP" });

  // axios 인스턴스 연결 시 자동 로딩 on/off
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

  const value = useMemo(() => ({ isLoading, start, stop }), [isLoading]);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}
