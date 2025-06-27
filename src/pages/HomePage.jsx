import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CareersPage from '../components/career/CareersPage'
import KosmoPage from '../components/recipes/kosmo/KosmoPage'
import NcsPage from '../components/recipes/ncs/NcsPage'
import StackPage from '../components/recipes/Skills/StackPage'
import './HomePage.css'



const HomePage = () => {
  return (
    <div className="home-container">
      <Row className="gx-4 gy-5">
        {/* 왼쪽 사이드 */}
        <Col xs={12} lg={4} className="sidebar">
          <div className="profile-wrapper text-center">
            <img src="vite.svg" alt="Profile" className="profile-image" />
          </div>
          <CareersPage />
        </Col>

        {/* 오른쪽 메인 */}
        <Col xs={12} lg={8}>
          <Row className="g-4">
            <Col xs={12}>
              <NcsPage />
            </Col>
            <Col xs={12}>
              <KosmoPage />
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

export default HomePage
