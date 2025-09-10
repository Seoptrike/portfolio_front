// src/components/yourpath/AddDetailForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "./ToastUIEditor.css"

const AddDetailForm = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({ title: "", content: "" });
    const editorElRef = useRef(null);
    const editorRef = useRef(null);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    useEffect(() => {
        if (!editorElRef.current) return;

        editorRef.current = new Editor({
            el: editorElRef.current,
            initialEditType: "markdown", // "wysiwyg"도 가능
            previewStyle: "vertical",
            height: "300px",
            initialValue: form.content || "",
            usageStatistics: false,
            toolbarItems: [
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["table", "link"],
                ["code", "codeblock"],
            ],
        });

        // 내용 변경 시 form.content 동기화
        editorRef.current.on("change", () => {
            const md = editorRef.current.getMarkdown();
            setForm((f) => ({ ...f, content: md }));
        });

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAdd = async () => {
        // 최신 내용 보장
        const md = editorRef.current?.getMarkdown() ?? form.content;
        await onSubmit({ title: form.title, content: md });
        setForm({ title: "", content: "" });
        editorRef.current?.setMarkdown("");
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                상세 내용 추가
            </Typography>
            <Stack spacing={1.5}>
                <TextField
                    name="title"
                    label="제목"
                    value={form.title}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                />

                {/* Markdown Editor */}
                <Box
                    sx={{
                        border: (t) => `1px solid ${t.palette.divider}`,
                        borderRadius: 1,
                        overflow: "hidden",
                    }}
                >
                    <div ref={editorElRef} />
                </Box>

                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Button onClick={onCancel} startIcon={<CloseIcon />}>
                        취소
                    </Button>
                    <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>
                        추가
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default AddDetailForm;
