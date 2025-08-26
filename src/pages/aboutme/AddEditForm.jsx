import React, { Suspense, useMemo, useState } from 'react';
import { Card, CardContent, CardActions, Stack, TextField, Button } from '@mui/material';
import { SaveOutlined as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import LocalTinyEditor from '../../components/common/LocalTinyEditor.jsx';
//const LocalTinyEditor = React.lazy(() => import('../../components/common/LocalTinyEditor.jsx'));

const AddEditForm = ({ mode = 'add', values, onChange, onCancel, onSave }) => {
    // content만 별도로 TinyMCE에서 받아옴
    // const handleEditorChange = (html) => {
    //     const clean = DOMPurify.sanitize(html, {
    //         ALLOWED_TAGS: ['p', 'h2', 'h3', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'br'],
    //         ALLOWED_ATTR: ['href', 'target', 'rel']
    //     });
    //     onChange({ target: { name: 'content', value: clean } });
    // };
    const [openEditor, setOpenEditor] = useState(true);
    const handleEditorChange = (html) =>
        onChange({ target: { name: 'content', value: html } });
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
                    {/* TinyMCE 에디터 삽입 */}
                    {openEditor ? (
                        <Suspense fallback={<div style={{ padding: 8 }}>에디터 불러오는 중…</div>}>
                            <LocalTinyEditor
                                value={values.content || '<p></p>'}
                                onChange={handleEditorChange}
                                height={300} />
                        </Suspense>
                    ) : (
                        <Button variant="outlined" onClick={() => setOpenEditor(true)}>
                            서식 편집 열기
                        </Button>
                    )}
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                <Button onClick={onCancel} startIcon={<CloseIcon />}>취소</Button>
                <Button variant="contained" onClick={onSave} startIcon={<SaveIcon />}>
                    {mode === 'add' ? '저장' : '수정'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default AddEditForm;
