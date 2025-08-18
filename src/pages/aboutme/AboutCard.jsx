import React from 'react';
import { Card, CardContent, Typography, Stack, IconButton, Box } from '@mui/material';
import { EditOutlined as EditIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import AddEditForm from './AddEditForm';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';
import useIsMobile from '../../hooks/useIsMobile';

const AboutCard = ({
    about,
    editMode,
    isEditing,
    editingValues,
    onStartEdit,
    onChangeEdit,
    onCancelEdit,
    onSaveEdit,
    onDelete,
}) => {
    const { isMobile } = useIsMobile();

    return (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 1.25, md: 1.5 } }}>
                {isEditing ? (
                    <AddEditForm
                        mode="edit"
                        values={editingValues}
                        onChange={onChangeEdit}
                        onCancel={onCancelEdit}
                        onSave={onSaveEdit}
                    />
                ) : (
                    <>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                            <Box flex={1} display="flex" justifyContent={"center"}>
                                <CommonHeroBanner title={about.title} size={isMobile ? "compact" : "section"} />
                            </Box>
                            {editMode && (
                                <Stack direction="row" spacing={0.5}>
                                    <IconButton size="small" onClick={onStartEdit}><EditIcon fontSize="small" /></IconButton>
                                    <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
                                </Stack>
                            )}
                        </Stack>
                        <Typography
                            sx={{
                                whiteSpace: 'pre-wrap',
                                textAlign: { xs: 'center', md: 'left' },       // 모바일: 가운데, 데스크탑: 왼쪽
                                fontSize: { xs: '0.95rem', md: '1.5rem' },    // 모바일은 조금 작게
                                lineHeight: { xs: 1.6, md: 1.75 },             // 모바일: 넉넉, 데스크탑: 기본
                                color: 'text.primary',
                                px: { xs: 1, md: 0 },                          // 모바일은 좌우 여백 조금 줌
                                maxWidth: { md: '80%' },                       // 데스크탑에서는 본문 폭 제한
                                mx: { xs: 'auto', md: 'unset' },               // 모바일은 가운데 정렬 위해 auto margin
                                pl: { md: 2 },                                 // 바와 본문 사이 여백
                                borderRadius: { xs: 2, md: 0 },                // 모바일 배경일 때 모서리 둥글게
                                py: { xs: 1.5, md: 0 }                         // 모바일 배경일 때 위아래 여백
                            }}
                        >
                            {about.content}
                        </Typography>

                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default AboutCard;