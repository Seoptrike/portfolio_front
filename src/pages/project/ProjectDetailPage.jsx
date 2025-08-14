import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { SiNotion } from "react-icons/si"; // Notion 아이콘
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // GitHub, 외부 링크 아이콘
import Slider from "react-slick";
import CommonHeroBanner from '../../components/common/CommonHeroBanner';

const ProjectDetailPage = (projects) => {

    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(prev => (prev === id ? null : id));
    const projectArray = Array.isArray(projects) ? projects : Object.values(projects);
    const flatProjects = projectArray.flat();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="project-container">
            <CommonHeroBanner title="프로젝트" size="compact"/>
            <Slider
                {...{
                    dots: true,
                    arrows: true,
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [
                        { breakpoint: 992, settings: { slidesToShow: 2 } }, // md
                        { breakpoint: 576, settings: { slidesToShow: 1 } }, // xs
                    ],
                }}
            >
                {flatProjects.map(({ projectId, title, thumbnailUrl, notionUrl, githubUrl, deployUrl, description }) => (
                    <div key={projectId} className="px-2"> {/* 슬라이드 간 좌우 여백 */}
                        <Card className="project-card text-center" onClick={() => toggle(projectId)}>
                            <div className="thumbnail-wrapper">
                                <img
                                    src={thumbnailUrl || '/images/seoportfolio_logo.png'}
                                    alt={`${title} Thumbnail`}
                                    className="project-thumbnail"
                                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10 }}
                                />
                                <div>{title}</div>
                            </div>

                            {openId === projectId && (
                                <div className="project-details p-3">
                                    <div className="mb-3">{description}</div>
                                    <div className="d-flex justify-content-center align-items-center gap-4">
                                        {notionUrl && (
                                            <a href={notionUrl} target="_blank" rel="noopener noreferrer" title="Notion" onClick={(e) => e.stopPropagation()}>
                                                <SiNotion size={24} />
                                            </a>
                                        )}
                                        {githubUrl && (
                                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" onClick={(e) => e.stopPropagation()}>
                                                <FaGithub size={24} />
                                            </a>
                                        )}
                                        {deployUrl && (
                                            <a href={deployUrl} target="_blank" rel="noopener noreferrer" title="배포 링크" onClick={(e) => e.stopPropagation()}>
                                                <FaExternalLinkAlt size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="toggle-text">
                                {openId === projectId ? '▲ 닫기' : '▼ 자세히 보기'}
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div >
    );
};

export default ProjectDetailPage;
