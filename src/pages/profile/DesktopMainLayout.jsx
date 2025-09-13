import React from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import StackPage from './stack/StackPage';
import ProjectDetailPage from '../project/ProjectDetailPage';
import MypagePage from '../user/MypagePage';
import WorkExperiencesItem from './career/WorkExperiencesItem';
import EduHistoryItem from './career/EduHistoryItem';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';
import OneLineIntroBanner from './OneLineIntroBanner';

const DesktopMainLayout = ({ 
    userID, 
    username, 
    userCareers, 
    userProject, 
    userInfo, 
    editMode, 
    showProfileModal, 
    setShowProfileModal, 
    CallTotalAPI 
}) => {
    return (
        <div className="mt-4">
            <Row className="g-4">
                {/* 좌측 Column: 썸네일 + 커리어 */}
                <Col xs={12} lg={6} className="d-flex flex-column">
                    {/* 썸네일 */}
                    <div className="profile-wrapper text-center mb-4" style={{ 
                        position: "relative",
                        filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))"
                    }}>
                        <div style={{ 
                            position: "relative", 
                            display: "inline-block",
                            transform: "translateZ(20px)" 
                        }}>
                            <img
                                src={userInfo.photo ? userInfo.photo : "/images/vite.svg"}
                                alt="Profile"
                                style={{
                                    width: 320,
                                    height: 320,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(0,0,0,0.2)", // 희미한 회색 테두리
                                    display: "block",
                                    boxShadow: `
                                        0 16px 48px rgba(0,0,0,0.15),
                                        inset 0 4px 8px rgba(255,255,255,0.9),
                                        inset 0 -4px 8px rgba(0,0,0,0.1)
                                    `, // 3D 그림자
                                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "translateY(-8px) rotateX(5deg) rotateY(5deg)";
                                    e.target.style.boxShadow = `
                                        0 24px 60px rgba(0,0,0,0.2),
                                        inset 0 4px 8px rgba(255,255,255,0.9),
                                        inset 0 -4px 8px rgba(0,0,0,0.1)
                                    `;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "translateY(0) rotateX(0) rotateY(0)";
                                    e.target.style.boxShadow = `
                                        0 16px 48px rgba(0,0,0,0.15),
                                        inset 0 4px 8px rgba(255,255,255,0.9),
                                        inset 0 -4px 8px rgba(0,0,0,0.1)
                                    `;
                                }}
                            />
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={() => setShowProfileModal(true)}
                                    aria-label="프로필 설정"
                                    style={{
                                        position: "absolute",
                                        right: 12,
                                        bottom: 12,
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",
                                        border: "1px solid rgba(0,0,0,0.2)", // 희미한 회색 테두리
                                        background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                                        display: "grid",
                                        placeItems: "center",
                                        boxShadow: `
                                            0 6px 18px rgba(0,0,0,0.15),
                                            inset 0 2px 4px rgba(255,255,255,0.9),
                                            inset 0 -2px 4px rgba(0,0,0,0.1)
                                        `, // 3D 버튼 효과
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        transform: "translateZ(30px)"
                                    }}
                                >
                                    <span style={{ fontSize: 20, lineHeight: 1 }}>⚙️</span>
                                </button>
                            )}
                        </div>

                        <Modal
                            show={showProfileModal}
                            onHide={() => setShowProfileModal(false)}
                            size="lg"
                            centered
                            backdrop="static"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>프로필 설정</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ padding: 0 }}>
                                <MypagePage setShowProfileModal />
                            </Modal.Body>
                        </Modal>
                    </div>

                    {/* 커리어 */}
                    <div>
                        <EduHistoryItem
                            userID={userID}
                            username={username}
                            data={userCareers.educationHistory}
                            onSuccess={() => CallTotalAPI()}
                        />
                        <WorkExperiencesItem
                            userID={userID}
                            username={username}
                            data={userCareers.workExperience}
                            onSuccess={() => CallTotalAPI()}
                        />
                    </div>
                </Col>

                {/* 우측 Column: 한줄소개 + 프로젝트 + 기술스택 */}
                <Col xs={12} lg={6} className="d-flex flex-column">
                    {/* 한줄소개 */}
                    <div className="mb-4">
                        <OneLineIntroBanner
                            userID={userID}
                            username={username}
                            userInfo={userInfo}
                            onSuccess={() => CallTotalAPI()}
                        />
                    </div>

                    {/* 프로젝트 */}
                    <div className="mb-4">
                        <CommonHeroBanner title="프로젝트" icon="🚀" size="compact" />
                        <ProjectDetailPage projects={userProject} />
                    </div>

                    {/* 기술스택 */}
                    <div>
                        <div className="mb-3">
                            <CommonHeroBanner title="기술스택" icon="⚡" size="compact" />
                        </div>
                        <StackPage
                            userID={userID}
                            username={username}
                            stack={userCareers.stacks}
                            onSuccess={() => CallTotalAPI()}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DesktopMainLayout;