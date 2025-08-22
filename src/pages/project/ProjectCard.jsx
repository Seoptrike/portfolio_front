// components/ProjectCard.jsx
import React from "react";
import {
    Card, CardContent, Box, Typography, Stack,
    Tooltip, IconButton
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotesIcon from "@mui/icons-material/Notes";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExternalLinkButton from "./ExternalLinkButton";
import StackIconList from "./StackIconList";
import CommonHeroBanner from "../../components/common/CommonHeroBanner";

const ProjectCard = React.memo(function ProjectCard({
    project,
    editMode,
    onUpdate,
    onDelete,
    isMobile,
}) {
    const stacks = Array.isArray(project.stackNames) ? project.stackNames : [];
    const notion = project.notionUrl || project.notion_url;
    const github = project.githubUrl || project.github_url;
    const deploy = project.deployUrl || project.deploy_url;

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "box-shadow .2s ease, transform .1s ease",
                "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
            }}
        >
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1.25, md: 2 },
                    }}
                >
                    {/* 왼쪽: 썸네일 */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: 300 },
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: { xs: "none", md: "1px solid" },
                            borderColor: { xs: "transparent", md: "divider" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            aspectRatio: { xs: "16 / 9", md: "1 / 1" },
                            height: { md: 300 },
                            mx: { xs: "auto", md: 0 },
                        }}
                    >
                        {project.thumbnailUrl ? (
                            <Box
                                component="img"
                                src={project.thumbnailUrl}
                                alt="thumbnail"
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <Typography variant="caption" color="text.secondary">
                                사진 없음
                            </Typography>
                        )}
                    </Box>

                    {/* 오른쪽: 타이틀/설명/기간/스택/링크 */}
                    <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                        {/* 타이틀 + 액션 */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <Box sx={{ flex: 1, textAlign: "center", wordBreak: "keep-all" }}>
                                <CommonHeroBanner title={project.title} size="compact" />
                            </Box>

                            {editMode && (
                                <Stack direction="row" spacing={0.75} flexShrink={0}>
                                    <Tooltip title="수정">
                                        <IconButton onClick={onUpdate} size="small">
                                            <EditOutlinedIcon sx={{ fontSize: 22 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton onClick={onDelete} size="small" color="error">
                                            <DeleteOutlineIcon sx={{ fontSize: 22 }} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            )}
                        </Stack>

                        {/* 설명 */}
                        {project.description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: { xs: 0.5 },
                                    whiteSpace: "pre-line",
                                    textAlign: "center", // ✅ 데스크탑도 중앙 정렬
                                }}
                            >
                                {project.description}
                            </Typography>
                        )}

                        {/* 기간 + 스택 */}
                        <Stack spacing={1.2} sx={{ mt: { xs: 0.5, md: 0 }, flexGrow: 1 }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: "center" }}
                            >
                                <strong>기간:</strong> {project.startDate} ~ {project.endDate}
                            </Typography>

                            <Box sx={{ textAlign: "center" }}>
                                <StackIconList
                                    stacks={stacks.map((s) => s.name)}
                                    dense={false}
                                    centered={isMobile}
                                />
                            </Box>
                        </Stack>

                        {/* 링크: 항상 오른쪽 하단에 고정 */}
                        {(notion || github || deploy) && (
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                {notion && (
                                    <ExternalLinkButton
                                        href={notion}
                                        icon={<NotesIcon fontSize="small" />}
                                    >
                                        Notion
                                    </ExternalLinkButton>
                                )}
                                {github && (
                                    <ExternalLinkButton
                                        href={github}
                                        icon={<GitHubIcon fontSize="small" />}
                                    >
                                        GitHub
                                    </ExternalLinkButton>
                                )}
                                {deploy && (
                                    <ExternalLinkButton
                                        href={deploy}
                                        icon={<OpenInNewIcon fontSize="small" />}
                                    >
                                        배포링크
                                    </ExternalLinkButton>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
});

export default ProjectCard;
