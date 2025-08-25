import React, { useEffect, useMemo, useState, useContext } from "react";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useImageKitUpload from "../../hooks/useImageKitUpload.js";
import { AuthContext } from "../../context/AuthContext";
import { getAllStack } from "../../api/techStackApi";
import { insertProject, updateProject, getProjectById, deleteProject } from "../../api/projectApi";
import StackCheckboxGroup from "./StackCheckBoxGroup.jsx";
import useEditMode from "../../hooks/useEditMode.js";
import DateInput from "./DateInput.jsx";
import ThumbnailUploader from "./ThumbnailUploader.jsx";

const toDateInput = (v) => (v ? String(v).slice(0, 10) : "");

const ProjectUpsertPage = () => {
    const { username, projectId } = useParams();
    const { loginId } = useContext(AuthContext);
    const isEdit = useMemo(() => Boolean(projectId), [projectId]);
    const navigate = useNavigate();
    const { setEditMode } = useEditMode();
    const [stackList, setStackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const { uploadImage, busy: uploading, progress } = useImageKitUpload();

    const [form, setForm] = useState({
        username,
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        githubUrl: "",
        deployUrl: "",
        notionUrl: "",
        thumbnailUrl: "",
        stackIds: [],
    });

    useEffect(() => {
        (async () => {
            try {
                const stacksP = getAllStack("");
                if (isEdit) {
                    const [stacksRes, projectRes] = await Promise.all([stacksP, getProjectById(projectId)]);
                    setStackList(stacksRes.data ?? []);
                    const p = projectRes.data;
                    setForm((prev) => ({
                        ...prev,
                        username,
                        title: p.title ?? "",
                        description: p.description ?? "",
                        startDate: toDateInput(p.startDate),
                        endDate: toDateInput(p.endDate),
                        githubUrl: p.githubUrl ?? "",
                        deployUrl: p.deployUrl ?? "",
                        notionUrl: p.notionUrl ?? "",
                        thumbnailUrl: p.thumbnailUrl ?? "",
                        stackIds: Array.isArray(p.stackNames) ? p.stackNames.map((s) => s.stackId) : [],
                    }));
                } else {
                    const stacksRes = await stacksP;
                    setStackList(stacksRes.data ?? []);
                    setForm((f) => ({ ...f, username }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
                setEditMode(false);
            }
        })();
    }, [isEdit, projectId, username, navigate, setEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleStackChange = (id) => {
        setForm((prev) => ({
            ...prev,
            stackIds: prev.stackIds.includes(id)
                ? prev.stackIds.filter((sid) => sid !== id)
                : [...prev.stackIds, id],
        }));
    };

    const handleDelete = async () => {
        if (!projectId) return;
        if (!window.confirm("정말 이 프로젝트를 삭제하시겠습니까?")) return;

        setSaving(true);
        try {
            await deleteProject(projectId);
            alert("프로젝트가 삭제되었습니다.");
            navigate(`/${username}/project`);
        } catch (e) {
            console.error(e);
            alert("삭제 실패");
        } finally {
            setSaving(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
            alert("종료일은 시작일 이후여야 합니다.");
            return;
        }
        setSaving(true);
        try {
            let thumbnailUrl = form.thumbnailUrl || null;
            let thumbnailFileId = form.thumbnailFileId || null;

            if (imageFile) {
                const uploaded = await uploadImage(imageFile, { userId: loginId, folder: "project" });
                thumbnailUrl = uploaded?.url ?? null;
                thumbnailFileId = uploaded?.fileId ?? null;
            }

            const payload = { ...form, username, thumbnailUrl, thumbnailFileId };
            if (isEdit) await updateProject(projectId, payload);
            else await insertProject(payload);

            alert(isEdit ? "프로젝트 수정 완료!" : "프로젝트 등록 완료!");
            navigate(`/${username}/project`);
        } catch (e) {
            console.error(e);
            alert("저장 실패");
        } finally {
            setSaving(false);
            setEditMode(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 돌아감
        // 또는 navigate(`/${username}/project`) 로 특정 경로로 이동도 가능
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress /> 불러오는 중…
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1024, mx: "auto", px: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                {isEdit ? "프로젝트 수정" : "프로젝트 등록"}
            </Typography>

            <Stack spacing={2}>
                <TextField label="제목" name="title" value={form.title} onChange={handleChange} required fullWidth />
                <TextField label="설명" name="description" value={form.description} onChange={handleChange} multiline rows={3} />

                <Grid
                    container
                    spacing={2}
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr 1fr', sm: '1fr 1fr', md: '1fr 1fr' }}
                >
                    <Grid sx={{ gridColumn: 'span 1' }}>
                        <DateInput
                            label="시작일"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid sx={{ gridColumn: 'span 1' }}>
                        <DateInput
                            label="종료일"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <TextField label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} fullWidth />
                <TextField label="배포 URL" name="deployUrl" value={form.deployUrl} onChange={handleChange} fullWidth />
                <TextField label="Notion URL" name="notionUrl" value={form.notionUrl} onChange={handleChange} fullWidth />

                <ThumbnailUploader
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    form={form}
                    uploading={uploading}
                    progress={progress}
                />

                <Box>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <StackCheckboxGroup
                            stacks={stackList}
                            selectedIds={form.stackIds}
                            onChange={handleStackChange}
                        />
                    </FormControl>
                </Box>
                {/* 버튼 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2 },
                        mt: 3,
                        // 모바일: 한 줄 고정 / 데스크탑: 필요시 줄바꿈 허용
                        flexWrap: { xs: "nowrap", sm: "wrap" },
                        alignItems: "stretch",
                        justifyContent: { xs: "space-between", sm: "center" },
                    }}
                >
                    <Button
                        variant="outlined"
                        type="submit"
                        disabled={saving || uploading}
                        sx={{
                            // ✅ 모바일에서 3등분 + 작게
                            flex: { xs: "1 1 0", sm: "0 0 auto" },
                            minWidth: { xs: 0, sm: 120 },
                            height: { xs: 40, sm: 48 },
                            px: { xs: 1, sm: 2 },
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            whiteSpace: "nowrap",
                            borderColor: "#343a40",
                            color: "#343a40",
                            "&:hover": {
                                backgroundColor: "#343a40",
                                color: "#fff",
                            },
                        }}
                    >
                        {saving || uploading ? "저장 중…" : isEdit ? "수정" : "등록"}
                    </Button>

                    {isEdit && (
                        <Button
                            variant="outlined"
                            onClick={handleDelete}
                            disabled={saving || uploading}
                            color="error"
                            sx={{
                                flex: { xs: "1 1 0", sm: "0 0 auto" },
                                minWidth: { xs: 0, sm: 120 },
                                height: { xs: 40, sm: 48 },
                                px: { xs: 1, sm: 2 },
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                whiteSpace: "nowrap",
                            }}
                        >
                            삭제
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={saving || uploading}
                        color="inherit"
                        sx={{
                            flex: { xs: "1 1 0", sm: "0 0 auto" },
                            minWidth: { xs: 0, sm: 120 },
                            height: { xs: 40, sm: 48 },
                            px: { xs: 1, sm: 2 },
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            whiteSpace: "nowrap",
                        }}
                    >
                        취소
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProjectUpsertPage;
