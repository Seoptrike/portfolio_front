import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { SiNotion } from "react-icons/si"; // Notion 아이콘
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // GitHub, 외부 링크 아이콘

const ProjectDetailPage = (projects) => {

    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(prev => (prev === id ? null : id));
    const projectArray = Array.isArray(projects) ? projects : Object.values(projects);
    const flatProjects = projectArray.flat();
    return (
        <div className="project-container">
            <h2 className="ncs-title">Projects</h2>
            <Row className="g-4">
                {flatProjects.map(({ projectId, title, thumbnailUrl, notionUrl, githubUrl, deployrl, description }, index) => (
                    <Col xs={12} md={6} lg={4} key={index}>
                        <Card className="project-card text-center" onClick={() => toggle(projectId)}>
                            <div className="thumbnail-wrapper">
                                <img
                                    src={thumbnailUrl ? thumbnailUrl : '/images/seoportfolio_logo.png'} //thumbnail_url || 추가하세요
                                    alt={`${title} Thumbnail`}
                                    className="project-thumbnail"
                                    style={{
                                        width: '100%',
                                        height: '160px',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />
                                <div>{title}</div>
                            </div>
                            {openId === projectId && (
                                <div className="project-details p-3">
                                    <div className="mb-3">{description}</div>

                                    {/* ✅ 2. 기존 버튼 그룹을 아이콘 그룹으로 변경 */}
                                    <div className="d-flex justify-content-center align-items-center gap-4">
                                        {notionUrl && (
                                            <a href={notionUrl} target="_blank" rel="noopener noreferrer" title="Notion">
                                                <SiNotion size={24} color="#000" />
                                            </a>
                                        )}
                                        {githubUrl && (
                                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub">
                                                <FaGithub size={24} color="#000" />
                                            </a>
                                        )}
                                        {deployrl && (
                                            <a href={deployrl} target="_blank" rel="noopener noreferrer" title="배포 링크">
                                                <FaExternalLinkAlt size={22} color="#000" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="toggle-text">
                                {openId === projectId ? '▲ 닫기' : '▼ 자세히 보기'}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProjectDetailPage;
