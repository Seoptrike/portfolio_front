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
        fontSize: { xs: "0.65rem", sm: "0.75rem" }, // 모바일에서 폰트 크기 축소
        px: { xs: 0.5, sm: 1 }, // 모바일에서 패딩 축소
        py: { xs: 0.25, sm: 0.5 },
        minWidth: 0, // 최소 너비 제거
    };

    // 버튼 배열 생성 (항상 3개 슬롯 유지)
    const buttons = [];
    
    if (notion) {
        buttons.push(
            <Button
                key="notion"
                variant="outlined" color="inherit" size="small"
                startIcon={<NotesIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                href={notion} target="_blank" rel="noopener noreferrer"
                onClick={stop} sx={{...btnSx, flex: 1}}
            >
                Notion
            </Button>
        );
    }
    
    if (github) {
        buttons.push(
            <Button
                key="github"
                variant="outlined" color="inherit" size="small"
                startIcon={<GitHubIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                href={github} target="_blank" rel="noopener noreferrer"
                onClick={stop} sx={{...btnSx, flex: 1}}
            >
                GitHub
            </Button>
        );
    }
    
    if (deploy) {
        buttons.push(
            <Button
                key="deploy"
                variant="outlined" color="inherit" size="small"
                startIcon={<OpenInNewIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                href={deploy} target="_blank" rel="noopener noreferrer"
                onClick={stop} sx={{...btnSx, flex: 1}}
            >
                배포링크
            </Button>
        );
    }
    
    // 3개가 안되면 빈 공간 추가
    while (buttons.length < 3) {
        buttons.push(<div key={`empty-${buttons.length}`} style={{flex: 1}}></div>);
    }

    return <>{buttons}</>;
};

export default FooterLabelButtons;
