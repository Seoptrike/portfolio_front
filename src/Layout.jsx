import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext";
import { logout } from "./api/authApi";
import { BsSearch, BsBoxArrowRight, BsBoxArrowInRight } from "react-icons/bs";

const Layout = () => {
    const [expanded, setExpanded] = useState(false);
    const { isLogin, loginName, loginCheckHandler } = useContext(AuthContext);
    const navigate = useNavigate();
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(64);

    // 원하는 최대 폭(px)
    const MAX_WIDTH = 1440;

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
            >
                {/* 컨테이너를 넓게: maxWidth 인라인 지정 */}
                <Container style={{ maxWidth: MAX_WIDTH, width: "100%" }}>
                    <Navbar.Brand
                        as={Link}
                        to={loginName ? `/${loginName}` : `/`}
                        onClick={() => setExpanded(false)}
                        style={{ display: "flex", alignItems: "center" }}
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
                            <Nav.Link
                                as={Link}
                                to="/search"
                                onClick={() => setExpanded(false)}
                                className="text-md-start text-center"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <span className="d-none d-md-inline">
                                    <BsSearch size={18} />
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
                                        <BsBoxArrowRight size={18} />
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
                                        <BsBoxArrowInRight size={18} />
                                    </span>
                                    <span className="d-md-none">로그인</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 본문 래퍼를 중앙정렬 + 폭 제한 + 가로 스크롤 숨김 */}
            <main style={{ paddingTop: navHeight, overflowX: "hidden" }}>
                <div
                    style={{
                        maxWidth: MAX_WIDTH,
                        margin: "0 auto",
                        width: "100%",
                        boxSizing: "border-box",
                        paddingRight: "1rem",
                        paddingLeft: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Outlet context={{ navHeight }} />
                </div>
            </main>
        </div>
    );
};

export default Layout;
