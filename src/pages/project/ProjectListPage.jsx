import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getUserProject } from '../../api/projectApi';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getUserProject(username); // ✅ 응답 기다림
                console.log(res.data);                      // ✅ 이때는 값 있음
                setProjects(res.data ?? []);                // ✅ 방어 코드
            } catch (err) {
                console.error("프로젝트 불러오기 실패", err);
                setProjects([]);                            // ✅ 에러 시 빈 배열
            }
        };

        fetchProjects();
    }, [username]);
    return (
        <div style={{ padding: '1rem' }}>
            <Row className="align-items-center mb-3">
                {/* 왼쪽: 제목 */}
                <Col>
                    <h2 className="mb-0">프로젝트 목록</h2>
                </Col>
                {/* 오른쪽: 등록 버튼 */}
                {isHost &&
                    <Col className="text-end">
                        <Link to={`/project/insert/${username}`}>
                            <Button variant="primary">등록하러가기</Button>
                        </Link>
                    </Col>
                }
            </Row>
            {projects.map(project => (
                <Card key={project.project_id} className="mb-4">
                    <Card.Body>
                        <Row>
                            {/* 왼쪽 썸네일 */}
                            <Col md={3} className="d-flex align-items-center justify-content-center">
                                {project.thumbnail_url ? (
                                    <img
                                        src={project.thumbnail_url}
                                        alt="thumbnail"
                                        style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '120px', backgroundColor: '#eee', borderRadius: '8px' }} />
                                )}
                            </Col>

                            {/* 오른쪽 정보 */}
                            <Col md={9}>
                                <Row className="align-items-center mb-2">
                                    {/* 제목 왼쪽 정렬 */}
                                    <Col>
                                        <h5 className="mb-0">{project.title}</h5>
                                    </Col>
                                    {/* 수정/삭제 버튼 오른쪽 정렬 */}
                                    {isHost &&
                                        <Col className="text-end">
                                            <Button variant="outline-primary" size="sm" className="me-2">
                                                수정
                                            </Button>
                                            <Button variant="outline-danger" size="sm">
                                                삭제
                                            </Button>
                                        </Col>
                                    }
                                </Row>
                                <p>{project.description}</p>
                                <p>기간: {project.start_date} ~ {project.end_date}</p>

                                {/* 기술스택 */}
                                <div className="d-flex flex-wrap align-items-center gap-2">
                                    <strong style={{ marginRight: '8px' }}>기술스택:</strong>
                                    {project.stack_names && project.stack_names.map((stack, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                border: '1px solid #aaa',
                                                borderRadius: '8px',
                                                padding: '0.2rem 0.6rem',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {stack}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};
export default ProjectListPage