// src/pages/auth/LoginPage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../../api/authApi";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

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

    // ===== inline styles =====
    const styles = {
        page: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: isMobile ? 0 : "clamp(48px, 12vh, 160px)",
            background:
                "radial-gradient(1000px 600px at 10% 0%, #fff7ed 0, transparent 60%), " +
                "radial-gradient(800px 500px at 100% 10%, #eff6ff 0, transparent 60%), " +
                "linear-gradient(180deg, #f8fafc, #eef2f7)",
            padding: 16,
        },
        card: {
            width: 420,
            borderRadius: 16,
            padding: 20,
            background: "rgba(255,255,255,.78)",
            border: "1px solid rgba(0,0,0,.06)",
            boxShadow: "0 20px 50px rgba(15,23,42,.08)",
            backdropFilter: "blur(12px)",
        },
        brandWrap: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 },
        brandRow: { display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, color: "#111827" },
        subtle: { color: "#6b7280", fontSize: 12, marginTop: 4 },
        alert: {
            background: "rgba(224, 49, 49, .08)",
            border: "1px solid rgba(224, 49, 49, .25)",
            color: "#8a1c1c",
            padding: "8px 10px",
            borderRadius: 10,
            fontSize: 13,
            marginBottom: 12,
        },
        label: { display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#111827" },
        input: {
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: 14,
            background: "#fff",
            color: "#111827",
        },
        inputRow: { display: "block", position: "relative", marginBottom: 6 }, // ✅ 바뀐 부분
        eyeBtn: {
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            padding: 6,
            lineHeight: 0,
            cursor: "pointer",
            color: "#6b7280",
        },
        hint: { color: "#6b7280", fontSize: 12, minHeight: 18, marginBottom: 12 },
        btn: {
            width: "100%",
            height: 44,
            borderRadius: 12,
            border: "1px solid #ff8a00",
            background: "#ff8a00",
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
        },
        btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
        spinnerDot: {
            display: "inline-block",
            width: 6,
            height: 6,
            marginLeft: 6,
            borderRadius: "50%",
            background: "rgba(255,255,255,.9)",
            animation: "blink 1s infinite ease-in-out",
        },
        secondaryBtn: {
            width: "100%",
            height: 44,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "#fff",
            color: "#111827",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            marginTop: 8,
        },
    };

    return (
        <div style={styles.page}>
            <style>{`@keyframes blink {0%,80%,100%{opacity:.2} 40%{opacity:1}}`}</style>

            <div style={styles.card}>
                {/* 브랜드 */}
                <div style={styles.brandWrap}>
                    <div style={styles.brandRow}>
                        <img src="/images/seoportfolio_logo.png" alt="logo" width={28} height={28} />
                        <span>Seopotfolio</span>
                    </div>
                    <div style={styles.subtle}>계정에 로그인하세요</div>
                </div>

                {/* 에러 */}
                {error ? <div style={styles.alert}>{error}</div> : null}

                {/* 폼 */}
                <form onSubmit={onSubmit} autoComplete="on">
                    <label style={styles.label}>아이디</label>
                    <input
                        style={{ ...styles.input, marginBottom: 12, height: 40 }}
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        autoFocus
                        placeholder="아이디를 입력하세요"
                    />

                    <label style={styles.label}>비밀번호</label>
                    <div style={styles.inputRow}>
                        <input
                            style={{ ...styles.input, height: 40, paddingRight: 42 }} // ✅ 아이콘 자리 확보
                            type={showPw ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={onKeyUpDetectCaps}
                            autoComplete="current-password"
                            placeholder="비밀번호를 입력하세요"
                            aria-describedby="caps-hint"
                        />

                        {/* ✅ 눈 아이콘 토글 버튼 */}
                        <button
                            type="button"
                            onClick={() => setShowPw((v) => !v)}
                            disabled={loading}
                            style={{ ...styles.eyeBtn, color: showPw ? "#111827" : "#6b7280" }}
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

                    <div id="caps-hint" style={styles.hint} role="status" aria-live="polite">
                        {capsOn ? "CapsLock이 켜져 있습니다." : "\u00A0"}
                    </div>

                    <button type="submit" disabled={disabled} style={{ ...styles.btn, ...(disabled ? styles.btnDisabled : {}) }}>
                        {loading ? (
                            <>
                                로그인 중…
                                <span style={{ ...styles.spinnerDot, animationDelay: "0s" }} />
                                <span style={{ ...styles.spinnerDot, animationDelay: ".2s" }} />
                                <span style={{ ...styles.spinnerDot, animationDelay: ".4s" }} />
                            </>
                        ) : (
                            "로그인"
                        )}
                    </button>

                    <button
                        type="button"
                        style={styles.secondaryBtn}
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
