import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { AddCircleOutline as AddIcon } from '@mui/icons-material';

const AddCard = ({ onClick }) => {
    return (
        <Card
            variant="outlined"
            onClick={onClick}
            sx={{
                p: 2,
                height: '100%',
                borderStyle: 'dashed',
                borderColor: 'divider',
                borderRadius: 3,
                cursor: 'pointer',
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' },
            }}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
                <Box textAlign="center">
                    <AddIcon sx={{ fontSize: 40 }} />
                    <Typography variant="body1" mt={1} color="text.secondary">새 자기소개 추가하기</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddCard;