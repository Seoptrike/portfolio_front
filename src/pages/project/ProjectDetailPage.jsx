// ProjectDetailPage.jsx
import React, { useMemo } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProjectCard from "./projectcard/ProjectCard";

const ProjectDetailPage = ({
    projects = [],
    editMode = false,
    makeUpdate = () => () => { },
    makeDelete = () => () => { },
    isMobile = false,
}) => {
    // 배열/객체 혼용 안전 처리
    const flat = useMemo(() => {
        const arr = Array.isArray(projects) ? projects : Object.values(projects);
        return arr.flat ? arr.flat() : arr;
    }, [projects]);

    const MAX_PER_VIEW = 3;               // 가장 넓은 구간에서 보여줄 카드 수
    const canLoop = flat.length > MAX_PER_VIEW;

    return (
        <Box
            sx={{
                position: "relative",
                mx: "auto",
                width: "100%",
                px: { xs: 0, sm: 1.5, md: 0 },
                overflow: "hidden",
                background: "transparent",
                "& .swiper": { 
                    width: "100%",
                    backgroundColor: "transparent",
                    background: "transparent"
                },
                "& .swiper-wrapper": { 
                    alignItems: "stretch",
                    backgroundColor: "transparent",
                    background: "transparent"
                },
                "& .swiper-slide": { 
                    height: "auto", 
                    minWidth: 0,
                    backgroundColor: "transparent",
                    background: "transparent"
                },
                "& .swiper-container": {
                    backgroundColor: "transparent",
                    background: "transparent"
                }
            }}
        >
            <Swiper
                modules={[Navigation, Autoplay]}
                loop={canLoop}
                rewind={!canLoop}
                autoplay={canLoop ? { delay: 3000, disableOnInteraction: false } : false}
                speed={550}
                grabCursor
                // 기본값은 오프셋 0
                slidesOffsetBefore={0}
                slidesOffsetAfter={0}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 10, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                    600: { slidesPerView: 1, spaceBetween: 10, slidesOffsetBefore: 8, slidesOffsetAfter: 8 },  // 모바일만 살짝 안쪽
                    900: { slidesPerView: 2, spaceBetween: 12, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                    1200: { slidesPerView: 3, spaceBetween: 12, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },  // ✅ 데스크탑은 완전 풀폭
                }}
                navigation={{ prevEl: ".proj-prev", nextEl: ".proj-next" }}
                style={{ paddingBottom: 8 }}
            >
                {flat.map((p) => (
                    <SwiperSlide key={p.projectId} style={{ height: "auto" }}>
                        <Box sx={{ height: "100%" }}>
                            <ProjectCard
                                project={p}
                                editMode={editMode}
                                onUpdate={makeUpdate(p.projectId)}
                                onDelete={makeDelete(p.projectId)}
                                isMobile={isMobile}
                            />
                        </Box>
                    </SwiperSlide>
                ))}

                {/* 네비 버튼 - 투명하게 숨김 */}
                <IconButton
                    className="proj-prev"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: 6,
                        zIndex: 2,
                        transform: "translateY(-50%)",
                        opacity: 0,
                        pointerEvents: "none"
                    }}
                    size="small"
                >
                    <ArrowBackIosNew fontSize="small" />
                </IconButton>

                <IconButton
                    className="proj-next"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 6,
                        zIndex: 2,
                        transform: "translateY(-50%)",
                        opacity: 0,
                        pointerEvents: "none"
                    }}
                    size="small"
                >
                    <ArrowForwardIos fontSize="small" />
                </IconButton>
            </Swiper>
        </Box>
    );
};

export default ProjectDetailPage;
