import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { deleteProject, getUserProject } from "../../api/projectApi";
import useEditMode from "../../hooks/useEditMode";
import { AuthContext } from "../../context/AuthContext";

// --- MUI ---
import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderSection from "./HeaderSection";
import ProjectCard from "./projectcard/ProjectCard";
import RectangleCard from "./projectcard/RectangleCard";
import useIsMobile from "../../hooks/useIsMobile";

// =====================
// Page (Container + Data)
// =====================
const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const { editMode } = useEditMode();
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    // --- 프로젝트 데이터 가져오기 ---
    const fetchProjects = useCallback(async () => {
        try {
            const res = await getUserProject(username);
            setProjects(res?.data ?? []);
        } catch (err) {
            navigate("/notfound");
        }
    }, [username, navigate]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // --- 수정/삭제 핸들러 ---
    const makeUpdate = useCallback(
        (projectId) => () => navigate(`/${username}/project/update/${projectId}`),
        [navigate, username]
    );

    const makeDelete = useCallback(
        (projectId) => async () => {
            if (!window.confirm("정말 삭제할까요?")) return;
            try {
                await deleteProject(projectId);
                await fetchProjects();
                alert("삭제 완료!");
            } catch (e) {
                console.error(e);
                alert("삭제 실패");
            }
        },
        [fetchProjects]
    );

    const hasProjects = (projects?.length ?? 0) > 0;

    const header = React.useMemo(
        () => <HeaderSection editMode={editMode} username={username} />,
        [editMode, username]
    );

    return (
        <Box>
            {header}

            {hasProjects ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {projects.map((project) => {
                        // 기존 ProjectCard에서 사용하는 props 구조 맞춤
                        const stacks = Array.isArray(project.stackNames)
                            ? project.stackNames.map((s) => (typeof s === "string" ? s : s?.name))
                            : [];

                        const links = {
                            notion: project.notionUrl || project.notion_url,
                            github: project.githubUrl || project.github_url,
                            deploy: project.deployUrl || project.deploy_url,
                        };

                        return (
                            <RectangleCard
                                key={project.projectId}
                                project={project}
                                stacks={stacks}
                                editMode={editMode}
                                onUpdate={makeUpdate(project.projectId)}
                                links={links}
                            />
                        );
                    })}
                </Box>
            ) : (
                // --- 프로젝트가 없는 경우 ---
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 3,
                        textAlign: "center",
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="h3" sx={{ fontSize: { xs: 48, md: 64 } }}>
                        🗂️
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
                        아직 등록된 프로젝트가 없습니다.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        첫 프로젝트를 추가하고 포트폴리오를 완성해보세요.
                    </Typography>

                    {isHost && (
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            component={RouterLink}
                            to={`/${username}/project/insert`}
                            sx={{ mt: 3, borderRadius: 2 }}
                        >
                            첫 프로젝트 등록하기
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default ProjectListPage;
