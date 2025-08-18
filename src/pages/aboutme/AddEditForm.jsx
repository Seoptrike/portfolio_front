import React from 'react';
import { Card, CardContent, CardActions, Stack, TextField, Button } from '@mui/material';
import { SaveOutlined as SaveIcon, Close as CloseIcon } from '@mui/icons-material';

const AddEditForm = ({ mode = 'add', values, onChange, onCancel, onSave }) => {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        label="제목"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="내용"
                        name="content"
                        value={values.content}
                        onChange={onChange}
                        multiline
                        minRows={5}
                        fullWidth
                    />
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                <Button onClick={onCancel} startIcon={<CloseIcon />}>취소</Button>
                <Button variant="contained" onClick={onSave} startIcon={<SaveIcon />}>{mode === 'add' ? '저장' : '수정'}</Button>
            </CardActions>
        </Card>
    );
};

export default AddEditForm;
