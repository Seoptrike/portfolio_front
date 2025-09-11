// components/ProjectCard/RectangleCard.jsx - 프로젝트 리스트용 직사각형 카드
import React from "react";
import { Box, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import CardShell from "./CardShell";
import StackIconsRow from "./StackIconRow";
import StackButtons from "./StackButtons";
import FooterIconLinks from "./FooterIconLinks";
import FooterLabelButtons from "./FooterLabelButtons";

const clamp = (lines) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
});

const RectangleCard = ({ project, stacks, editMode, onUpdate, links }) => {
    const { notion, github, deploy } = links;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md(768px) 미만을 모바일로 간주

    return (
        <CardShell editMode={editMode} onUpdate={onUpdate}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "row",
                height: { xs: 180, sm: 180, md: 200 }, // 모바일 높이 증가
                overflow: "hidden"
            }}>
                {/* 첫 번째 Column: 썸네일만 */}
                <Box sx={{ 
                    flex: { xs: "0 0 30%", sm: "0 0 22%", md: "0 0 25%" }, // 모바일 썸네일 크기 증가 (25% → 30%)
                    height: "100%",
                    bgcolor: "background.default",
                    p: { xs: 1, sm: 1.5 }, // 썸네일 주변 패딩 추가
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {project.thumbnailUrl ? (
                        <Box 
                            component="img" 
                            src={project.thumbnailUrl} 
                            alt="thumbnail"
                            sx={{ 
                                maxWidth: "100%", 
                                maxHeight: "100%", 
                                objectFit: "contain",
                                objectPosition: "center"
                            }} 
                        />
                    ) : (
                        <Box sx={{ 
                            width: "100%", 
                            height: "100%", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                        }}>
                            <Typography variant="caption" color="text.secondary">사진 없음</Typography>
                        </Box>
                    )}
                </Box>

                {/* 두 번째 Column: 프로젝트 정보 + 버튼 */}
                <Box sx={{ 
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 1.5, sm: 2 }, // 반응형 패딩
                    gap: { xs: 0.8, sm: 1 } // 반응형 간격
                }}>
                    {/* 제목 + 링크 버튼 Row */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: { xs: "center", sm: "space-between" }, // 모바일에서는 가운데 정렬
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row" }, // 모바일에서는 세로 배치
                        width: "100%"
                    }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700, 
                                ...clamp(2),
                                lineHeight: 1.3,
                                fontSize: { xs: "1.1rem", sm: "1.4rem" }, // 데스크톱 폰트 크기 증가
                                textAlign: { xs: "center", sm: "left" }, // 모바일에서만 가운데 정렬
                                flex: { xs: "none", sm: 1 }, // 모바일에서는 flex 제거
                                width: { xs: "100%", sm: "auto" }, // 모바일에서는 전체 너비
                                minWidth: 0
                            }}
                        >
                            {project.title}
                        </Typography>

                        {/* 링크 버튼 - 데스크톱에서만 표시 */}
                        {!isMobile && (
                            <Box sx={{ 
                                flexShrink: 0,
                                alignSelf: "flex-start"
                            }}>
                                <Stack direction="row" spacing={1}>
                                    <FooterLabelButtons notion={notion} github={github} deploy={deploy} />
                                </Stack>
                            </Box>
                        )}
                    </Box>

                    {/* 날짜 */}
                    {(project.startDate || project.endDate) && (
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                                lineHeight: 1.2,
                                fontSize: { xs: "0.75rem", sm: "0.85rem" }, // 데스크톱에서 날짜 폰트 크기 증가
                                textAlign: { xs: "center", sm: "left" } // 모바일에서만 가운데 정렬
                            }}
                        >
                            {project.startDate} {project.endDate && " ~ "}{project.endDate}
                        </Typography>
                    )}

                    {/* 설명 */}
                    <Box sx={{ 
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: { xs: "40px", sm: "auto" }, // 모바일 최소 높이 축소
                        overflow: "hidden" // 내용이 넘치지 않도록
                    }}>
                        {project.description && (
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    whiteSpace: "pre-line", 
                                    ...clamp(3),
                                    lineHeight: 1.4,
                                    fontSize: { xs: "0.875rem", sm: "0.95rem" }, // 데스크톱에서 설명 폰트 크기 증가
                                    textAlign: { xs: "center", sm: "left" } // 모바일에서만 가운데 정렬
                                }}
                            >
                                {project.description}
                            </Typography>
                        )}
                    </Box>

                    {/* 하단 영역: 기술 스택 + 모바일 링크 버튼 */}
                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "center", sm: "flex-start" },
                        justifyContent: { xs: "center", sm: "flex-start" },
                        gap: { xs: 1, sm: 0 },
                        mt: "auto" // 하단에 고정
                    }}>
                        {/* 기술 스택 */}
                        {!!stacks.length && (
                            <Box sx={{ 
                                display: "flex",
                                justifyContent: { xs: "center", sm: "flex-start" }
                            }}>
                                {isMobile ? (
                                    <StackIconsRow names={stacks} max={9} />
                                ) : (
                                    <StackButtons names={stacks} max={9} />
                                )}
                            </Box>
                        )}

                        {/* 모바일에서만 링크 버튼 표시 */}
                        {isMobile && (
                            <Box sx={{ 
                                display: "flex",
                                justifyContent: "center", // 가운데 정렬
                                alignItems: "center",
                                width: "100%",
                                gap: { xs: 0.4, sm: 1 }, // 모바일에서 간격 축소
                                flexWrap: "wrap"
                            }}>
                                <FooterLabelButtons notion={notion} github={github} deploy={deploy} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </CardShell>
    );
};

export default RectangleCard;