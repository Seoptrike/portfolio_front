import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import NcsPage from '../recipes/ncs/NcsPage';
import StackPage from '../recipes/Skills/StackPage';
import CareersPage from '../career/CareersPage';
import './MainPage.css'
import { getUserTotalData } from '../../api/userApi';
import { useParams } from 'react-router-dom';
import WorkExperiencesPage from '../career/WorkExperiencesPage';

const MainPage = () => {
    const { username } = useParams();
    const [userCareers, setUserCareers] = useState({});
    const [userID, setUserID] = useState();
    const CallTotalAPI = async () => {
        const res = await getUserTotalData(username)
        setUserCareers(res.data);
        setUserID(res.data.userID);
        console.log(res.data.userID);
        console.log("isArray:", Array.isArray(res.data.workExperience));
    }

    useEffect(() => { CallTotalAPI() }, [username])
    console.log('현재 접속 유저:', username); // 디버깅용

    //통합정보API

    return (
        <div className="home-container">
            <Row className="gx-4 gy-5">
                {/* 왼쪽 사이드 */}
                <Col xs={12} lg={4} className="sidebar">
                    <div className="profile-wrapper text-center">
                        <img src="vite.svg" alt="Profile" className="profile-image" />
                    </div>
                    <CareersPage onSuccess={() => CallTotalAPI()} />
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
                            <NcsPage />
                        </Col>
                        <Col xs={12}>
                            <h3 className="section-title">
                                <StackPage />
                            </h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default MainPage