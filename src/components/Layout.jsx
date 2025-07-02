import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function Layout() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const handleNavClick = () => {
        setExpanded(false); // 메뉴 선택 시 드롭다운 닫기
    };

    const handleLogout = () => {
        localStorage.removeItem("username"); // 로그아웃 처리
        navigate("/auth/login"); // 로그인 페이지로 이동
    };

    return (
        <div>
            {/* 어두운 상단 네비게이션 바 */}
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                fixed="top"
                expanded={expanded}
                onToggle={(val) => setExpanded(val)}
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
                        <img
                            src="/images/seoportfolio_logo.png"
                            alt="Seoportfolio logo"
                            style={{
                                height: '3rem',     // 상대 크기 (기본 폰트 크기의 2배)
                                marginRight: '0.5rem',
                                verticalAlign: 'middle' // 텍스트와 수직 정렬
                            }}
                        />
                        Seoportfolio
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to={`/main/${username}`} onClick={handleNavClick}>Home</Nav.Link>
                            <Nav.Link as={Link} to={`/about/${username}`} onClick={handleNavClick}>About</Nav.Link>
                            <Nav.Link as={Link} to={`/projects/${username}`} onClick={handleNavClick}>Projects</Nav.Link>
                            <Nav.Link as={Link} to={`/guestbook/${username}`} onClick={handleNavClick}>Guestbook</Nav.Link>
                            {
                                username ? (
                                    <Nav.Link as={Button} variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">
                                        로그아웃
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/auth/login" className="ms-2">로그인</Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 바뀌는 내용 */}
            <main style={{ paddingTop: '80px', padding: '1rem', marginTop: '3rem' }}>
                <Outlet />
            </main>
        </div>
    );
}
