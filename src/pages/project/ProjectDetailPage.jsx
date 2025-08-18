import React, { useState } from 'react';
import {
    Card, CardActionArea, CardContent, CardActions,
    IconButton, Typography, Box
} from '@mui/material';
import { SiNotion } from "react-icons/si";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';

// ✅ Swiper로 교체
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectDetailPage = (projects) => {
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(prev => (prev === id ? null : id));
    const projectArray = Array.isArray(projects) ? projects : Object.values(projects);
    const flatProjects = projectArray.flat();
    const MAX_PER_VIEW = 3; // breakpoints에서 최댓값
    const canLoop = flatProjects.length > MAX_PER_VIEW; // 최소 4장 필요

    return (
        <div className="project-container">
            <CommonHeroBanner title="프로젝트" size="compact" />
            <Swiper
                modules={[Navigation, Autoplay]}
                // 🔁 무한 루프
                loop={canLoop}
                rewind={!canLoop}
                // ⏱ 자동 재생 (원하면 끄기 가능)
                autoplay={canLoop ? { delay: 3000, disableOnInteraction: false } : false}
                // UX
                speed={550}
                grabCursor={true}
                // 레이아웃
                spaceBetween={-1}
                slidesPerView={1}
                breakpoints={{
                    576: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                }}

            // style={{ paddingBottom:  }}
            >
                {flatProjects.map(({ projectId, title, thumbnailUrl, notionUrl, githubUrl, deployUrl, description }) => (
                    <SwiperSlide key={projectId}>
                        <Box sx={{ px: 1.2 }}>
                            <Card
                                onClick={() => toggle(projectId)}
                                sx={{
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                    transition: 'transform .22s ease, box-shadow .22s ease',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' },
                                    cursor: 'pointer',
                                }}
                            >
                                <CardActionArea sx={{ position: 'relative' }}>
                                    <Box
                                        component="img"
                                        src={thumbnailUrl || '/images/seoportfolio_logo.png'}
                                        alt={`${title} Thumbnail`}
                                        sx={{ width: '100%', height: { xs: 180, sm: 200, md: 220 }, objectFit: 'cover', display: 'block' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 45%, rgba(0,0,0,0.55) 100%)',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            p: 2,
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                            {title}
                                        </Typography>
                                    </Box>
                                </CardActionArea>

                                {openId === projectId && (
                                    <CardContent sx={{ pt: 2, pb: 1.5 }} onClick={(e) => e.stopPropagation()}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                                            {description}
                                        </Typography>
                                    </CardContent>
                                )}

                                <CardActions
                                    sx={{
                                        px: 2, py: 1.2, display: 'flex', justifyContent: 'space-between',
                                        borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
                                    }}
                                >
                                    <Box onClick={(e) => e.stopPropagation()} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {notionUrl && (
                                            <IconButton component="a" href={notionUrl} target="_blank" rel="noopener noreferrer" size="small" title="Notion">
                                                <SiNotion size={20} />
                                            </IconButton>
                                        )}
                                        {githubUrl && (
                                            <IconButton component="a" href={githubUrl} target="_blank" rel="noopener noreferrer" size="small" title="GitHub">
                                                <FaGithub size={20} />
                                            </IconButton>
                                        )}
                                        {deployUrl && (
                                            <IconButton component="a" href={deployUrl} target="_blank" rel="noopener noreferrer" size="small" title="배포 링크">
                                                <FaExternalLinkAlt size={18} />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Typography variant="caption" sx={{ color: 'text.secondary', userSelect: 'none' }}>
                                        {openId === projectId ? '▲ 닫기' : '▼ 열기'}
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Box>
                    </SwiperSlide>
                ))}
                <IconButton className="custom-prev" sx={{ position: 'absolute', top: '50%', left: 10, zIndex: 10 }}>
                    <ArrowBackIosNew />
                </IconButton>
                <IconButton className="custom-next" sx={{ position: 'absolute', top: '50%', right: 10, zIndex: 10 }}>
                    <ArrowForwardIos />
                </IconButton>
            </Swiper>
        </div>
    );
};

export default ProjectDetailPage;
