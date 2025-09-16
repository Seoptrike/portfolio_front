import React from 'react';
import { Card, CardContent, Typography, Stack, IconButton, Box } from '@mui/material';
import { EditOutlined as EditIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import AddEditForm from './AddEditForm';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';
import useIsMobile from '../../hooks/useIsMobile';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../context/AuthContext';

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

    // sessionStorage 변경을 감지하기 위한 state
    const [companyName, setCompanyName] = React.useState(() => {
        return sessionStorage.getItem('company') || '귀사';
    });

    // sessionStorage 변경 감지
    React.useEffect(() => {
        const handleStorageChange = () => {
            setCompanyName(sessionStorage.getItem('company') || '귀사');
        };

        // storage 이벤트 리스너 추가
        window.addEventListener('storage', handleStorageChange);

        // 주기적으로 체크 (같은 탭에서의 변경 감지용)
        const interval = setInterval(handleStorageChange, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // 템플릿 변수 치환 함수
    const replaceTemplateVariables = (content) => {
        if (!content) return '';

        console.log('원본 content:', content);
        console.log('companyName:', companyName);

        const templateVars = {
            '{회사이름}': companyName,
        };

        let processedContent = content;
        Object.entries(templateVars).forEach(([template, value]) => {
            console.log('치환 중:', template, '→', value);
            processedContent = processedContent.replace(new RegExp(template, 'g'), value);
        });

        console.log('치환 후 content:', processedContent);
        return processedContent;
    };

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
                        component="div"
                        sx={{
                            textAlign: "center",
                            width: '100%',
                            // 조금 더 여유있게 조정 - 최소 770px, 보통 78vw, 최대 1120px
                            maxWidth: 'clamp(770px, 78vw, 1120px)',
                            mx: "auto",
                            fontSize: { xs: "0.98rem", md: "1.12rem", lg: "1.18rem" },
                            lineHeight: { xs: 1.7, md: 1.9 },
                            letterSpacing: { xs: "0.005em", md: "0.01em" },
                            whiteSpace: "pre-wrap",      // 줄바꿈 + 자동개행
                            wordBreak: "break-word",     // 긴 단어 줄바꿈
                            overflowWrap: "anywhere",
                            px: { xs: 2, md: 0 },
                            py: { xs: 1.25, md: 0.5 },
                            borderRadius: { xs: 2, md: 0 },
                            color: "text.primary",
                            "& p": { margin: "0.5em 0" },
                            "& h2": { fontSize: "1.2rem", margin: "1em 0 .5em", fontWeight: 700 },
                            "& h3": { fontSize: "1.05rem", margin: ".8em 0 .4em", fontWeight: 600 },
                            "& ul, & ol": { display: "inline-block", textAlign: "left", margin: "0.5em auto", paddingLeft: "1.2em" },
                            "& li": { margin: ".2em 0" },
                            "& a": { textDecoration: "underline" },
                        }}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(replaceTemplateVariables(about.content) || "")
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AboutCard;