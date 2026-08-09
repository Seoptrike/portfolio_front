// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../../api/authApi";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import "./authForm.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [capsOn, setCapsOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setError("");
        setLoading(true);
        try {
            const res = await login({ username, password });
            const data = res.data;
            if (data.result === 0) setError("존재하지 않는 아이디입니다.");
            else if (data.result === 1) setError("비밀번호가 일치하지 않습니다.");
            else if (data.result === 2) {
                await Swal.fire({ icon: "success", title: "로그인 성공", showConfirmButton: false, timer: 1200 });
                const target = sessionStorage.getItem("target");
                window.location.href = target || `/${username}`;
                return;
            } else setError("로그인에 실패했습니다.");
        } catch (err) {
            console.error("Login error:", err);
            setError("서버 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const onKeyUpDetectCaps = (e) => {
        if (typeof e.getModifierState === "function") setCapsOn(e.getModifierState("CapsLock"));
    };

    const disabled = loading || !username || !password;

    // 스타일은 authForm.css의 토큰 기반 클래스를 사용한다
    const styles = {
        page: { paddingTop: isMobile ? 16 : "clamp(48px, 12vh, 160px)" },
    };

    return (
        <div className="auth-page" style={styles.page}>
            <div className="auth-card">
                {/* 브랜드 */}
                <div className="auth-brand">
                    <div className="auth-brand-row">
                        <img src="/images/seoportfolio_logo.png" alt="logo" width={28} height={28} />
                        <span>Seopotfolio</span>
                    </div>
                    <div className="auth-subtle">계정에 로그인하세요</div>
                </div>

                {/* 에러 */}
                {error ? <div className="auth-alert">{error}</div> : null}

                {/* 폼 */}
                <form onSubmit={onSubmit} autoComplete="on">
                    <div className="auth-field">
                        <label className="auth-label">아이디</label>
                        <input
                            className="auth-input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                            placeholder="아이디를 입력하세요"
                        />
                    </div>

                    <label className="auth-label" style={{ marginBottom: 8 }}>비밀번호</label>
                    <div className="auth-input-row">
                        <input
                            className="auth-input"
                            style={{ paddingRight: 42 }} // 아이콘 자리 확보
                            type={showPw ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={onKeyUpDetectCaps}
                            autoComplete="current-password"
                            placeholder="비밀번호를 입력하세요"
                            aria-describedby="caps-hint"
                        />

                        {/* 눈 아이콘 토글 버튼 */}
                        <button
                            type="button"
                            onClick={() => setShowPw((v) => !v)}
                            disabled={loading}
                            className="auth-eye-btn"
                            data-active={showPw}
                            aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                            title={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                        >
                            {showPw ? (
                                // eye-off
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.53-1.24 1.3-2.39 2.28-3.39" />
                                    <path d="M22.94 11.94A10.94 10.94 0 0 0 12 4c-1.61 0-3.14.31-4.5.88" />
                                    <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                                    <path d="M1 1l22 22" />
                                </svg>
                            ) : (
                                // eye
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div id="caps-hint" className="auth-hint" role="status" aria-live="polite">
                        {capsOn ? "CapsLock이 켜져 있습니다." : "\u00A0"}
                    </div>

                    <button type="submit" disabled={disabled} className="auth-btn">
                        {loading ? (
                            <>
                                로그인 중…
                                <span className="auth-dot" style={{ animationDelay: "0s" }} />
                                <span className="auth-dot" style={{ animationDelay: ".2s" }} />
                                <span className="auth-dot" style={{ animationDelay: ".4s" }} />
                            </>
                        ) : (
                            "로그인"
                        )}
                    </button>

                    <button
                        type="button"
                        className="auth-btn-secondary"
                        onClick={() => navigate("/auth/register")}
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
