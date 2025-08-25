import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import HeroHeader from '../../components/common/HeroHeader';

const ResumeHeader = ({ username, editMode, handleOpen }) => {
    return (
        <HeroHeader
            title="경력 기술서"
            icon={<NotesIcon sx={{ fontSize: 18, color: (t) => t.palette.primary.contrastText }} />}
            showChip
            chipLabel={`@${username}`}
            editMode={editMode}
            onPrimaryAction={handleOpen}
            primaryActionLabel="추가"
            primaryActionIcon={<AddIcon />}
        />
    );
};

export default ResumeHeader