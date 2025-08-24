import React, { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


const AddDetailForm = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({ title: "", content: "" });
    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));


    const handleAdd = async () => {
        await onSubmit(form);
        setForm({ title: "", content: "" });
    };


    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>상세 내용 추가</Typography>
            <Stack spacing={1.5}>
                <TextField name="title" label="제목" value={form.title} onChange={handleChange} size="small" fullWidth />
                <TextField name="content" label="상세 내용" value={form.content} onChange={handleChange} size="small" fullWidth multiline minRows={3} />
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Button onClick={onCancel} startIcon={<CloseIcon />}>취소</Button>
                    <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>추가</Button>
                </Stack>
            </Stack>
        </Paper>
    );
};


export default AddDetailForm;