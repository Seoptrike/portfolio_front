import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./IntegratedNavigation.css";

const IntegratedNavigation = ({ 
    username,
    currentPageTitle,
    editMode,
    onPrimaryAction,
    actionRoute,
    primaryActionLabel = "등록하러가기"
}) => {
    // 페이지별 아이콘 매핑
    const getIconByTitle = (title) => {
        const iconMap = {
            '방명록': '💬',
            '자기소개서': '👨‍💻', 
            '프로젝트': '🚀',
            '경력 기술서': '📝'
        };
        return iconMap[title] || '📋';
    };

    const navigationItems = [
        { to: ".", label: `@${username}`, title: "메인페이지" },
        { to: "about", label: "자기소개서", title: "자기소개서" },
        { to: "project", label: "프로젝트", title: "프로젝트" },
        { to: "resume", label: "경력기술서", title: "경력 기술서" },
        { to: "guestbook", label: "방명록", title: "방명록" },
    ];

    return (
        <div className="integrated-navigation">
            {/* 상단 컬러 바 */}
            <div className="nav-color-bar"></div>
            
            <div className="nav-container">
                {/* 좌측: 페이지 정보 */}
                <div className="nav-page-info">
                    {currentPageTitle && (
                        <>
                            <div className="page-icon">
                                {getIconByTitle(currentPageTitle)}
                            </div>
                            <div className="page-details">
                                <h2 className="page-title">{currentPageTitle}</h2>
                                <span className="page-username">@{username}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* 중앙: 네비게이션 링크들 */}
                <nav className="nav-links">
                    {navigationItems.map(({ to, label, title }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "."}
                            className={({ isActive }) => 
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            title={title}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* 우측: 액션 버튼 */}
                {editMode && (onPrimaryAction || actionRoute) && (
                    <div className="nav-actions">
                        <Button
                            component={onPrimaryAction ? "button" : NavLink}
                            to={onPrimaryAction ? undefined : `/${username}${actionRoute}`}
                            onClick={onPrimaryAction}
                            variant="contained"
                            startIcon={<AddIcon />}
                            className="nav-action-btn"
                        >
                            {onPrimaryAction ? "추가" : primaryActionLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IntegratedNavigation;