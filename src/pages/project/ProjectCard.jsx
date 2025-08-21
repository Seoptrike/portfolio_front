// components/ProjectCard.jsx (MUI v2 기준 수정)
import {
    Card, CardContent, Box, Typography, Stack,
    Tooltip, IconButton
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotesIcon from "@mui/icons-material/Notes";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";
import ExternalLinkButton from "./ExternalLinkButton";
import ProjectStackList from "./ProjectStackList";

const ProjectCard = React.memo(function ProjectCard({ project, editMode, onUpdate, onDelete, isMobile }) {
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
                '&:hover': { boxShadow: 6, transform: "translateY(-2px)" },
            }}
        >
            <CardContent sx={{ pb: 1.5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    {/* 썸네일 */}
                    <Box
                        sx={{
                            width: isMobile ? 250 : 300,
                            height: isMobile ? 150 : 300,
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: isMobile ? "none" : "1px solid",
                            borderColor: isMobile ? "transparent" : "divider",
                        }}
                    >
                        {project.thumbnailUrl ? (
                            <Box
                                component="img"
                                src={project.thumbnailUrl}
                                alt="thumbnail"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <div>사진 없음</div>
                        )}
                    </Box>

                    {/* 설명 */}
                    <Box sx={{ flex: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 1 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ wordBreak: 'keep-all' }}>
                                {project.title}
                            </Typography>

                            {editMode && (
                                <Stack direction="row" spacing={0.5} flexShrink={0}>
                                    <Tooltip title="수정">
                                        <IconButton size="small" onClick={onUpdate} aria-label="프로젝트 수정">
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton size="small" color="error" onClick={onDelete} aria-label="프로젝트 삭제">
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            )}
                        </Stack>

                        {project.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'pre-line' }}>
                                {project.description}
                            </Typography>
                        )}

                        <Stack spacing={1.2}>
                            <Typography variant="caption" color="text.secondary">
                                <strong>기간:</strong> {project.startDate} ~ {project.endDate}
                            </Typography>

                            <Box>
                                <ProjectStackList stacks={stacks} />
                            </Box>

                            {(notion || github || deploy) && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        mt: 0.5,
                                        flexWrap: 'nowrap',        // 줄바꿈 방지
                                        overflowX: 'auto',         // 넘칠 경우 스크롤
                                        alignItems: 'center',
                                    }}
                                >
                                    {notion && (
                                        <ExternalLinkButton href={notion} icon={<NotesIcon fontSize="small" />}>
                                            Notion
                                        </ExternalLinkButton>
                                    )}
                                    {github && (
                                        <ExternalLinkButton href={github} icon={<GitHubIcon fontSize="small" />}>
                                            GitHub
                                        </ExternalLinkButton>
                                    )}
                                    {deploy && (
                                        <ExternalLinkButton href={deploy} icon={<OpenInNewIcon fontSize="small" />}>
                                            배포링크
                                        </ExternalLinkButton>
                                    )}
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
});

export default ProjectCard;
