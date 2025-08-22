// components/ProjectCard.jsx
import React from "react";
import {
  Card, CardContent, Box, Typography, Stack,
  Tooltip, IconButton, Button
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotesIcon from "@mui/icons-material/Notes";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExternalLinkButton from "./ExternalLinkButton";
import ProjectStackList from "./ProjectStackList";

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

  const [expanded, setExpanded] = React.useState(false);

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
      <CardContent sx={{ p: { xs: 1.5, md: 2 }, pb: { xs: 1.5, md: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-start" },
            gap: { xs: 1.25, md: 2 },
          }}
        >
          {/* 썸네일 */}
          <Box
            sx={{
              width: { xs: "100%", md: 300 },
              aspectRatio: { xs: "16 / 9", md: "1 / 1" },
              height: { md: 300 },
              flexShrink: 0,
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: { xs: "none", md: "1px solid" },
              borderColor: { xs: "transparent", md: "divider" },
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

          {/* 설명 영역 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* 타이틀 + 액션 */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ mb: { xs: 0.75, md: 1 } }}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                fontWeight={700}
                sx={{
                  wordBreak: "keep-all",
                  textAlign: { xs: "center", md: "left" },
                  flex: 1,
                }}
              >
                {project.title}
              </Typography>

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
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: { xs: 0.5, md: 1 },
                    whiteSpace: "pre-line",
                    ...(isMobile && !expanded
                      ? {
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }
                      : null),
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {project.description}
                </Typography>
                {isMobile && (
                  <Box sx={{ textAlign: "center", mb: 1 }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => setExpanded((v) => !v)}
                    >
                      {expanded ? "접기" : "더보기"}
                    </Button>
                  </Box>
                )}
              </>
            )}

            <Stack spacing={1.2} sx={{ mt: { xs: 0.5, md: 0 } }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                <strong>기간:</strong> {project.startDate} ~ {project.endDate}
              </Typography>

              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <ProjectStackList stacks={stacks} />
              </Box>

              {(notion || github || deploy) && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 0.5,
                    flexWrap: "wrap",      // ✅ 모바일에서 줄바꿈 허용
                    overflowX: "visible",  // ✅ 가로 스크롤 대신 줄바꿈
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
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
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

export default ProjectCard;
