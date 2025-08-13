import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { searchUsername } from "../../api/userApi";
import { Link } from "react-router-dom";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await searchUsername(query);
        console.log("검색어:", query);
        setResults(res.data)
    };
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    {/* 검색 영역 */}
                    <Card className="my-4 w-100">
                        <Card.Body>
                            <Form onSubmit={handleSearch} className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder="검색할 사용자명을 입력하세요"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button variant="primary" type="submit" className="ms-2">
                                    검색
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* 결과 영역 */}
            <Row>
                {results.length > 0 ? (
                    results.map((user, idx) => (
                        <Col md={6} key={idx} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>@{user.username}</Card.Title>
                                    <Card.Text>{user.name}</Card.Text>
                                    <Link to={`/${user.username}`}>
                                        프로필 보기
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-muted">검색 결과가 없습니다.</p>
                )}
            </Row>
        </Container>
    )
}

export default SearchPage