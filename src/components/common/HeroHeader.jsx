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
    onPrimaryAction,             // optional (navigate 없이 클릭 핸들러로도 사용 가능)
    actionButtonProps = {},      // e.g. { component: RouterLink, to: "/path", sx: {...} }
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
                    `linear-gradient(180deg, ${t.palette.primary.main}14 0%, ${t.palette.background.paper} 60%)`,
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
                            backgroundColor: t.palette.primary.main,
                            display: "grid",
                            placeItems: "center",
                            boxShadow: `0 6px 16px ${t.palette.primary.main}59`,
                            color: t.palette.primary.contrastText,
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
                                color: t.palette.primary.main,
                                borderColor: "transparent",
                                backgroundColor: t.palette.primary.main + "1A",
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
                                sx={{ borderRadius: 999, px: 2 }}
                                {...actionButtonProps} // RouterLink + to 등 최종 오버라이드
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
