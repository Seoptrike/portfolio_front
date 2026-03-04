import React, { useContext } from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import EditModeProvider from "../providers/EditModeProvider";
import useEditMode from "../hooks/useEditMode";
import useIsMobile from "../hooks/useIsMobile";
import { FaCog, FaSave } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import IntegratedNavigation from "./IntegratedNavigation";
import { PAGE_CONFIG, PAGE_KEYS, EDIT_MODE_TEXT, getPageKeyByRoute } from "../config/pageConfig";
import "./UserLayout.css";
import "./IntegratedNavigation.css";

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
                overlay={<Tooltip>{editMode ? EDIT_MODE_TEXT.EDIT_END : EDIT_MODE_TEXT.EDIT_START}</Tooltip>}
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
    const location = useLocation();
    const { editMode } = useEditMode();

    // 현재 경로에 따른 페이지 정보 결정
    const getCurrentPageInfo = () => {
        const path = location.pathname;
        if (path.endsWith('/about')) return PAGE_CONFIG[PAGE_KEYS.ABOUT];
        if (path.includes('/project')) return PAGE_CONFIG[PAGE_KEYS.PROJECT];
        if (path.endsWith('/resume')) return PAGE_CONFIG[PAGE_KEYS.RESUME];
        if (path.endsWith('/guestbook')) return PAGE_CONFIG[PAGE_KEYS.GUESTBOOK];
        return null; // 메인페이지는 통합 네비게이션 안 보임
    };

    const pageInfo = getCurrentPageInfo();

    // 스크롤페이지 여부 확인 (URL에 scroll=true 파라미터가 있으면 스크롤페이지)
    const isScrollPage = new URLSearchParams(location.search).get('scroll') === 'true';

    const desktopLinks = (username) => [
        { to: ".", label: `@${username}`, end: true, strong: true },
        { to: "about", label: PAGE_CONFIG[PAGE_KEYS.ABOUT].label },
        { to: "project", label: PAGE_CONFIG[PAGE_KEYS.PROJECT].label },
        { to: "resume", label: PAGE_CONFIG[PAGE_KEYS.RESUME].label },
        { to: "guestbook", label: PAGE_CONFIG[PAGE_KEYS.GUESTBOOK].label },
    ];

    return (
        <EditModeProvider isHost={isHost} username={username} persist={false}>
            {/* 데스크톱: 통합 네비게이션 (메인페이지가 아닐 때만) */}
            {!isMobile && pageInfo && (
                <IntegratedNavigation
                    username={username}
                    currentPageTitle={pageInfo.title}
                    editMode={editMode}
                    actionRoute={pageInfo.actionRoute}
                />
            )}

            {/* 데스크톱: 3D glassmorphism 네비게이션 (메인페이지일 때, 스크롤페이지 제외) */}
            {!isMobile && !pageInfo && !isScrollPage && (
                <div className="integrated-navigation">
                    <div className="nav-color-bar"></div>
                    <div className="nav-container">
                        {/* 중앙: 네비게이션 링크들 */}
                        <nav className="nav-links">
                            {desktopLinks(username).map(({ to, label, end, strong }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    {strong ? <strong>{label}</strong> : label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
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
                            <IconTab to="." label={`@${username}`}>
                                {React.createElement(PAGE_CONFIG[PAGE_KEYS.PROFILE].icon, { size: 22 })}
                            </IconTab>
                            <IconTab to="about" label={PAGE_CONFIG[PAGE_KEYS.ABOUT].label}>
                                {React.createElement(PAGE_CONFIG[PAGE_KEYS.ABOUT].icon, { size: 22 })}
                            </IconTab>
                            <IconTab to="project" label={PAGE_CONFIG[PAGE_KEYS.PROJECT].label}>
                                {React.createElement(PAGE_CONFIG[PAGE_KEYS.PROJECT].icon, { size: 22 })}
                            </IconTab>
                            <IconTab to="resume" label={PAGE_CONFIG[PAGE_KEYS.RESUME].label}>
                                {React.createElement(PAGE_CONFIG[PAGE_KEYS.RESUME].icon, { size: 22 })}
                            </IconTab>
                            <IconTab to="guestbook" label={PAGE_CONFIG[PAGE_KEYS.GUESTBOOK].label}>
                                {React.createElement(PAGE_CONFIG[PAGE_KEYS.GUESTBOOK].icon, { size: 22 })}
                            </IconTab>
                        </div>
                    </nav>
                </>
            )}
            <HeaderEditFAB isHost={isHost} />
            <div className="mt-3 page-content">
                <Outlet context={{ username }} key={location.pathname} />
            </div>
        </EditModeProvider>
    );
};

export default UserLayout;