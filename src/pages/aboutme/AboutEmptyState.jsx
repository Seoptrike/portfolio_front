// rafce
import React from "react";
import { Box, Grid, Paper, Stack, Typography, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const AboutEmptyState = ({ canEdit = false, onAdd }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                textAlign: "center",
                bgcolor: "background.paper",
            }}
        >
            <Stack spacing={2} alignItems="center">
                <Box
                    sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        border: "1px dashed",
                        borderColor: "divider",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <PersonOutlineIcon fontSize="large" />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    아직 등록된 자기소개가 없어요
                </Typography>

                <Typography color="text.secondary">
                    간단한 소개, 핵심 역량, 취미/관심사 등을 자유롭게 작성해 보세요.
                </Typography>

                {canEdit ? (
                    <Grid container spacing={1.5} sx={{ mt: 1 }}>
                        <Grid>
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.currentTarget.blur(); // ✅ 포커스 제거(모달/폼 열 때 경고 방지)
                                    onAdd?.();
                                }}
                            >
                                첫 항목 추가하기
                            </Button>
                        </Grid>
                        <Grid>
                            <Button variant="text" onClick={(e) => e.currentTarget.blur()}>
                                가이드 보기
                            </Button>
                        </Grid>
                    </Grid>
                ) : null}
            </Stack>
        </Paper>
    );
};

export default AboutEmptyState;
