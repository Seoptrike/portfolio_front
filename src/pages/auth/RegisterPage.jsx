// src/pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../../api/authApi";
import ImagePicker from "../../components/common/ImagePicker";
import useImageKitUpload from "../../hooks/useImageKitUpload.js";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [capsOn, setCapsOn] = useState(false);

    const [phone, setPhone] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [photoFile, setPhotoFile] = useState(null);

    const { uploadImage, busy: uploading, progress } = useImageKitUpload();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 768px)").matches;

    // ===== inline styles =====
    const styles = {
        page: {
            minHeight: "100svh",
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
            width: 480,
            maxWidth: "100%",
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
            height: 40,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: 14,
            background: "#fff",
            color: "#111827",
        },
        field: { display: "grid", gap: 6, marginBottom: 12 },

        inputRow: { display: "flex", alignItems: "center", gap: 8 },
        toggleBtn: {
            whiteSpace: "nowrap",
            height: 40,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#f8fafc",
            color: "#111827",
            fontSize: 13,
            padding: "0 12px",
            cursor: "pointer",
        },
        hint: { color: "#6b7280", fontSize: 12, minHeight: 18, marginTop: -6, marginBottom: 6 },

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
            marginTop: 4,
        },
        btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
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

        dashedBox: { border: "1px dashed #e5e7eb", borderRadius: 12, padding: 12 },
        progressWrap: { height: 8, borderRadius: 999, background: "#f3f4f6", overflow: "hidden" },
        progressBar: (p) => ({ width: `${p}%`, height: "100%", background: "#4f46e5" }),

        spinnerDot: {
            display: "inline-block",
            width: 6,
            height: 6,
            marginLeft: 6,
            borderRadius: "50%",
            background: "rgba(255,255,255,.9)",
            animation: "blink 1s infinite ease-in-out",
        },
    };

    const onKeyUpDetectCaps = (e) => {
        if (typeof e.getModifierState === "function") {
            setCapsOn(e.getModifierState("CapsLock"));
        }
    };

    // 전화번호 포맷팅 함수 (3-4-4 형식)
    const formatPhoneNumber = (value) => {
        // 숫자만 추출
        const numbers = value.replace(/\D/g, '');
        
        // 11자리를 초과하면 자르기
        if (numbers.length > 11) {
            return phone; // 기존 값 유지
        }

        // 3-4-4 형식으로 포맷팅
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    const validate = () => {
        if (!username || username.length < 3) return "아이디는 3자 이상이어야 합니다.";
        if (!password || password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
        if (phone && phone.replace(/\D/g, '').length !== 11) return "휴대폰 번호는 11자리 숫자여야 합니다.";
        if (githubUrl && !/^https?:\/\/(www\.)?github\.com\/.+/i.test(githubUrl))
            return "GitHub URL 형식이 올바르지 않습니다.";
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const msg = validate();
        if (msg) { setError(msg); return; }
        setError("");
        setLoading(true);

        try {
            // 1) (선택) 이미지 업로드
            let photo = null;
            let photoUrlId = null;

            if (photoFile) {
                const uploaded = await uploadImage(photoFile, {
                    userId: username,
                    folder: "profile",
                });
                photo = uploaded?.url ?? null;
                photoUrlId = uploaded?.fileId ?? null;
            }

            // 2) 회원가입 요청 (전화번호는 숫자만 전송)
            const phoneNumbers = phone ? phone.replace(/\D/g, '') : '';
            await apiRegister({ username, password, phone: phoneNumbers, githubUrl, photo, photoUrlId });

            await Swal.fire({ icon: "success", title: "회원가입 완료!", timer: 1200, showConfirmButton: false });
            navigate("/auth/login");
        } catch (err) {
            console.error(err);
            setError("회원가입 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const disabled = loading || uploading;

    return (
        <div style={styles.page}>
            <style>{`@keyframes blink { 0%,80%,100%{opacity:.2} 40%{opacity:1} }`}</style>

            <div style={styles.card}>
                {/* 헤더 */}
                <div style={styles.brandWrap}>
                    <div style={styles.brandRow}>
                        <img src="/images/seoportfolio_logo.png" alt="logo" width={28} height={28} />
                        <span>Seopotfolio</span>
                    </div>
                    <div style={styles.subtle}>새 계정을 만들어주세요</div>
                </div>

                {/* 에러 */}
                {error ? <div style={styles.alert}>{error}</div> : null}

                {/* 폼 (모두 수직 배치) */}
                <form onSubmit={onSubmit} autoComplete="on">
                    {/* 아이디 */}
                    <div style={styles.field}>
                        <label style={styles.label}>아이디</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            placeholder="아이디"
                        />
                    </div>

                    {/* 비밀번호 + 보기 토글 */}
                    <div style={styles.field}>
                        <label style={styles.label}>비밀번호</label>
                        <div style={styles.inputRow}>
                            <input
                                style={{ ...styles.input, flex: 1 }}
                                type={showPw ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyUp={onKeyUpDetectCaps}
                                autoComplete="new-password"
                                placeholder="6자 이상"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(v => !v)}
                                disabled={loading}
                                style={styles.toggleBtn}
                            >
                                {showPw ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div style={styles.hint} role="status" aria-live="polite">
                            {capsOn ? "CapsLock이 켜져 있습니다." : "\u00A0"}
                        </div>
                    </div>

                    {/* 휴대폰 번호 */}
                    <div style={styles.field}>
                        <label style={styles.label}>휴대폰 번호</label>
                        <input
                            style={styles.input}
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="010-1234-5678"
                            maxLength="13"
                        />
                        <div style={styles.hint}>
                            {phone && phone.replace(/\D/g, '').length !== 11 && phone.length > 0 
                                ? "11자리 숫자를 입력해주세요" 
                                : "\u00A0"
                            }
                        </div>
                    </div>

                    {/* GitHub URL */}
                    <div style={styles.field}>
                        <label style={styles.label}>GitHub URL</label>
                        <input
                            style={styles.input}
                            type="url"
                            name="githubUrl"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="https://github.com/yourname"
                        />
                    </div>

                    {/* 프로필 사진 */}
                    <div style={styles.field}>
                        <label style={styles.label}>프로필 사진 (선택)</label>
                        <div style={styles.dashedBox}>
                            <ImagePicker value={photoFile} onChange={setPhotoFile} />
                            {uploading ? (
                                <div style={{ marginTop: 8 }}>
                                    <div style={styles.progressWrap}>
                                        <div style={styles.progressBar(progress)} />
                                    </div>
                                    <div style={{ ...styles.subtle, marginTop: 6 }}>{progress}% 업로드 중…</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* 액션 버튼 */}
                    <button
                        type="submit"
                        disabled={disabled}
                        style={{ ...styles.btn, ...(disabled ? styles.btnDisabled : {}) }}
                    >
                        {loading ? (
                            <>
                                회원가입 중…
                                <span style={{ ...styles.spinnerDot, animationDelay: "0s" }} />
                                <span style={{ ...styles.spinnerDot, animationDelay: ".2s" }} />
                                <span style={{ ...styles.spinnerDot, animationDelay: ".4s" }} />
                            </>
                        ) : (
                            "회원가입"
                        )}
                    </button>

                    <button
                        type="button"
                        style={styles.secondaryBtn}
                        onClick={() => navigate("/auth/login")}
                    >
                        로그인으로 돌아가기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
