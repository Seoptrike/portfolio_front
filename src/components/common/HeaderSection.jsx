import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Paper, Stack, Typography, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useIsMobile from "../../hooks/useIsMobile";

const HeaderSection = React.memo(function HeaderSection({ 
    title, 
    editMode, 
    username,
    actionRoute = `/project/insert`, // 기본값
    onPrimaryAction, // 커스텀 액션 함수
    sx = { mb: 2.5 }
}) {
    const isMobile = useIsMobile();
    
    // 데스크탑에서는 IntegratedNavigation이 이 역할을 대체하므로 숨김
    if (!isMobile) {
        return null;
    }
    // 타이틀에 따른 아이콘 매핑 (메인페이지와 동일한 이모지)
    const getIconByTitle = (title) => {
        const iconMap = {
            '방명록': '💬',
            '자기소개서': '👨‍💻', 
            '프로젝트': '🚀',
            '경력 기술서': '📝'
        };
        return iconMap[title] || '📋';
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--accent)",
                    opacity: 0.7
                },
                position: "relative",
                ...sx
            }}
        >
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ minHeight: 56 }}
                >
                    {/* Left: Icon + Title + Chip */}
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: "var(--surface-2)",
                                display: "grid",
                                placeItems: "center",
                                fontSize: "18px",
                                flexShrink: 0,
                                border: "1px solid var(--border)"
                            }}
                        >
                            {getIconByTitle(title)}
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: "-0.015em",
                                    lineHeight: 1.15,
                                    color: "var(--text)"
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>

                        <Chip
                            label={`@${username}`}
                            size="small"
                            sx={{
                                fontWeight: 600,
                                color: "var(--accent)",
                                background: "var(--accent-subtle)",
                                border: "1px solid var(--accent-border)",
                                fontFamily: "var(--font-mono)"
                            }}
                        />
                    </Stack>

                    {/* Right: Primary action */}
                    {editMode && (
                        <Button
                            component={onPrimaryAction ? "button" : RouterLink}
                            to={onPrimaryAction ? undefined : `/${username}${actionRoute}`}
                            onClick={onPrimaryAction}
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{
                                borderRadius: 999,
                                px: 2.5,
                                py: 1,
                                border: "1px solid var(--accent-border)",
                                color: "var(--accent)",
                                background: "transparent",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    borderColor: "var(--accent)",
                                    backgroundColor: "var(--accent-subtle)"
                                }
                            }}
                        >
                            {onPrimaryAction ? "추가" : "등록하러가기"}
                        </Button>
                    )}
                </Stack>
            </Box>
        </Paper>
    );
});

export default HeaderSection;