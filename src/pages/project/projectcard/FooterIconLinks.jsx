import React from "react";
import { Stack, IconButton } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const FooterIconLinks = ({ notion, github, deploy, onClickStop = true }) => {
    const stop = (e) => onClickStop && e.stopPropagation();
    return (
        <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
            {notion && (
                <IconButton component="a" href={notion} target="_blank" rel="noopener noreferrer" size="small" onClick={stop}>
                    <NotesIcon fontSize="small" />
                </IconButton>
            )}
            {github && (
                <IconButton component="a" href={github} target="_blank" rel="noopener noreferrer" size="small" onClick={stop}>
                    <GitHubIcon fontSize="small" />
                </IconButton>
            )}
            {deploy && (
                <IconButton component="a" href={deploy} target="_blank" rel="noopener noreferrer" size="small" onClick={stop}>
                    <OpenInNewIcon fontSize="small" />
                </IconButton>
            )}
        </Stack>
    );
};

export default FooterIconLinks;
