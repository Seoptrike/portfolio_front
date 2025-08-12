import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getUserProject } from '../../api/projectApi';
import { Card, Row, Col, Button, Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const { username } = useParams();
    const { isHost } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const res = await getUserProject(username); // ✅ 응답 기다림
            console.log(res.data);                      // ✅ 이때는 값 있음
            setProjects(res.data ?? []);                // ✅ 방어 코드
        } catch (err) {
            navigate("/notfound");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [username]);

    const handleUpdateBtnClick = (project_id) => () => {
        navigate(`/project/update/${username}/${project_id}`);
    }

    const handleDeleteBtnClick = (projectId) => async () => {
        if (!window.confirm('정말 삭제할까요?')) return;
        try {
            await deleteProject(projectId);
            await fetchProjects();
            alert("삭제 완료!")
        } catch (e) {
            console.error(e);
            alert('삭제 실패');
        }
    }
    return (
        <Container className="py-4">
            <div style={{ padding: '1rem' }}>
                <Row className="align-items-center mb-3">
                    <Col xs={12} md>
                        <h2 className="mb-2">🧑‍💻 프로젝트 목록</h2>
                    </Col>
                    {isHost &&
                        // 모바일에서 버튼 정렬 및 간격 조정
                        <Col xs={12} md="auto" className="text-md-end mt-2 mt-md-0">
                            <Link to={`/project/insert/${username}`}>
                                <Button variant="primary">등록하러가기</Button>
                            </Link>
                        </Col>
                    }
                </Row>

                {projects && projects.length > 0 ? (
                    projects.map(project => (
                        <Card key={project.projectId} className="mb-4 shadow-sm">
                            <Card.Body>
                                <Row>
                                    {/* 썸네일: 모바일에선 상단에, 데스크톱에선 왼쪽에 위치 */}
                                    <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0 d-flex align-items-center justify-content-center">
                                        {project.thumbnailUrl ? (
                                            <img
                                                src={project.thumbnailUrl}
                                                alt="thumbnail"
                                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '150px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }} />
                                        )}
                                    </Col>

                                    {/* 정보: 모바일에선 하단에, 데스크톱에선 오른쪽에 위치 */}
                                    <Col xs={12} md={8} lg={9}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="mb-0">{project.title}</h5>
                                            {isHost &&
                                                <div className="ms-2 flex-shrink-0">
                                                    <Button variant="outline-secondary" size="sm" className="me-2" onClick={handleUpdateBtnClick(project.projectId)}>
                                                        수정
                                                    </Button>
                                                    <Button variant="outline-danger" size="sm" onClick={handleDeleteBtnClick(project.projectId)}>
                                                        삭제
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{project.description}</p>
                                        <Stack gap={3}>
                                            <div className="small"><strong>기간:</strong> {project.startDate} ~ {project.endDate}</div>
                                            <div className="d-flex flex-wrap align-items-center gap-2">
                                                <strong className="small">기술스택:</strong>
                                                {Array.isArray(project.stackNames) && project.stackNames.map((stack) => (
                                                    <span key={stack.stackId} className="badge bg-light text-dark border">
                                                        {stack.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                {project.notion_url && (
                                                    <a href={project.notionUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                                                        Notion
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.deploy_url && (
                                                    <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-sm">
                                                        배포 링크
                                                    </a>
                                                )}
                                            </div>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    // '프로젝트 없음'을 표시하는 카드 디자인
                    <Card className="text-center shadow-sm">
                        <Card.Body style={{ padding: '3rem' }}>
                            <h4 className="text-muted">🗂️</h4>
                            <Card.Text className="text-muted mt-2">
                                아직 등록된 프로젝트가 없습니다.
                            </Card.Text>
                            {isHost && (
                                <Link to={`/project/insert/${username}`}>
                                    <Button variant="primary" className="mt-3">
                                        첫 프로젝트 등록하기
                                    </Button>
                                </Link>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </div>
        </Container>
    );
};
export default ProjectListPage