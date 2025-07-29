import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [users, setUsers] = useState();
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                textAlign: 'center',
                padding: 4,
            }}
        >
            <Typography variant="h3" gutterBottom>
                👋 안녕하세요, 김인섭입니다.
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 600 }}>
                프론트엔드와 백엔드를 함께하는 개발자입니다.
                <br/>
                기술로 사람의 삶을 더 편리하게 만드는 것에 관심이 있습니다.
            </Typography>

            <Stack direction="row" spacing={2} mt={5}>
                <Button variant="contained" component={Link} to="/auth/login">
                    로그인 하기
                </Button>
            </Stack>
        </Box>
    );
};

export default HomePage;
