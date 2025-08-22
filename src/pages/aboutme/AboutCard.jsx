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
                <Box
                    sx={{
                        position: "relative",
                        my: 2,
                        minHeight: { xs: 56, md: 64 },        // 헤더 높이 고정
                        px: { xs: 6, md: 8 },                 // 좌우 약간의 안전 여백
                    }}
                >
                    {/* 제목: 절대 중앙 고정 */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)", // ← 진짜 중앙
                            textAlign: "center",
                            pointerEvents: "none",               // 액션 버튼과의 포커스 충돌 방지
                            width: "100%",
                        }}
                    >
                        <CommonHeroBanner title={about.title} size={isMobile ? "compact" : "section"} />
                    </Box>

                    {/* 우측 액션: 보일 때만 보이되, 자리와 중앙은 무관 */}
                    <Box
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <Stack direction="row" spacing={0.75} sx={{ visibility: editMode && !isEditing ? "visible" : "hidden" }}>
                            <IconButton onClick={onStartEdit} size="medium">
                                <EditIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={onDelete} size="medium" color="error">
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Box>
                {/* 제목 밑에 내용 or Form */}
                {isEditing ? (
                    <AddEditForm
                        mode="edit"
                        values={editingValues}
                        onChange={onChangeEdit}
                        onCancel={onCancelEdit}
                        onSave={onSaveEdit}
                    />
                ) : (
                    <Typography
                        sx={{
                            whiteSpace: "pre-wrap",
                            textAlign: "center",
                            maxWidth: { md: 720, lg: 760, xl: 1200 },
                            mx: "auto",
                            fontSize: { xs: "0.98rem", md: "1.12rem", lg: "1.18rem" },
                            lineHeight: { xs: 1.7, md: 1.9 },
                            letterSpacing: { xs: "0.005em", md: "0.01em" },
                            wordBreak: "keep-all",
                            textWrap: "pretty",
                            px: { xs: 2, md: 0 },
                            py: { xs: 1.25, md: 0.5 },
                            borderRadius: { xs: 2, md: 0 },
                            color: "text.primary",
                            "& br + br": {
                                display: "block",
                                content: '""',
                                marginTop: { xs: "0.75rem", md: "1rem" },
                            },
                        }}
                    >
                        {about.content}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default AboutCard;