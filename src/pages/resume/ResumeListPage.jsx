// src/pages/resume/ResumeListPage.jsx
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { deleteAchieve, fetchAchieveList, insertAchieve, updateAchieve } from "../../api/achievements";
import { insertWorkExp } from "../../api/careerApi";
import { AuthContext } from "../../context/AuthContext";
import useEditMode from "../../hooks/useEditMode";
import {
    Box,
    Button,
    Chip,
    Fab,
    Fade,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import EmptyState from "./EmptyState";
import CareerAccordion from "./CareerAccordion";
import CommonCareerModal from "../profile/career/CommonCareerModal";

const TOSS_BLUE = "#212529";

const ResumeListPage = () => {
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();

    const [careers, setCareers] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalForm, setModalForm] = useState({
        title1: "", // companyName
        title2: "", // position
        startDate: "",
        endDate: "",
    });

    const formatYM = (v) => (v ? dayjs(v).format("YYYY.MM") : "");

    const callAPI = async () => {
        try {
            const res = await fetchAchieveList(username);
            setCareers(res.data ?? []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        callAPI();
    }, [username]);

    const handleOpen = () => {
        setModalForm({ title1: "", title2: "", startDate: "", endDate: "" });
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalForm((f) => ({ ...f, [name]: value }));
    };

    const handleModalSubmit = async () => {
        await insertWorkExp({
            username,
            companyName: modalForm.title1,
            position: modalForm.title2,
            startDate: modalForm.startDate ? `${modalForm.startDate}-01` : "",
            endDate: modalForm.endDate ? `${modalForm.endDate}-01` : "",
        });
        await callAPI();
        handleClose();
    };

    // detail ops
    const handleUpdateDetail = async ({ detailId, title, content }) => {
        await updateAchieve({ detailId, title, content });
        await callAPI();
    };
    const handleCreateDetail = async ({ workId, title, content }) => {
        await insertAchieve({ workId, title, content });
        await callAPI();
    };
    const handleDeleteDetail = async (detailId) => {
        await deleteAchieve(detailId);
        await callAPI();
    };

    return (
        <Box
            sx={{
                // Toss-ish 여백/톤
                "--cardRadius": "16px",
                "--ring": "0 1px 0 rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.06)",
            }}
        >
            {/* Hero Header */}
            <Paper
                elevation={0}
                sx={{
                    mb: 2.5,
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: "var(--cardRadius)",
                    border: "1px solid",
                    borderColor: "divider",
                    background: `linear-gradient(180deg, rgba(49,130,246,0.08) 0%, rgba(49,130,246,0.00) 60%)`,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ minHeight: 56 }}
                >
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
                        <Box
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                backgroundColor: TOSS_BLUE,
                                display: "grid",
                                placeItems: "center",
                                boxShadow: "0 6px 16px rgba(49,130,246,0.35)",
                            }}
                        >
                            <NotesIcon sx={{ fontSize: 18, color: "#fff" }} />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: "-0.015em",
                                lineHeight: 1.15,
                            }}
                        >
                            경력 기술서
                        </Typography>
                        <Chip
                            label={`@${username}`}
                            size="small"
                            sx={{
                                fontWeight: 600,
                                color: TOSS_BLUE,
                                borderColor: "transparent",
                                backgroundColor: "rgba(49,130,246,0.10)",
                            }}
                        />
                    </Stack>

                    {editMode && (
                        <Tooltip title="경력 추가">
                            <span>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    startIcon={<AddIcon />}
                                    onClick={(e) => {
                                        e.currentTarget.blur();
                                        handleOpen();
                                    }}
                                    sx={{
                                        borderRadius: 999,
                                        px: 2,
                                        backgroundColor: TOSS_BLUE,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        letterSpacing: "-0.01em",
                                        "&:hover": { backgroundColor: "#2478f5" },
                                    }}
                                >
                                    추가
                                </Button>
                            </span>
                        </Tooltip>
                    )}
                </Stack>
            </Paper>

            {/* Content Card List */}
            {careers.length === 0 ? (
                <Fade in>
                    <Box>
                        <EmptyState isHost={isHost} onOpen={handleOpen} />
                    </Box>
                </Fade>
            ) : (
                <Stack spacing={1.25}>
                    {careers.map((career, idx) => (
                        <Paper
                            key={career.workId}
                            elevation={0}
                            sx={{
                                borderRadius: "var(--cardRadius)",
                                border: "1px solid",
                                borderColor: "divider",
                                p: { xs: 0.25, sm: 0.5 }, // 아코디언 외곽 얇은 여백
                                boxShadow: "var(--ring)",
                                "&:hover": { boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 10px 32px rgba(0,0,0,0.08)" },
                                transition: "box-shadow .2s ease",
                            }}
                        >
                            <CareerAccordion
                                defaultExpanded={idx === 0}
                                career={career}
                                formatYM={formatYM}
                                editMode={editMode}
                                onUpdateDetail={handleUpdateDetail}
                                onCreateDetail={handleCreateDetail}
                                onDeleteDetail={handleDeleteDetail}
                            />
                        </Paper>
                    ))}
                </Stack>
            )}

            {/* Mobile FAB */}
            {editMode && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        handleOpen();
                    }}
                    sx={{
                        position: "fixed",
                        right: 16,
                        bottom: 16,
                        display: { xs: "inline-flex", md: "none" },
                        backgroundColor: TOSS_BLUE,
                        "&:hover": { backgroundColor: "#2478f5" },
                    }}
                >
                    <AddIcon />
                </Fab>
            )}

            {/* Modal */}
            {editMode && (
                <CommonCareerModal
                    show={open}
                    onHide={handleClose}
                    form={modalForm}
                    handleChange={handleModalChange}
                    handleSubmit={handleModalSubmit}
                    isEdit={false}
                    labels={{
                        title1: "회사",
                        title2: "직책",
                        startLabel: "입사(년-월)",
                        endLabel: "퇴사(년-월)",
                        addTitle: "경력 추가",
                        save: "저장",
                        cancel: "취소",
                        guide: "기간은 월까지 입력해 주세요.",
                    }}
                />
            )}
        </Box>
    );
};

export default ResumeListPage;
