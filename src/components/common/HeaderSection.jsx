import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HeroHeader from "./HeroHeader";

const HeaderSection = React.memo(function HeaderSection({ 
    title, 
    editMode, 
    username,
    actionRoute = `/project/insert`, // 기본값
    sx = { mb: 2.5 }
}) {
    // 타이틀에 따른 아이콘 매핑 (메인페이지와 동일한 이모지)
    const getIconByTitle = (title) => {
        const iconMap = {
            '방명록': '💬',
            '자기소개서': '👨‍💻', 
            '프로젝트': '🚀',
            '경력 기술서': '📝'
        };
        const iconEmoji = iconMap[title] || '📋';
        return <span style={{ fontSize: '18px' }}>{iconEmoji}</span>;
    };

    return (
        <HeroHeader
            title={title}
            icon={getIconByTitle(title)}
            showChip
            chipLabel={`@${username}`}
            editMode={editMode}                
            primaryActionLabel="등록하러가기"
            primaryActionIcon={<AddIcon />}
            actionButtonProps={{
                component: RouterLink,
                to: `/${username}${actionRoute}`,
                sx: { borderRadius: 999, px: 2 },
            }}
            sx={sx}
        />
    );
});

export default HeaderSection;