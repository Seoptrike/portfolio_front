import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CareersPage from '../components/career/CareersPage'
import KosmoPage from '../components/recipes/kosmo/KosmoPage'
import NcsPage from '../components/recipes/ncs/NcsPage'
import './HomePage.css'
import StackPage from '../components/recipes/Skills/StackPage'

const HomePage = () => {
    return (
        <div className="home-container">
            <Row>
                {/* 왼쪽 사이드 */}
                <Col xs={12} md={12} xl={4} className="sidebar">
                    <div className="profile-wrapper">
                        <img src="vite.svg" alt="Profile" className="profile-image" />
                    </div>
                    <CareersPage />
                </Col>

                {/* 오른쪽 메인 */}
                <Col xs={12} md={12} xl={8}>
                    <Row className="g-4">
                        <Col xs={12}>
                            <NcsPage />
                        </Col>
                        <Col xs={12}>
                            <KosmoPage />
                        </Col>
                    </Row>
                    <Row className="tech-stack-row">
                        <Col xs={12}> 
                            <h3 className="section-title">
                                <StackPage />
                            </h3>
                            {/* 기술스택 내용은 나중에 추가 */}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage
