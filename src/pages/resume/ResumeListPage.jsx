// src/pages/resume/ResumeListPage.jsx
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { deleteAchieve, fetchAchieveList, insertAchieve, updateAchieve } from "../../api/achievements";
import { insertWorkExp } from "../../api/careerApi";

import { AuthContext } from "../../context/AuthContext";
import useEditMode from "../../hooks/useEditMode";

// MUI
import { Box, Fab, Fade, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";

// Local
import EmptyState from "./EmptyState";
import CareerAccordion from "./CareerAccordion";
import CommonCareerModal from "../profile/career/CommonCareerModal";
import HeroHeader from "../../components/common/HeroHeader";

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
                "--cardRadius": "16px",
                "--ring": "0 1px 0 rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.06)",
            }}
        >
            {/* Hero Header (공용) */}
            <HeroHeader
                title="경력 기술서"
                icon={<NotesIcon sx={{ fontSize: 18, color: (t) => t.palette.primary.contrastText }} />}
                showChip
                chipLabel={`@${username}`}
                editMode={editMode}
                onPrimaryAction={handleOpen}
                primaryActionLabel="추가"
                primaryActionIcon={<AddIcon />}
                sx={{ mb: 2.5 }}
            />

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
                                p: { xs: 0.25, sm: 0.5 },
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
