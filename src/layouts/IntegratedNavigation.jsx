import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getNavigationItems, getPageConfig, getPageKeyByTitle } from "../config/pageConfig";
import useEditMode from "../hooks/useEditMode";
import "./IntegratedNavigation.css";

const IntegratedNavigation = ({
    username,
    currentPageTitle,
    onPrimaryAction,
    actionRoute,
    primaryActionLabel = "등록하러가기"
}) => {
    const { editMode } = useEditMode();
    // 페이지별 아이콘 매핑 (통합 설정 사용)
    const getIconByTitle = (title) => {
        const pageKey = getPageKeyByTitle(title);
        const config = getPageConfig(pageKey);
        return config.emoji || '📋';
    };

    const navigationItems = getNavigationItems(username);

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