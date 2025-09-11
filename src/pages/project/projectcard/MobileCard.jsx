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
                    px: 0.75, // 패딩 축소 (1 → 0.75)
                    py: 0.75, // 패딩 축소 (1 → 0.75)
                    gap: 0, // 칼럼 간 기본 간격 제거
                }}
            >
                {/* 왼쪽: 썸네일 (정사각형 1:1) */}
                <Box
                    sx={{
                        flex: "0 0 30%", // 크기 축소 (34% → 30%)
                        maxWidth: 120, // 최대 크기 축소 (140 → 120)
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        pr: 0.25,              // 🔸 오른쪽 칼럼과의 간격 더 좁힘
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            aspectRatio: "1 / 1", // 정사각형
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
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="caption" color="text.secondary">
                                    사진 없음
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* 오른쪽: 정보 + 하단 버튼(가운데 정렬) */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        pl: 0.5,                 // 🔸 좌측 썸네일과 간격 축소
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    {/* 정보영역 */}
                    <Box sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                transform: "scale(0.85)", // 더 작게 축소 (0.9 → 0.85)
                                transformOrigin: "center top",
                                mb: -1.5, // 히어로-날짜 간격 압축
                            }}
                        >
                            <CommonHeroBanner title={project.title} size="compact" />
                        </Box>

                        {(project.startDate || project.endDate) && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ lineHeight: 1.1, mt: 0 }}
                            >
                                {project.startDate} {project.endDate && " ~ "}
                                {project.endDate}
                            </Typography>
                        )}

                        {project.description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ 
                                    ...clamp(2), 
                                    whiteSpace: "pre-line", 
                                    mt: 0.25,
                                    fontSize: "0.8rem" // 폰트 크기 축소
                                }}
                            >
                                {project.description}
                            </Typography>
                        )}

                        {!!stacks.length && (
                            <Box sx={{ width: "100%", mt: 0.25 }}>
                                <StackIconsOneLine names={stacks} />
                            </Box>
                        )}
                    </Box>

                    {/* 하단: 초소형(dense) URL 버튼 — 가운데 정렬 */}
                    <Stack
                        direction="row"
                        spacing={0.4} // 간격 축소 (0.5 → 0.4)
                        sx={{
                            mt: 0.5, // 마진 축소 (0.75 → 0.5)
                            justifyContent: "center",  // 🔸 가운데 정렬
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            overflowY: "hidden",
                            WebkitOverflowScrolling: "touch",
                            minHeight: 24, // 높이 축소 (28 → 24)
                            "&::-webkit-scrollbar": { height: 6 },
                            "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },

                            // dense 버튼 스타일
                            "& .MuiButton-root": {
                                whiteSpace: "nowrap",
                                minHeight: 22, // 높이 축소 (26 → 22)
                                lineHeight: 1,
                                px: 0.5, // 패딩 축소 (0.6 → 0.5)
                                py: 0.1, // 패딩 축소 (0.2 → 0.1)
                                fontSize: "0.65rem", // 폰트 크기 축소 (0.7rem → 0.65rem)
                                borderColor: "text.secondary",
                                color: "text.primary",
                            },
                            "& .MuiButton-root:hover": {
                                borderColor: "text.primary",
                                bgcolor: "action.hover",
                            },
                            "& .MuiButton-startIcon": { mr: 0.3 }, // 마진 축소 (0.4 → 0.3)
                            "& .MuiButton-startIcon svg": { fontSize: 12 }, // 아이콘 크기 축소 (13 → 12)
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FooterLabelButtons notion={notion} github={github} deploy={deploy} />
                    </Stack>
                </Box>
            </Box>
        </CardShell>
    );
};

export default MobileCard;
