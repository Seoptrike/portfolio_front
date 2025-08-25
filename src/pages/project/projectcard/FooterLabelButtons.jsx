import React from "react";
import { Button } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const FooterLabelButtons = ({ notion, github, deploy, onClickStop = true }) => {
    const stop = (e) => onClickStop && e.stopPropagation();
    const btnSx = {
        borderColor: "text.secondary",
        color: "text.primary",
        "&:hover": { borderColor: "text.primary", bgcolor: "action.hover" },
        whiteSpace: "nowrap",
    };

    return (
        <>
            {notion && (
                <Button
                    variant="outlined" color="inherit" size="small"
                    startIcon={<NotesIcon fontSize="small" />}
                    href={notion} target="_blank" rel="noopener noreferrer"
                    onClick={stop} sx={btnSx}
                >
                    Notion
                </Button>
            )}
            {github && (
                <Button
                    variant="outlined" color="inherit" size="small"
                    startIcon={<GitHubIcon fontSize="small" />}
                    href={github} target="_blank" rel="noopener noreferrer"
                    onClick={stop} sx={btnSx}
                >
                    GitHub
                </Button>
            )}
            {deploy && (
                <Button
                    variant="outlined" color="inherit" size="small"
                    startIcon={<OpenInNewIcon fontSize="small" />}
                    href={deploy} target="_blank" rel="noopener noreferrer"
                    onClick={stop} sx={btnSx}
                >
                    배포링크
                </Button>
            )}
        </>
    );
};

export default FooterLabelButtons;
