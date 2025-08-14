import React from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Stack, TextField, Button, Typography
} from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile";

// MUI DatePicker (데스크탑)
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import dayjs from "dayjs";
dayjs.locale("ko");
import { koKR as datePickerKoKR } from "@mui/x-date-pickers/locales";


const CommonCareerModal = ({
    show, onHide,
    form, handleChange, handleSubmit,
    isEdit, onDelete,
    // 필드 라벨 주입
    labels = {
        title1: "항목1",      // 예: 학교 / 회사
        title2: "항목2",      // 예: 전공 / 직무
        startLabel: "시작(년-월)",
        endLabel: "종료(년-월)",
        editTitle: "수정",
        addTitle: "추가",
        save: "저장",
        update: "수정",
        delete: "삭제",
        cancel: "취소",
        guide: "기간은 월까지 입력해 주세요."
    }
}) => {
    const isMobile = useIsMobile();
    const invalidRange =
        Boolean(form?.startDate && form?.endDate) && form.endDate < form.startDate;

    const onChangeMonth = (name) => (value) => {
        const v = value ? value.format("YYYY-MM") : "";
        handleChange({ target: { name, value: v } });
    };

    return (
        <Dialog open={show} onClose={onHide} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700 }}>
                {isEdit ? labels.editTitle : labels.addTitle}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>
                    <TextField
                        label={labels.title1}
                        name="title1"                 // 공용 키(페이지에서 매핑)
                        value={form.title1 ?? ""}
                        onChange={handleChange}
                        fullWidth size="small" inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        label={labels.title2}
                        name="title2"
                        value={form.title2 ?? ""}
                        onChange={handleChange}
                        fullWidth size="small" inputProps={{ maxLength: 100 }}
                    />

                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {labels.guide}
                    </Typography>

                    {isMobile ? (
                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                            <TextField
                                label={labels.startLabel}
                                name="startDate" type="month"
                                value={form.startDate || ""}
                                onChange={handleChange}
                                fullWidth size="small" InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label={labels.endLabel}
                                name="endDate" type="month"
                                value={form.endDate || ""}
                                onChange={handleChange}
                                fullWidth size="small" InputLabelProps={{ shrink: true }}
                                error={invalidRange}
                                helperText={invalidRange ? "종료월은 시작월 이후여야 해요" : ""}
                            />
                        </Stack>
                    ) : (
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="ko"
                            localeText={datePickerKoKR.components.MuiLocalizationProvider.defaultProps.localeText}
                        >
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                sx={{ flexWrap: { sm: "nowrap" }, "& > *": { flex: 1, minWidth: 0 } }}
                            >
                                <DatePicker
                                    label={labels.startLabel}
                                    views={["year", "month"]}
                                    value={form.startDate ? dayjs(form.startDate) : null}
                                    onChange={onChangeMonth("startDate")}
                                    maxDate={form.endDate ? dayjs(form.endDate) : undefined}
                                    sx={{ flex: 1 }}
                                    slotProps={{ textField: { size: "small" } }}
                                />
                                <DatePicker
                                    label={labels.endLabel}
                                    views={["year", "month"]}
                                    value={form.endDate ? dayjs(form.endDate) : null}
                                    onChange={onChangeMonth("endDate")}
                                    minDate={form.startDate ? dayjs(form.startDate) : undefined}
                                    sx={{ flex: 1 }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: invalidRange,
                                            helperText: invalidRange ? "종료월은 시작월 이후여야 해요" : "",
                                        },
                                    }}
                                />
                            </Stack>
                        </LocalizationProvider>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: "space-between" }}>
                {isEdit ? (
                    <Button color="error" onClick={onDelete}>{labels.delete}</Button>
                ) : <span />}
                <div>
                    <Button onClick={onHide} variant="text" sx={{ mr: 1 }}>{labels.cancel}</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEdit ? labels.update : labels.save}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};


export default CommonCareerModal