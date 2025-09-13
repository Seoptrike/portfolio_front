// src/pages/resume/ResumeListPage.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import {
    deleteAchieve,
    fetchAchieveList,
    insertAchieve,
    updateAchieve,
} from "../../api/achievements";
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
import HeaderSection from "../../components/common/HeaderSection";
import useIsMobile from "../../hooks/useIsMobile";

const normalizeCareer = (w) => ({
    ...w,
    details: Array.isArray(w?.details) ? w.details : [],
    rev: w?.rev ?? 0,
});

const ResumeListPage = () => {
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const isMobile = useIsMobile();

    const [careers, setCareers] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalForm, setModalForm] = useState({
        title1: "", // companyName
        title2: "", // position
        startDate: "",
        endDate: "",
    });

    const formatYM = (v) => (v ? dayjs(v).format("YYYY.MM") : "");

    // 응답 경합 방지용 요청 ID
    const lastReqIdRef = useRef(0);

    const callAPI = async () => {
        try {
            const reqId = ++lastReqIdRef.current;

            // 캐시 무력화 쿼리스트링
            const res = await fetchAchieveList(`${username}?ts=${Date.now()}`);
            if (reqId !== lastReqIdRef.current) return; // 늦게 온 응답 무시

            const data = res?.data ?? [];
            setCareers(data.map(normalizeCareer));
            console.log("API data:", data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        callAPI();
        // username 변경 시 이전 요청들 자연 무시됨 (reqId로 가드)
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

    // 경력(회사) 추가
    const handleModalSubmit = async () => {
        const saved = await insertWorkExp({
            username,
            companyName: modalForm.title1,
            position: modalForm.title2,
            startDate: modalForm.startDate ? `${modalForm.startDate}-01` : "",
            endDate: modalForm.endDate ? `${modalForm.endDate}-01` : "",
        });

        const w = normalizeCareer(saved?.data ?? saved);
        setCareers((prev) => [w, ...prev]);
        handleClose();

        // 백엔드 최종 상태와 싱크 맞추고 싶으면 ↓ 주석 해제
        await callAPI();
    };

    // rev 유틸
    const bump = (c) => ({ ...c, rev: (c.rev ?? 0) + 1 });

    // 상세 생성
    const handleCreateDetail = async ({ workId, title, content }) => {
        const saved = await insertAchieve({ workId, title, content });
        const newDetail = saved?.data ?? saved;

        setCareers((prev) =>
            prev.map((c) =>
                c.workId === workId
                    ? bump({ ...c, details: [...(c.details ?? []), newDetail] })
                    : c
            )
        );

        await callAPI();
    };

    // 상세 수정
    const handleUpdateDetail = async ({ detailId, title, content }) => {
        const saved = await updateAchieve({ detailId, title, content });
        const updated = saved?.data ?? saved; // { detailId, title, content, ... }

        setCareers((prev) =>
            prev.map((c) =>
                c.details?.some((d) => d.detailId === detailId)
                    ? bump({
                        ...c,
                        details: (c.details ?? []).map((d) =>
                            d.detailId === detailId ? { ...d, ...updated } : d
                        ),
                    })
                    : c
            )
        );

        await callAPI();
    };

    // 상세 삭제
    const handleDeleteDetail = async (detailId) => {
        await deleteAchieve(detailId);

        setCareers((prev) =>
            prev.map((c) =>
                c.details?.some((d) => d.detailId === detailId)
                    ? bump({
                        ...c,
                        details: (c.details ?? []).filter((d) => d.detailId !== detailId),
                    })
                    : c
            )
        );

        await callAPI();
    };

    return (
        <Box
            sx={{
                "--cardRadius": "16px",
                "--ring": "0 1px 0 rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.06)",
            }}
        >
            {/* Header Section (모바일에서만 표시) */}
            {isMobile && (
                <HeaderSection
                    title="경력 기술서"
                    editMode={editMode}
                    username={username}
                    onPrimaryAction={handleOpen}
                />
            )}

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
                            key={`${career.workId}-${career.rev ?? 0}`} // ← rev로 확실히 리마운트
                            elevation={0}
                            sx={{
                                borderRadius: "var(--cardRadius)",
                                border: "1px solid",
                                borderColor: "divider",
                                p: { xs: 0.25, sm: 0.5 },
                                boxShadow: "var(--ring)",
                                "&:hover": {
                                    boxShadow:
                                        "0 1px 0 rgba(0,0,0,0.04), 0 10px 32px rgba(0,0,0,0.08)",
                                },
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
