import React from 'react';
import { Modal } from 'react-bootstrap';
import StackPage from './stack/StackPage';
import ProjectDetailPage from '../project/ProjectDetailPage';
import MypagePage from '../user/MypagePage';
import WorkExperiencesItem from './career/WorkExperiencesItem';
import EduHistoryItem from './career/EduHistoryItem';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';
import OneLineIntroBanner from './OneLineIntroBanner';

const MobileMainLayout = ({ 
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
        <div className="mt-4 d-flex flex-column" style={{ gap: "1.25rem" }}>
            {/* 1. 한줄소개 */}
            <div className="mb-4">
                <OneLineIntroBanner
                    userID={userID}
                    username={username}
                    userInfo={userInfo}
                    onSuccess={() => CallTotalAPI()}
                />
            </div>

            {/* 2. 프로필 사진 */}
            <div className="profile-wrapper text-center" style={{ 
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
                            width: 160,
                            height: 160,
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "1px solid rgba(0,0,0,0.2)", // 희미한 회색 테두리
                            display: "block",
                            boxShadow: `
                                0 12px 40px rgba(0,0,0,0.15),
                                inset 0 2px 4px rgba(255,255,255,0.9),
                                inset 0 -2px 4px rgba(0,0,0,0.1)
                            `, // 3D 그림자
                            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-5px) rotateX(5deg) rotateY(5deg)";
                            e.target.style.boxShadow = `
                                0 16px 50px rgba(0,0,0,0.2),
                                inset 0 2px 4px rgba(255,255,255,0.9),
                                inset 0 -2px 4px rgba(0,0,0,0.1)
                            `;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0) rotateX(0) rotateY(0)";
                            e.target.style.boxShadow = `
                                0 12px 40px rgba(0,0,0,0.15),
                                inset 0 2px 4px rgba(255,255,255,0.9),
                                inset 0 -2px 4px rgba(0,0,0,0.1)
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
                                right: 4,
                                bottom: 4,
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                border: "1px solid rgba(0,0,0,0.2)", // 희미한 회색 테두리
                                background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                                display: "grid",
                                placeItems: "center",
                                boxShadow: `
                                    0 4px 12px rgba(0,0,0,0.15),
                                    inset 0 1px 2px rgba(255,255,255,0.9),
                                    inset 0 -1px 2px rgba(0,0,0,0.1)
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

            {/* 3. 커리어 */}
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

            {/* 4. 프로젝트 */}
            <div>
                <CommonHeroBanner title="프로젝트" size="compact" />
                <ProjectDetailPage projects={userProject} />
            </div>

            {/* 5. 기술스택 */}
            <div>
                <div className="mb-1">
                    <CommonHeroBanner title="기술스택" size="compact" />
                </div>
                <StackPage
                    userID={userID}
                    username={username}
                    stack={userCareers.stacks}
                    onSuccess={() => CallTotalAPI()}
                />
            </div>
        </div>
    );
};

export default MobileMainLayout;