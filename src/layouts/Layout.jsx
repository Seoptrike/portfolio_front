import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/authApi";
import { BsSearch, BsBoxArrowRight, BsBoxArrowInRight } from "react-icons/bs";
import "./Layout.css";

/**
 * 메인 레이아웃 컴포넌트
 * 네비게이션 바와 메인 콘텐츠 영역을 제공하는 최상위 레이아웃
 *
 * 기능:
 * - 반응형 네비게이션 바 (고정 위치)
 * - 로그인/로그아웃 기능
 * - 관리자 모드 접근
 * - 검색 기능
 * - 최대 너비 제한 (1440px)
 *
 * @component
 * @returns {JSX.Element} 레이아웃 컴포넌트
 */
const Layout = () => {
    // 네비게이션 바 확장 상태
    const [expanded, setExpanded] = useState(false);
    // 인증 관련 상태 및 함수들
    const { isLogin, loginName, loginCheckHandler, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    // 네비게이션 바 높이 계산을 위한 ref
    const navRef = useRef(null);
    // 동적으로 계산되는 네비게이션 바 높이
    const [navHeight, setNavHeight] = useState(64);

    // 레이아웃 최대 너비 설정
    const MAX_WIDTH = 1440;
    // 메인 콘텐츠 래퍼 스타일
    const wrapperStyle = {
        maxWidth: MAX_WIDTH,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        paddingRight: '1rem',
        paddingLeft: '1rem',
    };

    /**
     * 네비게이션 바 높이를 동적으로 계산하여 메인 콘텐츠의 패딩 조정
     * 창 크기 변경 시에도 높이를 재계산
     */
    useLayoutEffect(() => {
        const el = navRef.current;
        if (!el) return;
        const setHeight = () => setNavHeight(el.offsetHeight);
        setHeight();
        window.addEventListener("resize", setHeight);
        return () => window.removeEventListener("resize", setHeight);
    }, []);

    /**
     * 로그아웃 처리 함수
     * - API 호출을 통한 로그아웃
     * - 로컬 스토리지에서 사용자명 제거
     * - 로그인 상태 체크 후 홈페이지로 이동
     */
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("username");
        await loginCheckHandler();
        navigate("/");
    };

    return (
        <div>
            <Navbar
                ref={navRef}
                bg="dark"
                variant="dark"
                expand="lg"
                fixed="top"
                expanded={expanded}
                onToggle={setExpanded}
                style={{
                    '--bs-navbar-padding-y': '.25rem',          // 기본 .5rem → .25rem
                    '--bs-navbar-brand-padding-y': '0',         // 브랜드 상하 패딩 제거
                    '--bs-navbar-brand-font-size': '1rem',      // 필요시 텍스트도 줄이기
                    '--bs-navbar-nav-link-padding-x': '.5rem',  // 링크 좌우 여백 축소
                    minHeight: 56
                }}
            >
                <Container style={{ maxWidth: MAX_WIDTH, width: '100%' }}>
                    <Navbar.Brand
                        as={Link}
                        to={loginName ? `/${loginName}` : `/`}
                        onClick={() => setExpanded(false)}
                        style={{ display: "flex", alignItems: "center", margin: "0 1.5rem" }}
                    >
                        <img
                            src="/images/seoportfolio_logo.png"
                            alt="Seoportfolio"
                            style={{ height: "3rem", marginRight: "0.5rem" }}
                        />
                        Seoportfolio
                    </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="ms-auto" style={{ alignItems: "center", gap: "0.5rem" }}>
                            {/* 관리자 모드 */}
                            {isAdmin && (
                                <button
                                    className="nav-custom-btn admin-btn"
                                    onClick={() => {
                                        setExpanded(false);
                                        navigate("/admin");
                                    }}
                                >
                                    관리자모드
                                </button>
                            )}
                            
                            {/* 검색 */}
                            <button
                                className="nav-custom-btn search-btn"
                                onClick={() => {
                                    setExpanded(false);
                                    navigate("/search");
                                }}
                            >
                                <span className="d-none d-md-inline">
                                    검색 <BsSearch size={16} />
                                </span>
                                <span className="d-md-none">검색</span>
                            </button>

                            {/* 로그인/로그아웃 */}
                            {isLogin ? (
                                <button
                                    className="nav-custom-btn logout-btn"
                                    onClick={handleLogout}
                                >
                                    <span className="d-none d-md-inline">
                                        로그아웃 <BsBoxArrowRight size={16} />
                                    </span>
                                    <span className="d-md-none">로그아웃</span>
                                </button>
                            ) : (
                                <button
                                    className="nav-custom-btn login-btn"
                                    onClick={() => {
                                        setExpanded(false);
                                        navigate("/auth/login");
                                    }}
                                >
                                    <span className="d-none d-md-inline">
                                        로그인 <BsBoxArrowInRight size={16} />
                                    </span>
                                    <span className="d-md-none">로그인</span>
                                </button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main style={{ paddingTop: navHeight, overflowX: 'hidden' }}>
                <div style={{ ...wrapperStyle, paddingBottom: '1rem' }}>
                    <Outlet context={{ navHeight }} />
                </div>
            </main>

        </div>
    );
};

export default Layout;