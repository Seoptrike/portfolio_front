import React from "react";
import useIsMobile from "../../hooks/useIsMobile";

const CommonHeroBanner = ({
    title,
    icon,                    // optional icon
    eyebrow,                 // optional small label
    size ,        // "compact" | "section" | "hero"
    rounded = 16,
    maxW = 1200,
    padY, padX,
    accent = "linear-gradient(90deg,#ff8a00,#ff3d00)", // orange 계열 포인트 바
}) => {
    const isMobile = useIsMobile();

    // 타이틀 폰트 스케일 프리셋
    const titleClamp = {
        compact: {
            mobile: "clamp(1.1rem, 4.0vw, 1.5rem)",   // 작은 섹션 타이틀 느낌
            desktop: "clamp(1.25rem, 1.4vw, 1.6rem)",
        },
        section: {
            mobile: "clamp(1.25rem, 4.6vw, 1.75rem)",
            desktop: "clamp(1.6rem, 2.0vw, 2rem)",
        },
        hero: {
            mobile: "clamp(1.4rem, 4.8vw, 2rem)",
            desktop: "clamp(2rem, 2.6vw, 3rem)",
        },
    };

    // 패딩 프리셋
    const pad = {
        compact: { my: isMobile ? "1.1rem" : "0.7rem", mx: isMobile ? "1rem" : "0.5rem" },
        section: { my: isMobile ? "1.4rem" : "2.2rem", mx: isMobile ? "1rem" : "1.5rem" },
        hero: { my: isMobile ? "1.8rem" : "3rem", mx: isMobile ? "1rem" : "1.5rem" },
    };

    const py = padY ?? pad[size].my;
    const px = padX ?? pad[size].mx;

    return (
        <div
            style={{
                background: "transparent",
                borderRadius: `${rounded}px`,
                padding: `${py} ${px}`,
            }}
        >
            <div style={{ maxWidth: maxW, margin: "0 auto", textAlign: "center" }}>
                {eyebrow && (
                    <div
                        style={{
                            marginBottom: isMobile ? "0.35rem" : "0.45rem",
                            fontSize: "clamp(0.72rem, 1.2vw, 0.85rem)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#6b7280",
                        }}
                    >
                        {eyebrow}
                    </div>
                )}

                <h1
                    style={{
                        margin: 0,
                        fontSize: isMobile ? titleClamp[size].mobile : titleClamp[size].desktop,
                        fontWeight: 800,
                        lineHeight: 1.12,
                        letterSpacing: "-0.015em",
                        color: "#0f172a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: icon ? (isMobile ? "0.5rem" : "0.7rem") : 0,
                    }}
                >
                    {icon && (
                        <span 
                            style={{
                                fontSize: isMobile ? titleClamp[size].mobile : titleClamp[size].desktop,
                                lineHeight: 1,
                            }}
                        >
                            {icon}
                        </span>
                    )}
                    {title}
                </h1>

                {/* 포인트 바 */}
                <div
                    style={{
                        margin: isMobile ? "10px auto 0" : "12px auto 0",
                        width:
                            size === "compact" ? (isMobile ? 44 : 56) :
                                size === "section" ? (isMobile ? 52 : 68) : (isMobile ? 56 : 72),
                        height: size === "compact" ? 3 : 4,
                        borderRadius: 999,
                        background: accent,
                    }}
                />
            </div>
        </div>
    );
};

export default CommonHeroBanner;
