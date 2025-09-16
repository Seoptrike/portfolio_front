// 페이지 설정 통합 관리
import { FiUser, FiFileText, FiFolder, FiBriefcase, FiMessageCircle } from "react-icons/fi";

// 페이지 키 상수
export const PAGE_KEYS = {
    MAIN: 'MAIN',
    ABOUT: 'ABOUT',
    PROJECT: 'PROJECT',
    RESUME: 'RESUME',
    GUESTBOOK: 'GUESTBOOK',
    PROFILE: 'PROFILE'
};

// 통합 페이지 설정
export const PAGE_CONFIG = {
    [PAGE_KEYS.MAIN]: {
        title: '메인페이지',
        label: '메인페이지',
        route: '.',
        emoji: '🏠',
        icon: FiUser,
        actionRoute: null
    },
    [PAGE_KEYS.ABOUT]: {
        title: '자기소개서',
        label: '자기소개서',
        route: 'about',
        emoji: '👨‍💻',
        icon: FiFileText,
        actionRoute: '/aboutme/insert'
    },
    [PAGE_KEYS.PROJECT]: {
        title: '프로젝트',
        label: '프로젝트',
        route: 'project',
        emoji: '🚀',
        icon: FiFolder,
        actionRoute: '/project/insert'
    },
    [PAGE_KEYS.RESUME]: {
        title: '경력기술서',
        label: '경력기술서',
        route: 'resume',
        emoji: '📝',
        icon: FiBriefcase,
        actionRoute: '/resume/insert'
    },
    [PAGE_KEYS.GUESTBOOK]: {
        title: '피드백',
        label: '피드백',
        route: 'guestbook',
        emoji: '💬',
        icon: FiMessageCircle,
        actionRoute: '/guestbook/insert'
    },
    [PAGE_KEYS.PROFILE]: {
        title: '프로필',
        label: '프로필',
        route: 'profile',
        emoji: '👤',
        icon: FiUser,
        actionRoute: null
    }
};

// 네비게이션 아이템 생성 함수
export const getNavigationItems = (username) => [
    {
        ...PAGE_CONFIG[PAGE_KEYS.MAIN],
        to: PAGE_CONFIG[PAGE_KEYS.MAIN].route,
        label: `@${username}` // 메인페이지만 특별히 username 표시
    },
    {
        ...PAGE_CONFIG[PAGE_KEYS.ABOUT],
        to: PAGE_CONFIG[PAGE_KEYS.ABOUT].route
    },
    {
        ...PAGE_CONFIG[PAGE_KEYS.PROJECT],
        to: PAGE_CONFIG[PAGE_KEYS.PROJECT].route
    },
    {
        ...PAGE_CONFIG[PAGE_KEYS.RESUME],
        to: PAGE_CONFIG[PAGE_KEYS.RESUME].route
    },
    {
        ...PAGE_CONFIG[PAGE_KEYS.GUESTBOOK],
        to: PAGE_CONFIG[PAGE_KEYS.GUESTBOOK].route
    }
];

// 페이지 키로 설정 조회 함수
export const getPageConfig = (pageKey) => {
    return PAGE_CONFIG[pageKey] || PAGE_CONFIG[PAGE_KEYS.MAIN];
};

// 라우트로 페이지 키 찾기 함수
export const getPageKeyByRoute = (route) => {
    return Object.keys(PAGE_CONFIG).find(key =>
        PAGE_CONFIG[key].route === route
    ) || PAGE_KEYS.MAIN;
};

// 제목으로 페이지 키 찾기 함수
export const getPageKeyByTitle = (title) => {
    return Object.keys(PAGE_CONFIG).find(key =>
        PAGE_CONFIG[key].title === title
    ) || PAGE_KEYS.MAIN;
};

// 편집 모드 관련 텍스트
export const EDIT_MODE_TEXT = {
    EDIT_START: '수정 하기',
    EDIT_END: '수정 종료'
};