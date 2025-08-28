// components/ProjectCard/StackIconsOneLine.jsx
import React from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { ICON_MAP } from "../../../utils/iconMap";

const StackIconsOneLine = ({ names = [], iconSize = 16, boxSize = 20 }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: boxSize + 6,
                overflowX: "auto",
                overflowY: "hidden",
                WebkitOverflowScrolling: "touch",
                display: "flex",
                justifyContent: "center",
                /* ✅ 스크롤바 숨기기 (크로스브라우저) */
                scrollbarWidth: "none",        // Firefox
                msOverflowStyle: "none",       // IE/Edge 레거시
                "&::-webkit-scrollbar": {      // Chrome/Safari/Edge(Chromium)
                    display: "none",
                },

                /* (옵션) 양 끝 페이드로 더 깔끔하게 보이기 */
                position: "relative",
                maskImage:
                    "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
            }}
        >
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", flexWrap: "nowrap", width: "max-content", pr: 0.5 }}>
                {names.map((name, i) => {
                    const entry = ICON_MAP?.[name] || {};
                    const Icon = entry.Icon || entry.icon || entry;
                    const color = entry.color;
                    return (
                        <Tooltip title={name} key={`${name}-${i}`} arrow>
                            <Box
                                component="span"
                                sx={{
                                    width: boxSize,
                                    height: boxSize,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: "0 0 auto",
                                }}
                            >
                                {Icon ? (
                                    <Icon size={iconSize} color={color} />
                                ) : (
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                        {String(name).charAt(0).toUpperCase()}
                                    </Typography>
                                )}
                            </Box>
                        </Tooltip>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default StackIconsOneLine;
