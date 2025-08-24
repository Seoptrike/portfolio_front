import React from "react";
import { Box, Stack, Typography } from "@mui/material";


const SectionHeader = ({ company, position, start, end }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{company}</Typography>
                <Typography variant="body2" color="text.secondary">{start} ~ {end}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{position}</Typography>
        </Box>
    );
};


export default SectionHeader;