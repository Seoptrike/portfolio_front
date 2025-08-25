// components/ProjectCard/DesktopCard.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import CardShell from "./CardShell";
import StackIconsRow from "./StackIconRow";
import FooterIconLinks from "./FooterIconLinks";

const clamp = (lines) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});

const DesktopCard = ({ project, stacks, editMode, onUpdate, links }) => {
    const { notion, github, deploy } = links;

    return (
        <CardShell editMode={editMode} onUpdate={onUpdate}>
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1", bgcolor: "background.default" }}>
                {project.thumbnailUrl ? (
                    <Box component="img" src={project.thumbnailUrl} alt="thumbnail"
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                    <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption" color="text.secondary">사진 없음</Typography>
                    </Box>
                )}

                <Box
                    sx={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        p: 1.25,
                        background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 55%)",
                        color: "#fff",
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, textAlign: "left", ...clamp(2), lineHeight: 1.25 }}>
                        {project.title}
                    </Typography>
                    {(project.startDate || project.endDate) && (
                        <Typography variant="caption" sx={{ opacity: 0.9, mt: 0.25 }}>
                            {project.startDate} {project.endDate && " ~ "}{project.endDate}
                        </Typography>
                    )}
                    {project.description && (
                        <Typography variant="body2" sx={{ whiteSpace: "pre-line", ...clamp(3) }}>
                            {project.description}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, px: 1, py: 0.5, borderTop: "1px solid", borderColor: "divider", minHeight: 44 }}>
                <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                    {!!stacks.length && <StackIconsRow names={stacks} max={12} />}
                </Box>
                <FooterIconLinks notion={notion} github={github} deploy={deploy} />
            </Box>
        </CardShell>
    );
};

export default DesktopCard;
