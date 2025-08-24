import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { deleteAchieve, fetchAchieveList, insertAchieve, updateAchieve } from "../../api/achievements";
import { insertWorkExp } from "../../api/careerApi";
import { AuthContext } from "../../context/AuthContext";
import useEditMode from "../../hooks/useEditMode";
import { Box, Button, Chip, Fab, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";
import EmptyState from "./EmptyState";
import CareerAccordion from "./CareerAccordion";
import CommonCareerModal from "../profile/career/CommonCareerModal";


const ResumeListPage = () => {
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const [careers, setCareers] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalForm, setModalForm] = useState({
        title1: "",     // companyName
        title2: "",     // position
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
            startDate: modalForm.startDate ? `${modalForm.startDate}-01` : "", // YYYY-MM -> YYYY-MM-01 (서버 포맷 맞추면 OK)
            endDate: modalForm.endDate ? `${modalForm.endDate}-01` : "",
        });
        await callAPI();
        handleClose();
    };


    // detail ops passed down
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
        <Box>
            {/* Header */}
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <NotesIcon />
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>경력 기술서</Typography>
                    <Chip label={`@${username}`} size="small" />
                </Stack>
                {editMode && (
                    <Tooltip title="경력 추가">
                        <span>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={(e) => {
                                    e.currentTarget.blur();
                                    handleOpen();
                                }}
                            >
                                추가
                            </Button>
                        </span>
                    </Tooltip>
                )}
            </Box>

            {/* Content */}
            {careers.length === 0 ? (
                <EmptyState isHost={isHost} onOpen={handleOpen} />
            ) : (
                <Stack spacing={2}>
                    {careers.map((career, idx) => (
                        <CareerAccordion
                            key={career.workId}
                            defaultExpanded={idx === 0}
                            career={career}
                            formatYM={formatYM}
                            editMode={editMode}
                            onUpdateDetail={handleUpdateDetail}
                            onCreateDetail={handleCreateDetail}
                            onDeleteDetail={handleDeleteDetail}
                        />
                    ))}
                </Stack>
            )}
            {editMode && (
                <CommonCareerModal
                    show={open}
                    onHide={handleClose}
                    form={modalForm}
                    handleChange={handleModalChange}
                    handleSubmit={handleModalSubmit}
                    isEdit={false}                 // 추가 모드
                    onDelete={undefined}           // 추가 모드는 삭제 버튼 안씀
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