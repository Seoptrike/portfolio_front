// src/layouts/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

const AdminLayout = () => {
    const { navHeight = 56 } = useOutletContext() || {};

    // 반응형 width 관리
    const [sizes, setSizes] = useState({
        sidebarWidth: 420,
        contentOffset: 300,
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;

            if (w >= 1400) {
                // 데스크탑 대형 화면
                setSizes({ sidebarWidth: 240, contentOffset: 16 });
            } else if (w >= 992) {
                // 일반 노트북/데스크탑
                setSizes({ sidebarWidth: 240, contentOffset: 16 });
            } else if (w >= 768) {
                // 태블릿
                setSizes({ sidebarWidth: 240, contentOffset: 16 }); // 본문 꽉 채움
            } else {
                // 모바일
                setSizes({ sidebarWidth: 240, contentOffset: 16 }); // 본문 꽉 채움
            }
        };

        handleResize(); // 초기값 계산
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* 고정 사이드바 */}
            <aside
                style={{
                    position: "fixed",
                    top: navHeight,
                    left: 0,
                    bottom: 0,
                    width: sizes.sidebarWidth,
                    background: "#212529", // Bootstrap dark
                    color: "#fff",
                    overflowY: "auto",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        fontWeight: 700,
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    관리자 대시보드
                </div>

                <nav style={{ padding: "8px 0" }}>
                    <MenuItem to="/admin" label="대시보드" end />
                    <MenuItem to="/admin/projects" label="프로젝트 관리" />
                    <MenuItem to="/admin/stacks" label="기술스택 관리" />
                    <MenuItem to="/admin/guestbook" label="방명록 관리" />
                    <MenuItem to="/admin/settings" label="설정" />
                </nav>
            </aside>

            {/* 콘텐츠 영역 */}
            <section
                style={{
                    marginLeft: sizes.contentOffset,
                    padding: 16,
                    minHeight: `calc(100vh - ${navHeight}px)`,
                    background: "#f6f7f9",
                    transition: "margin-left 0.2s ease",
                }}
            >
                <Outlet />
            </section>
        </>
    );
};

function MenuItem({ to, label, end }) {
    return (
        <NavLink
            to={to}
            end={end}
            style={({ isActive }) => ({
                display: "block",
                padding: "12px 20px",
                color: "#fff",
                textDecoration: "none",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                fontWeight: isActive ? 700 : 400,
            })}
        >
            {label}
        </NavLink>
    );
}

export default AdminLayout;
