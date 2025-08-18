// src/routes/UserLayout.jsx
import React, { useContext } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FiUser, FiFileText, FiFolder, FiBriefcase, FiMessageCircle } from "react-icons/fi";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext";
import EditModeProvider from "./providers/EditModeProvider";
import useEditMode from "./hooks/useEditMode";
import useIsMobile from "./hooks/useIsMobile";
import { FaCog, FaSave } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const HeaderEditFAB = ({ isHost }) => {
    const { editMode, setEditMode } = useEditMode();

    if (!isHost) return null;
    return (
        <Button
            onClick={() => setEditMode(!editMode)}
            style={{
                position: "fixed",
                right: "2vw",
                bottom: "2vh",
                zIndex: 1050,
                borderRadius: "50%",
                width: "8vw",
                height: "8vw",
                maxWidth: "64px",
                maxHeight: "64px",
                minWidth: "40px",
                minHeight: "40px",
                padding: 0,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: editMode ? "#0d6efd" : "#343a40", // 수정모드: 파란색 / 기본: 짙은 회색
                border: "none",
            }}
        >
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip>{editMode ? "수정 종료" : "수정 하기"}</Tooltip>}
            >
                <span>
                    {editMode ? <FaSave size="50%" color="#fff" /> : <FaCog size="50%" color="#fff" />}
                </span>
            </OverlayTrigger>
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
                color: isActive ? "#495057" : "#495057",
                // active indicator
                boxShadow: isActive ? "inset 0 -2px 0 #495057" : "inset 0 -2px 0 transparent",
            })}
        >
            {children}
        </NavLink>
    );
};


const UserLayout = () => {
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const isMobile = useIsMobile(); // <768px

    const desktopLinks = (username) => [
        { to: ".", label: <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>@{username}</span>, end: true, strong: true },
        { to: "about", label: "자기소개서" },
        { to: "project", label: "프로젝트" },
        { to: "resume", label: "경력기술서" },
        { to: "guestbook", label: "방명록" },
    ];

    return (
        <EditModeProvider isHost={isHost} username={username} persist={false}>
            {/* 데스크톱: Navbar + Collapse (기존) */}
            {!isMobile && (
                <Navbar
                    variant="light"
                    expand="lg"
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1020,
                        marginBottom: "1rem",
                        borderRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                    }}
                >
                    <Navbar.Toggle />
                    <Navbar.Collapse className="w-100">
                        {/* 한 줄에 Nav(좌) + 버튼(우) */}
                        <div className="d-flex align-items-center w-100">
                            {/* ✅ Nav가 전체 폭을 먹고 */}
                            <Nav className="flex-grow-1 d-flex w-100">
                                {desktopLinks(username).map(({ to, label, end, strong }) => (
                                    <Nav.Link
                                        key={to}
                                        as={NavLink}
                                        to={to}
                                        end={end}
                                        className="flex-fill text-center"
                                        style={({ isActive }) => ({
                                            fontWeight: isActive ? 700 : 400,
                                            color: isActive ? "#212529" : "#495057",
                                            borderBottom: isActive ? "2px solid #212529" : "2px solid transparent",
                                            textDecoration: "none",
                                            padding: "0.5rem 0",
                                        })}
                                    >
                                        {strong ? <strong>{label}</strong> : label}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            )}

            {/* 모바일: Collapse 제거, 가로 스크롤 탭 + FAB */}
            {isMobile && (
                <>
                    {/* 아이콘 탭 바: 1줄에 5개 꽉 채우기 */}
                    <nav
                        style={{
                            position: "sticky",
                            top: 0, // 유저명 바 높이만큼 오프셋 (상황에 맞게 조정)
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
                            <IconTab to="." label={`@${username}`}><FiUser size={22} /></IconTab>
                            <IconTab to="about" label="자기소개서"><FiFileText size={22} /></IconTab>
                            <IconTab to="project" label="프로젝트"><FiFolder size={22} /></IconTab>
                            <IconTab to="resume" label="경력기술서"><FiBriefcase size={22} /></IconTab>
                            <IconTab to="guestbook" label="방명록"><FiMessageCircle size={22} /></IconTab>
                        </div>
                    </nav>
                </>
            )}
            <HeaderEditFAB isHost={isHost} />
            <div className="mt-3">
                <Outlet context={{ username }} />
            </div>
        </EditModeProvider>
    );
};

export default UserLayout;