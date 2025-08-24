import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const SectionHeader = ({ company, position, start, end }) => {
    const period = start && end ? `${start} ~ ${end}` : start || end || "";

    return (
        <Box
            sx={{
                width: "100%",
                pr: { xs: 5, sm: 6 }, // expand 아이콘과 겹침 방지
                minWidth: 0,
            }}
        >
            {/* 1행: 회사명 + (모바일: 날짜) / 데스크탑: 회사명 --- 날짜 */}
            <Stack
                direction="row"
                justifyContent={{ xs: "flex-start", md: "space-between" }}
                alignItems="center"
                gap={1}
                sx={{ minWidth: 0 }}
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
                        fontSize: { xs: "0.85rem", md: "1rem", lg: "1.05rem" }, // ✅ 데스크탑에서 키움
                        fontWeight: { md: 500 },
                    }}
                >
                    {period}
                </Typography>
            </Stack>

            {/* 2행: 직무 */}
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
            >
                {position}
            </Typography>
        </Box>
    );
};

export default SectionHeader;
