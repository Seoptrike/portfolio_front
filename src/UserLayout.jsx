// src/routes/UserLayout.jsx
import React, { useContext } from "react";
import { NavLink, Outlet, useParams, useOutletContext } from "react-router-dom";
import { FiUser, FiFileText, FiFolder, FiBriefcase, FiMessageCircle } from "react-icons/fi";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext";
import EditModeProvider from "./providers/EditModeProvider";
import useEditMode from "./hooks/useEditMode"; // ✅ 훅 분리 후 경로
import useIsMobile from "./hooks/useIsMobile";

const HeaderEditFAB = ({ isHost }) => {
    const { editMode, setEditMode } = useEditMode();
    if (!isHost) return null;
    return (
        <Button
            onClick={() => setEditMode(!editMode)}
            style={{
                position: "fixed",
                right: "16px",
                bottom: "16px",
                zIndex: 1050,
                borderRadius: "9999px",
            }}
            variant={editMode ? "danger" : "primary"}
            size="lg"
        >
            {editMode ? "수정 종료" : "수정 모드"}
        </Button>
    );
};
// 아이콘 전용 탭: 1/5씩 균등분배, 텍스트는 숨기고 아이콘만
const IconTab = ({ to, label, children }) => {
  return (
    <NavLink
      to={to}
      end={to === "."}
      aria-label={label}
      title={label} // 모바일에선 툴팁 제한적이지만 데스크톱에선 도움됨
      style={({ isActive }) => ({
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0",
        textDecoration: "none",
        // 아이콘 색상
        color: isActive ? "#0d6efd" : "#495057",
        // active indicator
        boxShadow: isActive ? "inset 0 -2px 0 #0d6efd" : "inset 0 -2px 0 transparent",
      })}
    >
      {children}
    </NavLink>
  );
};


const UserLayout = () => {
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const { navHeight } = useOutletContext() ?? { navHeight: 64 };
    const isMobile = useIsMobile(); // <768px

    return (
        <EditModeProvider isHost={isHost} username={username} persist={false}>
            <Container>
                {/* 데스크톱: Navbar + Collapse (기존) */}
                {!isMobile && (
                    <Navbar
                        bg="light"
                        variant="light"
                        expand="lg"
                        style={{
                            position: "sticky",
                            top: navHeight,
                            zIndex: 1020,
                            marginBottom: "1rem",
                            borderRadius: "0.5rem",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    >
                        <Navbar.Brand className="fw-semibold">@{username}</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} end to=".">프로필</Nav.Link>
                                <Nav.Link as={NavLink} to="about">자기소개서</Nav.Link>
                                <Nav.Link as={NavLink} to="project">프로젝트</Nav.Link>
                                <Nav.Link as={NavLink} to="resume">경력기술서</Nav.Link>
                                <Nav.Link as={NavLink} to="guestbook">방명록</Nav.Link>
                            </Nav>
                            {/* 데스크톱에선 버튼 헤더 우측 */}
                            <DeskTopEditButton isHost={isHost} />
                        </Navbar.Collapse>
                    </Navbar>
                )}

                {/* 모바일: Collapse 제거, 가로 스크롤 탭 + FAB */}
                {isMobile && (
                    <>
                        {/* 고정 유저명 바 (선택) */}
                        <div style={{
                            position: "sticky",
                            top: navHeight,
                            zIndex: 1020,
                            background: "#fff",
                            padding: "0.5rem 0.75rem",
                            fontWeight: 600
                        }}>
                            @{username}
                        </div>

                        {/* 아이콘 탭 바: 1줄에 5개 꽉 채우기 */}
                        <nav
                            style={{
                                position: "sticky",
                                top: navHeight + 32, // 유저명 바 높이만큼 오프셋 (상황에 맞게 조정)
                                zIndex: 1020,
                                background: "#fff",
                                borderTop: "1px solid rgba(0,0,0,0.06)",
                                borderBottom: "1px solid rgba(0,0,0,0.06)"
                            }}
                            aria-label="User section navigation"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "stretch"
                                }}
                            >
                                <IconTab to="." label="프로필"><FiUser size={22} /></IconTab>
                                <IconTab to="about" label="자기소개서"><FiFileText size={22} /></IconTab>
                                <IconTab to="project" label="프로젝트"><FiFolder size={22} /></IconTab>
                                <IconTab to="resume" label="경력기술서"><FiBriefcase size={22} /></IconTab>
                                <IconTab to="guestbook" label="방명록"><FiMessageCircle size={22} /></IconTab>
                            </div>
                        </nav>
                        {/* 모바일에선 FAB 유지(수정 모드 토글) */}
                        <HeaderEditFAB isHost={isHost} />
                    </>
                )}
                <Outlet context={{ username }} />
            </Container>
        </EditModeProvider>
    );
};

const DeskTopEditButton = ({ isHost }) => {
    const { editMode, setEditMode } = useEditMode();
    if (!isHost) return null;
    return (
        <Button
            variant={editMode ? "outline-danger" : "outline-primary"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
        >
            {editMode ? "수정 종료" : "수정 모드"}
        </Button>
    );
};

export default UserLayout;