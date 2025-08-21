import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import {
    Container, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody,
    TableContainer, Button, Box
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import useEditMode from "../../../hooks/useEditMode";
import useIsMobile from "../../../hooks/useIsMobile";
import CommonHeroBanner from "../../../components/common/CommonHeroBanner";
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from "../../../utils/yearModule";
import CommonCareerModal from "./CommonCareerModal";

const formatYM = (v) => (v ? dayjs(v).format("YYYY.MM") : "");

const CommonCareerPage = ({
    title,
    rows = [],
    idKey,
    username,
    // 테이블 헤더 라벨
    headers = { col1: "항목1", col2: "항목2", period: "기간" },
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
    createFn = async (_payload) => { },
    updateFn = async (_payloadWithId) => { },
    deleteFn = async (_id) => { },
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
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const { isMobile } = useIsMobile();

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
        } catch (e) {
            alert("삭제에 실패했습니다.");
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* 헤더: 가운데 배너 + 오른쪽 추가 버튼 */}
            <Box sx={{ position: "relative", mb: 2 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid size="auto">
                        <CommonHeroBanner title={title} size="compact" />
                    </Grid>
                </Grid>
                {editMode && (
                    <Button
                        variant="outlined" size="small" onClick={handleOpen}
                        sx={{
                            position: "absolute", right: { xs: 8, sm: 0 },
                            top: { xs: 8, sm: "50%" }, transform: { sm: "translateY(-50%)" },
                            zIndex: 1
                        }}
                    >
                        + 추가
                    </Button>
                )}
            </Box>

            {/* 테이블 */}
            <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: 1, borderColor: "divider" }}>
                <TableContainer>
                    <Table size="small" aria-label={`${title} table`}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "38%", fontWeight: 600 }}>{headers.col1}</TableCell>
                                <TableCell sx={{ width: "38%", fontWeight: 600 }}>{headers.col2}</TableCell>
                                <TableCell sx={{ width: "24%", fontWeight: 600 }}>{headers.period}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(rows) && rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow
                                        key={row[idKey] ?? pickCol1(row)}
                                        hover
                                        onClick={editMode ? () => handleEdit(row) : undefined}
                                        sx={{ cursor: editMode ? "pointer" : "default" }}
                                    >
                                        <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: { xs: 12, sm: 13 } }}
                                            title={pickCol1(row)}
                                        >
                                            {pickCol1(row)}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: { xs: 12, sm: 13 } }}
                                            title={pickCol2(row)}
                                        >
                                            {pickCol2(row)}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: { xs: 12, sm: 13 } }}
                                            title={`${formatYM(pickStart(row))} ~ ${pickEnd(row) ? formatYM(pickEnd(row)) : "현재"}`}
                                        >
                                            {formatYM(pickStart(row))} ~ {pickEnd(row) ? formatYM(pickEnd(row)) : "현재"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary", fontSize: { xs: 12, sm: 13 } }}>
                                        데이터가 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

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