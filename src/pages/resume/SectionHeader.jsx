import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const SectionHeader = ({ company, position, start, end }) => {
    const period = start && end ? `${start} ~ ${end}` : start || end || "";

    return (
        <Box
            sx={{
                width: "100%",
                pr: { xs: 2, sm: 3, md: 6 },
                minWidth: 0,
            }}
        >
            {/* 데스크탑: 기존 구조 유지 */}
            <Stack
                direction="row"
                justifyContent={{ xs: "flex-start", md: "space-between" }}
                alignItems="center"
                gap={1}
                sx={{ minWidth: 0, display: { xs: "none", md: "flex" } }} // 모바일 숨김
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: "0 1 auto",
                    }}
                    title={company}
                >
                    {company}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                        fontSize: { md: "1rem", lg: "1.05rem" },
                        fontWeight: { md: 500 },
                    }}
                >
                    {period}
                </Typography>
            </Stack>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, display: { xs: "none", md: "block" } }} // 데스크탑 전용
            >
                {position}
            </Typography>

            {/* 모바일: 회사명 1줄 + 직급 옆에 근무기간 */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        mb: 0.25,
                    }}
                >
                    {company}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        {position}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.85rem" }}
                    >
                        {period}
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default SectionHeader;
