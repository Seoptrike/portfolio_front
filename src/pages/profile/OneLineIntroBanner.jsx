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
    placeholder = "안녕하세요! 👋 한 줄 소개를 입력해 주세요.",
    align = "left", // "left" | "center"
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
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 2.5 },
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                background:
                    "linear-gradient(135deg, rgba(49,130,246,0.08), rgba(255,184,0,0.08))",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                overflow: "hidden",
            }}
        >
            <Box sx={{ flex: "1 1 auto", minWidth: 0, textAlign: align }}>
                {!editing ? (
                    <Typography
                        variant="h6"
                        sx={{
                            m: 0,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "text.primary",
                        }}
                        title={value || placeholder}
                    >
                        {value ? value : <span style={{ opacity: 0.6 }}>{placeholder}</span>}
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
