import React, { useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { clampEndYM } from "../../utils/yearModule"; // NOTE: adjust relative path if needed


const CareerModal = ({ open, onClose, onSubmit }) => {
    const [form, setForm] = useState({ companyName: "", position: "", startDate: "", endDate: "" });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => (name === "endDate" ? { ...f, endDate: clampEndYM(f.startDate, value) } : { ...f, [name]: value }));
    };


    const handleSave = async () => {
        await onSubmit(form);
        setForm({ companyName: "", position: "", startDate: "", endDate: "" });
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>경력 추가</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="회사" name="companyName" value={form.companyName} onChange={handleChange} fullWidth size="small" />
                    <TextField label="직무" name="position" value={form.position} onChange={handleChange} fullWidth size="small" />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="입사(YYYY.MM)" name="startDate" placeholder="2023.07" value={form.startDate} onChange={handleChange} fullWidth size="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="퇴사(YYYY.MM)" name="endDate" placeholder="2024.08" value={form.endDate} onChange={handleChange} fullWidth size="small" />
                        </Grid>
                    </Grid>
                    <Alert severity="info">재직 기간은 월까지 입력해 주세요.</Alert>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<CloseIcon />}>취소</Button>
                <Button variant="contained" onClick={handleSave} startIcon={<SaveOutlinedIcon />}>저장</Button>
            </DialogActions>
        </Dialog>
    );
};


export default CareerModal;