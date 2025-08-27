import React, { useEffect, useState } from 'react'
import { Col, Row, Modal } from 'react-bootstrap'
import StackPage from './stack/StackPage';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserTotalData } from '../../api/userApi';
import ProjectDetailPage from '../project/ProjectDetailPage';
import useEditMode from '../../hooks/useEditMode';
import MypagePage from '../user/MypagePage';
import WorkExperiencesItem from './career/WorkExperiencesItem';
import EduHistoryItem from './career/EduHistoryItem';
import useIsMobile from '../../hooks/useIsMobile';
import { useLoading } from '../../context/LoadingContext';
import CommonHeroBanner from '../../components/common/CommonHeroBanner';
import OneLineIntroBanner from './OneLineIntroBanner';
const MainPage = () => {
    const { username } = useParams();
    const { withLoading } = useLoading();
    const navigate = useNavigate();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const [userProject, setUserProject] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { editMode } = useEditMode();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const isMobile = useIsMobile();

    const CallTotalAPI = withLoading(async () => {
        const res = await getUserTotalData(username)
        if (res.data.userID === "NONE") {
            navigate('/notfound');
            return;
        }
        setUserCareers(res.data);
        setUserID(res.data.userID);
        setUserProject(res.data.projects)
        setUserInfo(res.data.userInfo);
    });
    useEffect(() => { CallTotalAPI() }, [username])
    return (
        <div className="mt-4">
            <Row
                style={{ "--bs-gutter-x": "1.25rem", "--bs-gutter-y": "1.25rem" }} // g-3.5 느낌
            >
                {/* 1. 사진: 모바일 1번째, 데스크탑 좌상단 */}
                <Col xs={12} lg={6} className="order-1 order-lg-1">
                    {/* === 프로필 블록 시작 === */}
                    <div className="profile-wrapper text-center" style={{ position: "relative" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={userInfo.photo ? userInfo.photo : "/images/vite.svg"}
                                alt="Profile"
                                style={{
                                    width: isMobile ? 160 : 320,
                                    height: isMobile ? 160 : 320,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "1px solid #eee",
                                    display: "block",
                                }}
                            />
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={() => setShowProfileModal(true)}
                                    aria-label="프로필 설정"
                                    style={{
                                        position: "absolute",
                                        right: isMobile ? 4 : 12,
                                        bottom: isMobile ? 4 : 12,
                                        width: isMobile ? 36 : 44,
                                        height: isMobile ? 36 : 44,
                                        borderRadius: "50%",
                                        border: "1px solid rgba(0,0,0,0.1)",
                                        background: "#fff",
                                        display: "grid",
                                        placeItems: "center",
                                        boxShadow: "0 2px 6px rgba(0,0,0,.2)",
                                        cursor: "pointer",
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
                    {/* === 프로필 블록 끝 === */}
                </Col>

                {/* 2. 커리어: 모바일 2번째, 데스크탑 좌하단 */}
                <Col xs={12} lg={6} className="order-2 order-lg-3">
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
                </Col>
                {/* 3. 프로젝트: 모바일 3번째, 데스크탑 우상단 */}
                <Col xs={12} lg={6} className="order-3 order-lg-2" >
                    <CommonHeroBanner title="프로젝트" size="compact" />
                    <ProjectDetailPage projects={userProject} />
                </Col>

                {/* 4. 스택: 모바일 4번째, 데스크탑 우하단 */}
                <Col xs={12} lg={6} className="order-4 order-lg-4">
                    <div className={isMobile ? "mb-1" : "mb-3"}>
                        <CommonHeroBanner title="기술스택" size="compact" />
                    </div>
                    <StackPage
                        userID={userID}
                        username={username}
                        stack={userCareers.stacks}
                        onSuccess={() => CallTotalAPI()}
                    />
                </Col>
            </Row>
        </div>
    )
}
export default MainPage