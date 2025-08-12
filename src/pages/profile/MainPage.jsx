import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import StackPage from './stack/StackPage';
import './MainPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import WorkExperiencesPage from './career/WorkExperiencesPage';
import EduHistoryPage from './career/EduHistoryPage';
import { getUserTotalData } from '../../api/userApi';
import ProjectDetailPage from '../project/ProjectDetailPage';

const MainPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const [userProject, setUserProject] = useState({});
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
    }
    useEffect(() => { CallTotalAPI() }, [username])

    return (
        <div className="home-container">
            <Row className="gx-4 gy-5">
                {/* 왼쪽 사이드 */}
                <Col xs={12} lg={4} className="sidebar">
                    <div className="profile-wrapper text-center">
                        <img src="/images/vite.svg" alt="Profile" className="profile-image" />
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