import React, { useEffect, useState } from 'react'
import { Col, Row, Modal } from 'react-bootstrap'
import StackPage from './stack/StackPage';
import './MainPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import WorkExperiencesPage from './career/WorkExperiencesPage';
import EduHistoryPage from './career/EduHistoryPage';
import { getUserTotalData } from '../../api/userApi';
import ProjectDetailPage from '../project/ProjectDetailPage';
import useEditMode from '../../hooks/useEditMode';
import MypagePage from '../user/MypagePage';

const MainPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const [userProject, setUserProject] = useState({});
    const [userInfo, setUserInfo] = useState({});

    const { editMode } = useEditMode();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const CallTotalAPI = async () => {
        const res = await getUserTotalData(username)
        if (res.data.userID === "NONE") {
            navigate('/notfound');
            return;
        }
        console.log(res.data);
        setUserCareers(res.data);
        setUserID(res.data.userID);
        setUserProject(res.data.projects)
        setUserInfo(res.data.userInfo);
    }
    useEffect(() => { CallTotalAPI() }, [username])

    return (
        <div className="home-container">
            <Row className="gx-4 gy-5">
                {/* 왼쪽 사이드 */}
                <Col xs={12} lg={4} className="sidebar">

                    <div className="profile-wrapper text-center" style={{ position: "relative" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={userInfo.photo ? userInfo.photo : "/images/vite.svg"}
                                alt="Profile"
                                style={{
                                    width: 160,
                                    height: 160,
                                    objectFit: "cover",
                                    borderRadius: "50%",         // ✅ 동그랗게
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
                                        right: 8,
                                        bottom: 8,
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",        // ✅ 동그란 버튼
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

                        {/* 모달 */}
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
                                <MypagePage />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <EduHistoryPage
                        userID={userID}
                        username={username}
                        EduHis={userCareers.educationHistory}
                        onSuccess={() => CallTotalAPI()}
                    />
                    <WorkExperiencesPage
                        userID={userID}
                        username={username}
                        workExp={userCareers.workExperience}
                        onSuccess={() => CallTotalAPI()}
                    />
                </Col>

                {/* 오른쪽 메인 */}
                <Col xs={12} lg={8}>
                    <Row className="g-4">
                        <Col xs={12}>
                            <ProjectDetailPage
                                projects={userProject}
                            />
                        </Col>
                        <Col xs={12}>
                            <StackPage
                                userID={userID}
                                username={username}
                                stack={userCareers.stacks}
                                onSuccess={() => CallTotalAPI()}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default MainPage