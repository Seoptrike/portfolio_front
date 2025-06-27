import React from 'react'
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap'

const GuestBookPage = () => {
    return (
        <Container className="my-5">
            <Card className="mb-4 shadow-sm">
                <Card.Header>📝 작성된 메시지</Card.Header>
                <ListGroup variant="flush">
                    {/* 메시지 리스트 영역 – 동적으로 채워주세요 */}
                    <ListGroup.Item>
                        <strong>홍길동</strong> <small className="text-muted">(2025-06-27 15:00)</small>
                        <br />
                        좋은 하루 되세요!
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>이몽룡</strong> <small className="text-muted">(2025-06-26 13:20)</small>
                        <br />
                        멋진 웹사이트네요 👏
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            <Card className="p-4 shadow-sm">
                <h3 className="mb-4">📖 방명록</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <div>
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="당신의 이름"
                            name="guestName"
                        />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>메시지</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="응원의 한마디를 남겨주세요!"
                            name="message"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        남기기
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default GuestBookPage
