import React, { useState } from "react";
import {
    Avatar,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import NotesIcon from "@mui/icons-material/Notes";

const DetailItem = ({ detail, editMode, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ title: detail.title, content: detail.content });

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    const handleSave = async () => {
        await onUpdate({ detailId: detail.detailId, ...form });
        setIsEditing(false);
    };

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ px: 0, py: { xs: 1.5, md: 2 } }}>
                <ListItemAvatar>
                    <Avatar variant="rounded" sx={{ width: { xs: 36, md: 44 }, height: { xs: 36, md: 44 } }}>
                        <NotesIcon fontSize="medium" />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        isEditing ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <TextField
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                    inputProps={{
                                        style: { fontSize: "1.05rem", fontWeight: 600 },
                                    }}
                                />
                                <Tooltip title="저장">
                                    <IconButton size="large" onClick={handleSave}>
                                        <SaveOutlinedIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="취소">
                                    <IconButton size="large" onClick={() => setIsEditing(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        ) : (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "0.98rem", md: "1.12rem" },
                                    }}
                                >
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
                        )
                    }
                    secondary={
                        isEditing ? (
                            <TextField
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                size="small"
                                fullWidth
                                multiline
                                minRows={3}
                                inputProps={{ style: { fontSize: "0.95rem" } }}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: "pre-line",
                                    fontSize: { xs: "0.92rem", md: "1rem" },
                                }}
                            >
                                {detail.content}
                            </Typography>
                        )
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
};

export default DetailItem;
