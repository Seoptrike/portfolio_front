// OneLineIntroBanner.jsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Tooltip,
    CircularProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const OneLineIntroBanner = ({
    value = "",
    onSave = async () => { },
    editMode = false,
    loading = false,
    maxLength = 60,
    // 주의: 지금은 호출부가 value를 넘기지 않아 이 문구가 그대로 화면에 보인다.
    // (한 줄 소개는 아직 저장/조회 경로가 없다 — 아래 주석 참고)
    placeholder = "시스템에 감칠맛을 더하고, 도전을 통해 성장하는 개발자 김인섭입니다.",
    align = "center", // "left" | "center"
}) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value ?? "");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!editing) setText(value ?? "");
    }, [value, editing]);

    const count = text?.length ?? 0;
    const over = count > maxLength;

    const startEdit = () => setEditing(true);
    const cancelEdit = () => {
        setText(value ?? "");
        setEditing(false);
    };

    const commitSave = async () => {
        const next = (text ?? "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
        if (!next && value) return setEditing(false);
        if (next.length > maxLength) return;
        try {
            setSaving(true);
            await onSave(next);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commitSave();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEdit();
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                borderRadius: 3,
                px: { xs: 4, sm: 6 },
                py: { xs: 5, sm: 7 },
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                overflow: "hidden",
                minHeight: { xs: 120, sm: 140 },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--accent)",
                    opacity: 0.7
                }
            }}
        >
            <Box sx={{ flex: "1 1 auto", minWidth: 0, textAlign: align }}>
                {!editing ? (
                    <Typography
                        variant="h4"
                        sx={{
                            m: 0,
                            fontWeight: 700,
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "var(--text)",
                            fontSize: { xs: "1.0rem", sm: "1.6rem" }, // 모바일 글자 크기 축소
                            wordBreak: "keep-all"
                        }}
                        title={value || placeholder}
                    >
                        {value || placeholder}
                    </Typography>
                ) : (
                    <Box sx={{ position: "relative" }}>
                        <TextField
                            autoFocus
                            fullWidth
                            size="small"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={onKeyDown}
                            inputProps={{ maxLength: maxLength + 20, "aria-label": "한 줄 소개" }}
                            placeholder={placeholder}
                            disabled={saving || loading}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                position: "absolute",
                                right: 8,
                                bottom: -22,
                                color: over ? "error.main" : "text.secondary",
                            }}
                        >
                            {count}/{maxLength}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 0.5 }}>
                {saving || loading ? (
                    <CircularProgress size={22} />
                ) : editing ? (
                    <>
                        <Tooltip title="저장 (Enter)">
                            <span>
                                <IconButton color="primary" size="small" onClick={commitSave} disabled={over}>
                                    <CheckRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="취소 (Esc)">
                            <IconButton size="small" onClick={cancelEdit}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : editMode ? (
                    <Tooltip title="한 줄 소개 편집">
                        <IconButton size="small" onClick={startEdit}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Box>
        </Paper>
    );
};

export default OneLineIntroBanner;
