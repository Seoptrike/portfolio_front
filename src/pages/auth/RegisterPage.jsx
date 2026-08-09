// src/pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../../api/authApi";
import ImagePicker from "../../components/common/ImagePicker";
import useImageKitUpload from "../../hooks/useImageKitUpload.js";
import useIsMobile from "../../hooks/useIsMobile";
import "./authForm.css";

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

    const isMobile = useIsMobile();

    // 스타일은 authForm.css의 토큰 기반 클래스를 사용한다
    const styles = {
        page: { paddingTop: isMobile ? 16 : "clamp(48px, 12vh, 160px)" },
        toggleBtn: {
            whiteSpace: "nowrap",
            height: 42,
            borderRadius: "var(--radius)",
            border: "1px solid var(--border-strong)",
            background: "var(--surface-3)",
            color: "var(--text-muted)",
            fontSize: "var(--text-sm)",
            padding: "0 12px",
            cursor: "pointer",
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
        <div className="auth-page" style={styles.page}>
            <div className="auth-card">
                {/* 헤더 */}
                <div className="auth-brand">
                    <div className="auth-brand-row">
                        <img src="/images/seoportfolio_logo.png" alt="logo" width={28} height={28} />
                        <span>Seopotfolio</span>
                    </div>
                    <div className="auth-subtle">새 계정을 만들어주세요</div>
                </div>

                {/* 에러 */}
                {error ? <div className="auth-alert">{error}</div> : null}

                {/* 폼 (모두 수직 배치) */}
                <form onSubmit={onSubmit} autoComplete="on">
                    {/* 아이디 */}
                    <div className="auth-field">
                        <label className="auth-label">아이디</label>
                        <input
                            className="auth-input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            placeholder="아이디"
                        />
                    </div>

                    {/* 비밀번호 + 보기 토글 */}
                    <div className="auth-field">
                        <label className="auth-label">비밀번호</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                                className="auth-input"
                                style={{ flex: 1 }}
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
                        <div className="auth-hint" role="status" aria-live="polite">
                            {capsOn ? "CapsLock이 켜져 있습니다." : "\u00A0"}
                        </div>
                    </div>

                    {/* 휴대폰 번호 */}
                    <div className="auth-field">
                        <label className="auth-label">휴대폰 번호</label>
                        <input
                            className="auth-input"
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="010-1234-5678"
                            maxLength="13"
                        />
                        <div className="auth-hint">
                            {phone && phone.replace(/\D/g, '').length !== 11 && phone.length > 0 
                                ? "11자리 숫자를 입력해주세요" 
                                : "\u00A0"
                            }
                        </div>
                    </div>

                    {/* GitHub URL */}
                    <div className="auth-field">
                        <label className="auth-label">GitHub URL</label>
                        <input
                            className="auth-input"
                            type="url"
                            name="githubUrl"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="https://github.com/yourname"
                        />
                    </div>

                    {/* 프로필 사진 */}
                    <div className="auth-field">
                        <label className="auth-label">프로필 사진 (선택)</label>
                        <div className="auth-dashed-box">
                            <ImagePicker value={photoFile} onChange={setPhotoFile} />
                            {uploading ? (
                                <div style={{ marginTop: 8 }}>
                                    <div className="auth-progress-track">
                                        <div className="auth-progress-bar" style={{ width: `${progress}%` }} />
                                    </div>
                                    <div className="auth-subtle" style={{ marginTop: 6 }}>{progress}% 업로드 중…</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* 액션 버튼 */}
                    <button
                        type="submit"
                        disabled={disabled}
                        className="auth-btn"
                    >
                        {loading ? (
                            <>
                                회원가입 중…
                                <span className="auth-dot" style={{ animationDelay: "0s" }} />
                                <span className="auth-dot" style={{ animationDelay: ".2s" }} />
                                <span className="auth-dot" style={{ animationDelay: ".4s" }} />
                            </>
                        ) : (
                            "회원가입"
                        )}
                    </button>

                    <button
                        type="button"
                        className="auth-btn-secondary"
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
