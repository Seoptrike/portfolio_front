import React, { useState } from "react";
import dayjs from "dayjs";
import {
    Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody,
    TableContainer, Button, Box
} from "@mui/material";
import useEditMode from "../../../hooks/useEditMode";
import useIsMobile from "../../../hooks/useIsMobile";
import CommonHeroBanner from "../../../components/common/CommonHeroBanner";
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from "../../../utils/yearModule";
import CommonCareerModal from "./CommonCareerModal";

const formatYM = (v) => (v ? dayjs(v).format("YYYY.MM") : "");

// 표 좌우 여백. 예전엔 40px 고정이라 카드가 좁아지면 셀 안쪽 폭이 한 글자만 남아
// "재직기간"이 세로로 쪼개졌다. 화면이 좁을수록 여백을 줄인다.
const EDGE_PAD = { xs: 1.5, sm: 2, md: 3 };

const CommonCareerPage = ({
    title,
    rows = [],
    idKey,
    username,
    hideTopBar = false, // 상단 컬러바 숨기기 옵션
    // 테이블 헤더 라벨
    headers = { col1: "항목1", col2: "항목2", period: "기간" },
    // 종료일이 없을 때(=진행 중) 기간 칸에 보여줄 문구
    ongoingText = "현재",
    // 행 → 셀 값 추출 방법 (도메인별 주입)
    pickCol1 = (row) => row.col1,
    pickCol2 = (row) => row.col2,
    pickStart = (row) => row.startDate,
    pickEnd = (row) => row.endDate,
    // 폼 키 매핑(모달과 통일)
    mapRowToForm = (row) => ({
        title1: row.col1 ?? "",
        title2: row.col2 ?? "",
        startDate: row.startDate ?? "",
        endDate: row.endDate ?? "",
    }),
    // 폼 → API payload 변환
    mapFormToPayload = (form, usernameArg) => ({
        username: usernameArg,
        col1: form.title1,
        col2: form.title2,
        ...formToApiDates(form) // startDate/endDate: YYYY-MM-DD
    }),
    // CRUD
    createFn = async () => { },
    updateFn = async () => { },
    deleteFn = async () => { },
    onSuccess = () => { },
    // 모달 라벨
    modalLabels = {
        title1: "항목1", title2: "항목2",
        startLabel: "시작(년-월)", endLabel: "종료(년-월)",
        editTitle: `${title} 수정`, addTitle: `${title} 추가`,
        save: "저장", update: "수정", delete: "삭제", cancel: "취소",
        guide: "기간은 월까지 입력해 주세요."
    }
}) => {
    const { editMode } = useEditMode();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        [idKey]: null,
        username,
        title1: "", title2: "",
        startDate: "", endDate: "",
    });

    const resetForm = () =>
        setForm((f) => ({
            ...f, [idKey]: null,
            title1: "", title2: "", startDate: "", endDate: ""
        }));

    const handleOpen = () => { setIsEdit(false); resetForm(); setOpen(true); };
    const handleClose = () => { setOpen(false); setIsEdit(false); resetForm(); };

    const handleEdit = (row) => {
        setIsEdit(true);
        setForm({
            [idKey]: row[idKey],
            username,
            ...mapRowToForm({
                col1: pickCol1(row),
                col2: pickCol2(row),
                startDate: pickStart(row),
                endDate: pickEnd(row),
            }),
            // YYYY-MM으로 보정 (이미 YYYY-MM이면 apiDatesToForm에서 그대로)
            ...apiDatesToForm({ startDate: pickStart(row), endDate: pickEnd(row) }),
        });
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => {
            if (name === "endDate") return { ...f, endDate: clampEndYM(f.startDate, value) };
            return { ...f, [name]: value };
        });
    };

    const handleSubmit = async () => {
        if (ymLt(form.endDate, form.startDate)) {
            alert("종료월은 시작월 이후여야 해요.");
            return;
        }
        const payload = mapFormToPayload(form, username);
        try {
            if (isEdit) {
                await updateFn({ ...payload, [idKey]: form[idKey] });

            } else {
                await createFn(payload);
            }
            onSuccess && onSuccess();
            handleClose();
        } catch (err) {
            console.error("등록/수정 실패:", err);
            alert("작업에 실패했습니다.");
        }
        console.log(payload);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제할까요?")) return;
        try {
            await deleteFn(id);
            onSuccess && onSuccess();
            handleClose();
        } catch {
            alert("삭제에 실패했습니다.");
        }
    };

    // 타이틀에 따른 아이콘 매핑
    const getIconByTitle = (title) => {
        const iconMap = {
            '학력': '🎓',
            '경력': '💼',
            '자격증': '📜',
            '수상': '🏆',
            '활동': '🌟',
            '프로젝트': '🚀',
            '기술스택': '⚡'
        };
        return iconMap[title] || '📋';
    };

    return (
        <Box>
            {/* 헤더: 가운데 배너 + 오른쪽 추가 버튼 */}
            <Box sx={{ position: "relative", my: 1 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid size="auto">
                        <CommonHeroBanner title={title} icon={getIconByTitle(title)} size="compact" />
                    </Grid>
                </Grid>
                {editMode && (
                    <Button
                        variant="outlined" size="small" onClick={handleOpen}
                        sx={{
                            position: "absolute", right: { xs: 8, sm: 0 },
                            top: { xs: 8, sm: "50%" }, transform: { sm: "translateY(-50%)" },
                            zIndex: 1,
                            border: "1px solid var(--accent-border)",
                            color: "var(--accent)",
                            background: "transparent",
                            borderRadius: 2,
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "var(--accent)",
                                backgroundColor: "var(--accent-subtle)"
                            }
                        }}
                    >
                        + 추가
                    </Button>
                )}
            </Box>

            {/* 테이블 */}
            <div style={{ padding: isMobile ? "0" : "0 20px" }}>
                <Paper elevation={0} sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--accent)",
                        opacity: 0.7,
                        display: hideTopBar ? "none" : "block"
                    }
                }}>
                <TableContainer>
                    <Table size="small" aria-label={`${title} table`}>
                        <TableHead>
                            <TableRow sx={{
                                background: "transparent",
                                "& .MuiTableCell-root": {
                                    borderBottom: "1px solid var(--border)",
                                    color: "var(--text-muted)",
                                    fontWeight: 700,
                                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                    // 헤더는 절대 줄바꿈하지 않는다 ("재직기간"이 세로로 쪼개지던 원인)
                                    whiteSpace: "nowrap"
                                }
                            }}>
                                <TableCell sx={{ width: "40%", pl: EDGE_PAD }}>{headers.col1}</TableCell>
                                <TableCell sx={{ width: "25%" }}>{headers.col2}</TableCell>
                                <TableCell sx={{ width: "35%", pr: EDGE_PAD, textAlign: "right" }}>{headers.period}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(rows) && rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow
                                        key={row[idKey] ?? pickCol1(row)}
                                        hover
                                        onClick={editMode ? () => handleEdit(row) : undefined}
                                        sx={{
                                            cursor: editMode ? "pointer" : "default",
                                            "&:hover": {
                                                backgroundColor: "var(--surface-2)",
                                                boxShadow: editMode ? "inset 2px 0 0 var(--accent)" : "none"
                                            },
                                            "& .MuiTableCell-root": {
                                                borderBottom: "1px solid var(--border)",
                                                color: "var(--text)"
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: { xs: 12, sm: 13 }, pl: EDGE_PAD, maxWidth: 0 }}
                                            title={pickCol1(row)}
                                        >
                                            {pickCol1(row)}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: { xs: 12, sm: 13 }, maxWidth: 0 }}
                                            title={pickCol2(row)}
                                        >
                                            {pickCol2(row)}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap", fontSize: { xs: 12, sm: 13 }, pr: EDGE_PAD, textAlign: "right", width: "1%" }}
                                            title={`${formatYM(pickStart(row))} ~ ${pickEnd(row) ? formatYM(pickEnd(row)) : ongoingText}`}
                                        >
                                            {formatYM(pickStart(row))} ~{" "}
                                            {pickEnd(row) ? (
                                                formatYM(pickEnd(row))
                                            ) : (
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "var(--accent)",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {ongoingText}
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary", fontSize: { xs: 12, sm: 13 }, px: 3 }}>
                                        데이터가 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </div>

            {/* 공용 모달 */}
            <CommonCareerModal
                show={open}
                onHide={handleClose}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit}
                onDelete={() => handleDelete(form[idKey])}
                labels={modalLabels}
            />
        </Box>
    );
};

export default CommonCareerPage