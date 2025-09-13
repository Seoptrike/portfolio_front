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
                borderRadius: 4,
                overflow: "hidden", 
                border: "1px solid rgba(0,0,0,0.2)",
                background: `
                    linear-gradient(145deg, #ffffff 0%, #fdfdfd 50%, #fafafa 100%),
                    linear-gradient(45deg, rgba(255,193,7,0.05), rgba(220,53,69,0.02))
                `,
                boxShadow: `
                    0 8px 32px rgba(0,0,0,0.12),
                    inset 0 1px 0 rgba(255,255,255,0.9),
                    inset 0 -1px 0 rgba(0,0,0,0.05)
                `,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `
                        0 12px 40px rgba(0,0,0,0.15),
                        inset 0 1px 0 rgba(255,255,255,0.9),
                        inset 0 -1px 0 rgba(0,0,0,0.05)
                    `
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #ffc107, #fd7e14, #dc3545)",
                    borderRadius: "4px 4px 0 0"
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
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                                display: "grid",
                                placeItems: "center",
                                boxShadow: `
                                    0 4px 12px rgba(0,0,0,0.15),
                                    inset 0 2px 4px rgba(255,255,255,0.9),
                                    inset 0 -2px 4px rgba(0,0,0,0.1)
                                `,
                                fontSize: "20px",
                                flexShrink: 0,
                                border: "1px solid rgba(0,0,0,0.1)"
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
                                    background: "linear-gradient(145deg, #212529, #495057)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
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
                                color: "#495057",
                                borderColor: "transparent",
                                background: "linear-gradient(145deg, rgba(255,193,7,0.2), rgba(255,193,7,0.1))",
                                boxShadow: "0 2px 6px rgba(255,193,7,0.3)",
                                border: "1px solid rgba(255,193,7,0.3)"
                            }}
                        />
                    </Stack>

                    {/* Right: Primary action */}
                    {editMode && (
                        <Button
                            component={onPrimaryAction ? "button" : RouterLink}
                            to={onPrimaryAction ? undefined : `/${username}${actionRoute}`}
                            onClick={onPrimaryAction}
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                borderRadius: 999,
                                px: 2.5,
                                py: 1,
                                border: "1px solid rgba(0,0,0,0.2)",
                                color: "#212529",
                                background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                                boxShadow: `
                                    0 4px 12px rgba(0,0,0,0.15),
                                    inset 0 1px 2px rgba(255,255,255,0.9),
                                    inset 0 -1px 2px rgba(0,0,0,0.1)
                                `,
                                fontWeight: 600,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    borderColor: "#fd7e14",
                                    backgroundColor: "rgba(255,193,7,0.1)",
                                    boxShadow: `
                                        0 6px 18px rgba(0,0,0,0.2),
                                        inset 0 1px 2px rgba(255,255,255,0.9),
                                        inset 0 -1px 2px rgba(0,0,0,0.1)
                                    `
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