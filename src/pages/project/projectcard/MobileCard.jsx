// components/ProjectCard/MobileCard.jsx
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CardShell from "./CardShell";
import StackIconsOneLine from "./StackIconOneLine";
import FooterLabelButtons from "./FooterLabelButtons";
import CommonHeroBanner from "../../../components/common/CommonHeroBanner";

const clamp = (lines) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});

const MobileCard = ({ project, stacks, editMode, onUpdate, links }) => {
    const { notion, github, deploy } = links;

    return (
        <CardShell editMode={editMode} onUpdate={onUpdate}>
            {/* 상단: [썸네일 | 정보] */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    px: 1, py: 1,
                    gap: 0,
                }}
            >
                {/* 왼쪽: 썸네일 칼럼 (오른쪽에 딱 붙임) */}
                <Box
                    sx={{
                        flex: "0 0 34%",
                        maxWidth: 140,
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        {project.thumbnailUrl ? (
                            <Box
                                component="img"
                                src={project.thumbnailUrl}
                                alt="thumbnail"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        ) : (
                            <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography variant="caption" color="text.secondary">사진 없음</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* 오른쪽: 정보 칼럼 */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 0.25,
                    }}
                >
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", transform: "scale(0.9)", transformOrigin: "center top", mb: -1 }}>
                        <CommonHeroBanner title={project.title} size="compact" />
                    </Box>

                    {(project.startDate || project.endDate) && (
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1, mt: 0 }}>
                            {project.startDate} {project.endDate && " ~ "}{project.endDate}
                        </Typography>
                    )}

                    {project.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ ...clamp(2), whiteSpace: "pre-line", mt: 0.25 }}>
                            {project.description}
                        </Typography>
                    )}

                    {!!stacks.length && (
                        <Box sx={{ width: "100%", mt: 0.25 }}>
                            <StackIconsOneLine names={stacks} />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* 하단: 라벨 버튼바 (항상 자리 확보, 전파 방지) */}
            <Stack
                direction="row" spacing={0.5}
                sx={{
                    px: 1, alignItems: "center", justifyContent: "center",
                    flexWrap: "nowrap", overflowX: "auto", overflowY: "hidden",
                    WebkitOverflowScrolling: "touch", minHeight: 40, my: 1,
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
                    "& .MuiButton-root": { whiteSpace: "nowrap" },
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <FooterLabelButtons notion={notion} github={github} deploy={deploy} />
            </Stack>
        </CardShell>
    );
};

export default MobileCard;
