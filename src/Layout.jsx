import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { logout } from "./api/authApi";
import { BsSearch, BsPerson, BsBoxArrowRight, BsBoxArrowInRight } from "react-icons/bs";

export default function Layout() {
    const [expanded, setExpanded] = useState(false);
    const { isLogin, loginName, loginCheckHandler } = useContext(AuthContext);
    const navigate = useNavigate();
    const [iconSize, setIconSize] = useState(25);
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(64);
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
                <Container>
                    <Navbar.Brand
                        as={Link}
                        to={loginName ? `/${loginName}` : `/`}
                        onClick={() => setExpanded(false)}>
                        <img src="/images/seoportfolio_logo.png" alt="Seoportfolio" style={{ height: "3rem", marginRight: "0.5rem" }} />
                        Seoportfolio
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            {/* 검색 */}
                            <Nav.Link as={Link} to="/search" onClick={() => setExpanded(false)} className="text-md-start text-center">
                                {/* 데스크톱: 아이콘 */}
                                <span className="d-none d-md-inline"><BsSearch size={18} /></span>
                                {/* 모바일: 글자 */}
                                <span className="d-md-none">검색</span>
                            </Nav.Link>

                            {isLogin ? (
                                <>
                                    {/* 로그아웃 */}
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="ms-2 text-md-start text-center"
                                    >
                                        <span className="d-none d-md-inline"><BsBoxArrowRight size={18} /></span>
                                        <span className="d-md-none">로그아웃</span>
                                    </Button>
                                </>
                            ) : (
                                /* 로그인 */
                                <Nav.Link as={Link} to="/auth/login" className="ms-2 text-md-start text-center">
                                    <span className="d-none d-md-inline"><BsBoxArrowInRight size={18} /></span>
                                    <span className="d-md-none">로그인</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main style={{ paddingTop: navHeight, paddingRight: "1rem", paddingBottom: "1rem", paddingLeft: "1rem" }}>
                <Outlet context={{ navHeight }} />
            </main>

        </div>
    );
}
