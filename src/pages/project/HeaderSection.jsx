import { Stack, Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import React from "react";


const HeaderSection = React.memo(function HeaderSection({ editMode, username }) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
            sx={{ my: 1 }}
        >
            <Box>
                <Typography variant="body2" color="text.secondary">
                    최근에 진행한 작업과 포트폴리오를 모아 보여줘요.
                </Typography>
            </Box>
            {editMode && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to={`/${username}/project/insert`}
                    sx={{ alignSelf: { xs: "stretch", sm: "center" } }}
                >
                    등록하러가기
                </Button>
            )}
        </Stack>
    );
});


export default HeaderSection;