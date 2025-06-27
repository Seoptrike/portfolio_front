import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout() {
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
        setExpanded(false); // 메뉴 선택 시 드롭다운 닫기
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
                        김인섭의 포트폴리오
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/" onClick={handleNavClick}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/about" onClick={handleNavClick}>About</Nav.Link>
                            <Nav.Link as={Link} to="/projects" onClick={handleNavClick}>Projects</Nav.Link>
                            <Nav.Link as={Link} to="/guestbook" onClick={handleNavClick}>Guestbook</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 바뀌는 내용 */}
            <main style={{ paddingTop: '80px', padding: '1rem', marginTop:'3rem' }}>
                <Outlet />
            </main>
        </div>
    );
}
