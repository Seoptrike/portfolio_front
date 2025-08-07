import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getAllStack } from '../../api/techStackApi';
import { getProject, updateProject } from '../../api/projectApi';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectUpdatePage = () => {
    const { username, projectId } = useParams();
    const [form, setForm] = useState({
        username: username,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        githubUrl: '',
        deployUrl: '',
        notionUrl: '',
        thumbnailUrl: '',
        stackIds: []
    });

    const [stackList, setStackList] = useState([]);
    const navigate = useNavigate();

    // 1. 기존 프로젝트 정보 불러오기
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await getProject(projectId);
                const data = res.data.project;
                const stack_data = res.data.stacks
                console.log(res.data);
                setForm({
                    username: username,
                    title: data.title || '',
                    description: data.description || '',
                    startDate: data.start_date || '',
                    endDate: data.end_date || '',
                    githubUrl: data.github_url || '',
                    deployUrl: data.deploy_url || '',
                    notionUrl: data.notion_url || '',
                    thumbnailUrl: data.thumbnail_url || '',
                    stackIds: stack_data ? stack_data.map(s => s.stack_id) : []
                });
            } catch (err) {
                console.error('프로젝트 불러오기 실패:', err);
            }
        };

        fetchProject();
    }, [projectId, username]);

    // 2. 스택 목록 불러오기
    useEffect(() => {
        const fetchStack = async () => {
            try {
                const res = await getAllStack("");
                setStackList(res.data);
            } catch (err) {
                console.error("스택 불러오기 실패:", err);
            }
        };
        fetchStack();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleStackChange = (id) => {
        setForm(prev => ({
            ...prev,
            stackIds: prev.stackIds.includes(id)
                ? prev.stackIds.filter(sid => sid !== id)
                : [...prev.stackIds, id]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProject(projectId, form);
            alert('수정 완료!');
            navigate(`/project/${username}`);
        } catch (err) {
            console.error('수정 실패:', err);
            alert('수정 실패');
        }
    };

    return (
        <Container className="mt-4">
            <h2>프로젝트 수정</h2>
            <Form onSubmit={handleSubmit}>
                {/* 동일한 폼 구조 - 제목, 설명, 날짜, URL, 스택 */}
                {/* 생략 없이 InsertPage와 동일하게 작성 */}
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>설명</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3} value={form.description} onChange={handleChange} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>시작일</Form.Label>
                            <Form.Control type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>종료일</Form.Label>
                            <Form.Control type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>GitHub URL</Form.Label>
                    <Form.Control name="githubUrl" value={form.githubUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>배포 URL</Form.Label>
                    <Form.Control name="deployUrl" value={form.deployUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Notion URL</Form.Label>
                    <Form.Control name="notionUrl" value={form.notionUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>썸네일 이미지 URL</Form.Label>
                    <Form.Control name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>기술 스택</Form.Label>
                    <div className="d-flex flex-wrap gap-3 mt-2">
                        {stackList.map(stack => (
                            <Form.Check
                                key={stack.stack_id}
                                type="checkbox"
                                id={`stack-${stack.stack_id}`}
                                label={stack.name}
                                checked={form.stackIds.includes(stack.stack_id)}
                                onChange={() => handleStackChange(stack.stack_id)}
                            />
                        ))}
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                    수정
                </Button>
            </Form>
        </Container>
    );
};

export default ProjectUpdatePage;
