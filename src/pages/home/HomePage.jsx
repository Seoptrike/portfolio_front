// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
    const { isLogin } = useContext(AuthContext);

    return (
        <Box
            sx={{
                minHeight: '100svh',
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
                px: 2,
                py: { xs: 4, md: 8 },
                background: `
          radial-gradient(1200px 700px at 10% -10%, #fff7ed 0, rgba(255,247,237,0) 55%),
          radial-gradient(900px 600px at 110% 0%, #e0f2fe 0, rgba(224,242,254,0) 50%),
          linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)
        `,
            }}
        >
            {/* 배경 데코 */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        filter: 'blur(40px)',
                        opacity: 0.5,
                        borderRadius: '50%',
                    },
                    '&::before': {
                        width: 360, height: 360, left: -120, top: 120,
                        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                    },
                    '&::after': {
                        width: 420, height: 420, right: -140, top: -60,
                        background: 'linear-gradient(135deg, #bfdbfe, #93c5fd)',
                    },
                }}
            />

            {/* 글래스 카드 */}
            <Box
                sx={{
                    maxWidth: 960,
                    width: '100%',
                    mx: 'auto',
                    px: { xs: 3, md: 6 },
                    py: { xs: 4, md: 8 },
                    borderRadius: 3,
                    textAlign: 'center',                 // ✅ 가운데 정렬
                    backgroundColor: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 24px 60px rgba(15,23,42,0.10)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                }}
            >
                {/* 로고 중앙 & 크게 */}
                <Box
                    component="img"
                    src="/images/seoportfolio_logo.png"
                    alt="Seopotfolio"
                    sx={{
                        width: { xs: 84, md: 100 }, height: { xs: 84, md: 100 },
                        mx: 'auto', display: 'block',
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        mb: 1.5,
                    }}
                />
                <Typography sx={{ fontWeight: 800, letterSpacing: 0.2, color: '#111827', mb: 2 }}>
                    Seopotfolio
                </Typography>

                {/* 헤드라인(담백하게) */}
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: 28, sm: 36, md: 44 },
                        fontWeight: 900,
                        letterSpacing: '-.02em',
                        lineHeight: 1.2,
                        color: '#0f172a',
                        mb: 1.5,
                    }}
                >
                    안녕하세요, 개발자 김인섭입니다.
                </Typography>

                {/* 서브 카피 – 면접 한줄 자기소개 톤 */}
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: 14, sm: 16, md: 18 },
                        color: '#374151',
                        lineHeight: 1.9,
                        maxWidth: 760,
                        mx: 'auto',
                    }}
                >
                    문제를 명확히 정의하고, 사용자 가치를 중심으로 끝까지 구현하는 풀스택 개발자입니다.
                </Typography>

                {/* CTA */}
                {!isLogin && (
                    <Stack direction="row" spacing={1.5} sx={{ mt: 4, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/auth/login"
                            sx={{
                                px: 3, py: 1.25, borderRadius: 2,
                                fontWeight: 800, textTransform: 'none',
                                bgcolor: '#FF8A00',
                                '&:hover': { bgcolor: '#FF7A00' },
                            }}
                        >
                            로그인 하기
                        </Button>
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
