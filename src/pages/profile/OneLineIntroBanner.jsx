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
                borderRadius: 4,
                px: { xs: 4, sm: 6 },
                py: { xs: 5, sm: 7 },
                background: `
                    linear-gradient(145deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%),
                    linear-gradient(45deg, rgba(255,193,7,0.1), rgba(220,53,69,0.1))
                `, // 흰색 배경 + 오렌지 액센트
                border: "1px solid rgba(0,0,0,0.2)", // 희미한 회색 테두리
                boxShadow: `
                    0 8px 32px rgba(0,0,0,0.12),
                    inset 0 1px 0 rgba(255,255,255,0.9),
                    inset 0 -1px 0 rgba(0,0,0,0.05)
                `, // 라이트 테마용 그림자
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                overflow: "hidden",
                minHeight: { xs: 120, sm: 140 },
                "&:hover": {
                    transform: "translateY(-3px) rotateX(2deg)", // 3D 회전 효과
                    boxShadow: `
                        0 12px 48px rgba(0,0,0,0.15),
                        inset 0 1px 0 rgba(255,255,255,0.9),
                        inset 0 -1px 0 rgba(0,0,0,0.05)
                    `,
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: "linear-gradient(90deg, #ffc107, #fd7e14, #dc3545, #6c757d)", // 오렌지 계열 + 다크
                    borderRadius: "4px 4px 0 0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 4,
                    right: 4,
                    height: "4px",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                    filter: "blur(3px)",
                    zIndex: -1
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
                            color: "#212529", // 검은색 텍스트 (라이트 테마)
                            fontSize: { xs: "1.0rem", sm: "1.6rem" }, // 모바일 글자 크기 축소
                            wordBreak: "keep-all",
                            textShadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)", // 라이트용 텍스트 그림자
                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))", // 입체감
                            transform: "translateZ(10px)"
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
