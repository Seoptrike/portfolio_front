import React, { useState } from "react";
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import NotesIcon from "@mui/icons-material/Notes";
import DetailTitle from "./DetailTitle";


const DetailItem = ({ detail, editMode, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ title: detail.title, content: detail.content });


    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    const handleSave = async () => {
        await onUpdate({ detailId: detail.detailId, ...form });
        setIsEditing(false);
    };


    return (
        <>
            <ListItem
                alignItems="flex-start"
                sx={{ px: 0, py: 2 }}
                secondaryAction={
                    editMode && (
                        <Stack direction="row" spacing={0.5}>
                            {!isEditing ? (
                                <>
                                    <Tooltip title="수정">
                                        <IconButton edge="end" size="small" onClick={() => setIsEditing(true)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton edge="end" size="small" onClick={() => onDelete(detail.detailId)}>
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip title="취소">
                                        <IconButton edge="end" size="small" onClick={() => setIsEditing(false)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="저장">
                                        <IconButton edge="end" size="small" onClick={handleSave}>
                                            <SaveOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </Stack>
                    )
                }
            >
                <ListItemAvatar>
                    <Avatar variant="rounded"><NotesIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        isEditing ? (
                            <TextField name="title" value={form.title} onChange={handleChange} size="small" fullWidth />
                        ) : (
                            <DetailTitle title={detail.title} />
                        )
                    }
                    secondary={
                        isEditing ? (
                            <TextField name="content" value={form.content} onChange={handleChange} size="small" fullWidth multiline minRows={3} />
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
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