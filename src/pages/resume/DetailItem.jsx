// src/pages/resume/DetailItem.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailItem = ({ detail, editMode, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        title: detail.title || "",
        content: detail.content || "",
    });

    // 보기 전용 Viewer
    const displayElRef = useRef(null);
    const displayViewerRef = useRef(null);
    // 편집 미리보기 Viewer
    const previewElRef = useRef(null);
    const previewViewerRef = useRef(null);

    // 부모 데이터 변경 시 폼 동기화 (+ 보기 모드면 바로 반영)
    useEffect(() => {
        setForm({ title: detail.title || "", content: detail.content || "" });
        if (!isEditing) displayViewerRef.current?.setMarkdown(detail.content || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail.detailId, detail.title, detail.content]);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        await onUpdate({ detailId: detail.detailId, ...form });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm({ title: detail.title || "", content: detail.content || "" });
        setIsEditing(false);
    };

    // 보기 <-> 편집 전환 시 각 Viewer 생성/정리
    useEffect(() => {
        if (isEditing) {
            // 편집 들어가면 보기용 Viewer 제거
            displayViewerRef.current?.destroy?.();
            displayViewerRef.current = null;

            if (previewElRef.current && !previewViewerRef.current) {
                previewViewerRef.current = new Viewer({
                    el: previewElRef.current,
                    initialValue: form.content || "",
                    usageStatistics: false,
                });
            }
        } else {
            // 보기 모드: 미리보기 Viewer 제거 후 보기용 생성
            previewViewerRef.current?.destroy?.();
            previewViewerRef.current = null;

            if (displayElRef.current && !displayViewerRef.current) {
                displayViewerRef.current = new Viewer({
                    el: displayElRef.current,
                    initialValue: detail.content || "",
                    usageStatistics: false,
                });
            }
        }

        return () => {
            // 전환/언마운트 시 정리
            if (isEditing) {
                previewViewerRef.current?.destroy?.();
                previewViewerRef.current = null;
            } else {
                displayViewerRef.current?.destroy?.();
                displayViewerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing]);

    // 편집 중 내용이 바뀌면 미리보기 갱신
    useEffect(() => {
        if (isEditing) {
            previewViewerRef.current?.setMarkdown(form.content || "");
        }
    }, [form.content, isEditing]);

    // 보기 모드에서 서버 내용 바뀌면 갱신
    useEffect(() => {
        if (!isEditing) {
            displayViewerRef.current?.setMarkdown(detail.content || "");
        }
    }, [detail.content, isEditing]);

    return (
        <li style={{ listStyle: "none", padding: "12px 8px" }}>
            {/* 제목 */}
            {isEditing ? (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
                    <TextField
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        size="small"
                        fullWidth
                        inputProps={{ style: { fontSize: "1.05rem", fontWeight: 600 } }}
                    />
                    <Tooltip title="저장">
                        <IconButton size="large" onClick={handleSave}>
                            <SaveOutlinedIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="취소">
                        <IconButton size="large" onClick={handleCancel}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ) : (
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                >
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.98rem", md: "1.12rem" } }}>
                        {detail.title}
                    </Typography>
                    {editMode && (
                        <Stack direction="row" spacing={1}>
                            <Tooltip title="수정">
                                <IconButton size="large" onClick={() => setIsEditing(true)}>
                                    <EditOutlinedIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="삭제">
                                <IconButton size="large" onClick={() => onDelete(detail.detailId)}>
                                    <DeleteOutlineIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}
                </Stack>
            )}

            {/* 내용 */}
            {isEditing ? (
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.5}
                    alignItems="stretch"
                    sx={{ mt: 1 }}
                >
                    {/* 왼쪽: 에디터 */}
                    <Box sx={{ flex: 1, minHeight: 240, display: "flex" }}>
                        <TextField
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            multiline
                            // textarea가 부모 높이를 꽉 채우도록
                            sx={{
                                flex: 1,
                                "& .MuiInputBase-root": { height: "100%" },
                                "& textarea": { height: "100% !important", resize: "vertical" },
                                fontSize: "0.95rem",
                            }}
                            minRows={8}
                        />
                    </Box>

                    {/* 오른쪽: 미리보기 */}
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 240,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1.5,
                            p: 1.25,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                        >
                            미리보기
                        </Typography>
                        <Box
                            sx={{
                                flex: 1,
                                // 토스트 뷰어 내부 타이포 살짝 정리
                                "& .toastui-editor-contents": {
                                    fontSize: "0.95rem",
                                    lineHeight: 1.7,
                                },
                            }}
                        >
                            <div ref={previewElRef} />
                        </Box>
                    </Box>
                </Stack>
            ) : (
                <Box
                    sx={{
                        mt: 1,
                        "& .toastui-editor-contents": {
                            fontSize: "0.95rem",
                            lineHeight: 1.8,
                        },
                    }}
                >
                    <div ref={displayElRef} />
                </Box>
            )}

        </li>
    );
};

export default DetailItem;
