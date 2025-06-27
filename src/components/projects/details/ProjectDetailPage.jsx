import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const projectData = {
  wine: {
    title: '와인 추천 앱',
    period: '2024.03 - 2024.05',
    stack: 'React, Flask, Android, Python, Scikit-learn',
    description: `사용자 평점 데이터를 기반으로 기계학습 알고리즘을 활용한 추천 기능 구현.
Android 앱과 Flask 서버 연동 및 Vercel과 Firebase를 활용한 배포까지 전반적인 개발을 주도함.`,
  },
  shopping: {
    title: '쇼핑몰 + 인스타그램 프로젝트',
    period: '2024.01 - 2024.03',
    stack: 'Spring, React, MySQL',
    description: `상품 등록, 구매 기능과 함께 인스타그램 피드 스타일의 SNS 기능을 통합 구현.
Spring Security, JPA, Axios 기반 비동기 처리와 반응형 웹 구현 경험.`,
  },
}

const ProjectDetailPage = () => {
  const { id } = useParams()
  const project = projectData[id]

  if (!project) return <div>존재하지 않는 프로젝트입니다.</div>

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <h3>{project.title}</h3>
        <p className="text-muted">{project.period}</p>
        <p><strong>기술 스택:</strong> {project.stack}</p>
        <hr />
        <p style={{ whiteSpace: 'pre-line' }}>{project.description}</p>
      </Card>
    </Container>
  )
}

export default ProjectDetailPage
