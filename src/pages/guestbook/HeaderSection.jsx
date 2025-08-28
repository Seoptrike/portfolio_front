import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import HeroHeader from "../../components/common/HeroHeader";

const HeaderSection = React.memo(function HeaderSection({ editMode, username }) {
    return (
        <HeroHeader
            title="방명록"
            icon={<NotesIcon sx={{ fontSize: 18 }} />}
            showChip
            chipLabel={`@${username}`}
            editMode={editMode}                
            primaryActionLabel="등록하러가기"
            primaryActionIcon={<AddIcon />}
            actionButtonProps={{
                component: RouterLink,
                to: `/${username}/project/insert`,     // ⬅️ 라우팅 정상 동작
                sx: { borderRadius: 999, px: 2 },
            }}
            sx={{ mb: 2.5 }}
        />
    );
});

export default HeaderSection;
