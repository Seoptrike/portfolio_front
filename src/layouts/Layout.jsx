import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/authApi";
import { BsSearch, BsBoxArrowRight, BsBoxArrowInRight } from "react-icons/bs";

const Layout = () => {
    const [expanded, setExpanded] = useState(false);
    const { isLogin, loginName, loginCheckHandler, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(64);

    // 원하는 최대 폭(px)
    const MAX_WIDTH = 1440;
    const wrapperStyle = {
        maxWidth: MAX_WIDTH,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        paddingRight: '1rem',
        paddingLeft: '1rem',
    };
    useLayoutEffect(() => {
        const el = navRef.current;
        if (!el) return;
        const setHeight = () => setNavHeight(el.offsetHeight);
        setHeight();
        window.addEventListener("resize", setHeight);
        return () => window.removeEventListener("resize", setHeight);
    }, []);

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
                        <Nav className="ms-auto" style={{ alignItems: "center" }}>
                            {/* 검색 */}
                            {isAdmin &&
                                <Nav.Link
                                    as={Link}
                                    to="/admin"
                                    onClick={() => setExpanded(false)}
                                    className="text-md-start text-center"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <span>관리자모드</span>
                                </Nav.Link>
                            }
                            <Nav.Link
                                as={Link}
                                to="/search"
                                onClick={() => setExpanded(false)}
                                className="text-md-start text-center"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <span className="d-none d-md-inline">
                                    찾기 <BsSearch size={18} />
                                </span>
                                <span className="d-md-none">검색</span>
                            </Nav.Link>

                            {isLogin ? (
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="ms-2 text-md-start text-center"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <span className="d-none d-md-inline">
                                        로그아웃 <BsBoxArrowRight size={18} />
                                    </span>
                                    <span className="d-md-none">로그아웃</span>
                                </Button>
                            ) : (
                                <Nav.Link
                                    as={Link}
                                    to="/auth/login"
                                    className="ms-2 text-md-start text-center"
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    <span className="d-none d-md-inline">
                                        로그인 <BsBoxArrowInRight size={18} />
                                    </span>
                                    <span className="d-md-none">로그인</span>
                                </Nav.Link>
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