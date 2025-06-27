import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const projectList = [
  {
    id: 'wine',
    title: '와인 추천 앱',
    period: '2024.03 - 2024.05',
    techStack: ['React', 'Flask', 'Python', 'Android'],
    summary: '기계학습을 이용해 사용자 취향에 맞는 와인을 추천하는 모바일 앱을 개발했습니다.',
  },
  {
    id: 'shopping',
    title: '쇼핑몰 + 인스타그램 프로젝트',
    period: '2024.01 - 2024.03',
    techStack: ['Spring', 'React', 'MySQL'],
    summary: '쇼핑몰 기능과 피드 시스템을 결합한 웹 플랫폼을 구현했습니다.',
  },
]

const ProjectsPage = () => {
  const navigate = useNavigate()

  return (
    <Container className="my-5">
      <h2 className="mb-4">🧑‍💻 프로젝트 목록</h2>
      <Row>
        {projectList.map((project) => (
          <Col md={12} className="mb-4" key={project.id}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{project.period}</Card.Subtitle>
                <Card.Text>{project.summary}</Card.Text>
                <div className="mb-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="badge bg-secondary me-1">{tech}</span>
                  ))}
                </div>
                <Button variant="primary" onClick={() => navigate(`/projects/${project.id}`)}>
                  상세 보기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProjectsPage
