import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const AboutMePage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="mb-3">👋 안녕하세요, 김인섭입니다</Card.Title>
              <Card.Text>
                저는 요리사로 시작해서 개발자로 전향한 독특한 이력을 가지고 있습니다. 고객 중심의 사고, 팀워크, 그리고 문제 해결 능력을 바탕으로
                개발 역량을 쌓아가고 있습니다.
                <br /><br />
                현재는 웹 프론트엔드와 백엔드, 인공지능 프로젝트를 병행하며 풀스택 개발자로 성장 중입니다.
              </Card.Text>
              <Button variant="primary" href="/" target="_blank">
                이력서 보기
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutMePage
