// components/StackIconList.jsx
import React from "react";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ICON_MAP } from "../../utils/iconMap";

export default function StackIconList({ stacks = [], dense = false, centered = false }) {
    if (!stacks || stacks.length === 0) return null;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // 📱 모바일용 사이즈 (더 크게)
    const cellMobile = 48;        // 칸 크기 (정사각형)
    const iconSizeMobile = 26;    // 칸 안에서 거의 꽉 차게  // 칸 크기 (조금 여유)
    // 💻 데스크탑은 기존
    const iconSize = dense ? 18 : 22;
    const cellDesktop = 44;

    const getName = (s) => (typeof s === "string" ? s : s?.name ?? "");

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                    ? "repeat(5, 1fr)"              // 📱 한 줄 5칸
                    : "repeat(auto-fit, minmax(120px, 1fr))",
                gap: isMobile ? 0.5 : 1,
                justifyItems: "stretch",
                alignItems: "center",
            }}
        >
            {stacks.map((item, idx) => {
                const name = getName(item);
                const iconData = ICON_MAP?.[name];
                if (isMobile) {
                    return (
                        <Tooltip key={`${name}-${idx}`} title={name} arrow disableInteractive>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: cellMobile,              // 48px 정사각형
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "background.paper",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    p: 0,                           // ✅ 패딩 제거
                                    lineHeight: 0,
                                }}
                            >
                                {iconData?.Icon ? (
                                    <iconData.Icon size={iconSizeMobile} color={iconData.color} />
                                ) : (
                                    <Box sx={{ width: 20, height: 20, bgcolor: "divider", borderRadius: 0.5 }} />
                                )}
                            </Box>
                        </Tooltip>
                    );
                }
                // ===== 데스크탑: 아이콘 + 라벨 =====
                return (
                    <Tooltip key={`${name}-${idx}`} title={name} arrow disableInteractive>
                        <Box
                            sx={{
                                height: cellDesktop,
                                borderRadius: 1.5,
                                border: "1px solid",
                                borderColor: "divider",
                                bgcolor: "background.paper",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: 0.75,
                                px: 1,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                minWidth: 0,
                            }}
                        >
                            {iconData?.Icon ? (
                                <iconData.Icon size={iconSize} color={iconData.color} />
                            ) : (
                                <Box sx={{ width: iconSize - 2, height: iconSize - 2, borderRadius: "4px", bgcolor: "divider" }} />
                            )}
                            <Box
                                component="span"
                                sx={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)", lineHeight: 1.2, color: "text.primary" }}
                            >
                                {name}
                            </Box>
                        </Box>
                    </Tooltip>
                );
            })}
        </Box>
    );
}
