import React from "react";
import { Box, Button, Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";

const HeroHeader = React.memo(function HeroHeader({
    title,
    subtitle,
    icon,
    chipLabel,
    showChip = false,
    editMode = false,
    isHost = false,
    primaryActionLabel,
    primaryActionIcon,
    onPrimaryAction,
    actionButtonProps = {},
    sx,
}) {
    const showAction = (isHost || editMode) && Boolean(primaryActionLabel);

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 2.5,
                p: { xs: 2, sm: 2.5 },
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                background: (t) =>
                    `linear-gradient(180deg, #21252914 10%, ${t.palette.background.paper} 60%)`,
                ...sx,
            }}
        >
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
                        sx={(t) => ({
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            // ✅ 파란 배경 제거 → 중립 계열
                            backgroundColor: t.palette.grey[800],
                            display: "grid",
                            placeItems: "center",
                            boxShadow: `0 6px 16px ${t.palette.grey[800]}59`,
                            color: t.palette.common.white,
                            flexShrink: 0,
                        })}
                    >
                        {icon}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: "-0.015em",
                                lineHeight: 1.15,
                            }}
                        >
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    {showChip && chipLabel && (
                        <Chip
                            label={chipLabel}
                            size="small"
                            sx={(t) => ({
                                fontWeight: 600,
                                // ✅ 파란 텍스트/배경 제거 → 회색 톤
                                color: t.palette.text.primary,
                                borderColor: "transparent",
                                backgroundColor: t.palette.grey[200],
                            })}
                        />
                    )}
                </Stack>

                {/* Right: Primary action */}
                {showAction && (
                    <Tooltip title={primaryActionLabel}>
                        <span>
                            <Button
                                variant="contained"
                                disableElevation
                                startIcon={primaryActionIcon}
                                onClick={onPrimaryAction}
                                sx={{
                                    borderRadius: 999,
                                    px: 2,
                                    // ✅ 버튼 색상도 중립 톤
                                    backgroundColor: (t) => t.palette.grey[800],
                                    "&:hover": {
                                        backgroundColor: (t) => t.palette.grey[900],
                                    },
                                }}
                                {...actionButtonProps}
                            >
                                {primaryActionLabel}
                            </Button>
                        </span>
                    </Tooltip>
                )}
            </Stack>
        </Paper>
    );
});

export default HeroHeader;
