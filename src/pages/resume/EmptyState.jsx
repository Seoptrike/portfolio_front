import React from "react";
import { Paper, Typography, Button } from "@mui/material";


const EmptyState = ({ isHost, onOpen }) => (
    <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: 3, border: 1, borderColor: "divider" }}>
        <Typography variant="body1" color="text.secondary">아직 등록된 경력이 없습니다.</Typography>
        {isHost && (
            <Button onClick={onOpen} variant="contained" sx={{ mt: 2 }}>경력 추가하기</Button>
        )}
    </Paper>
);


export default EmptyState;