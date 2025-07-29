import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getAllStack } from '../../api/techStackApi';
import { insertProject } from '../../api/projectApi';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectInsertPage = () => {
  const { username } = useParams(); // username 파라미터
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

  const navigate = useNavigate();

  const [stackList, setStackList] = useState([]);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const category= "";
        const res = await getAllStack(category);
        console.log(res.data);
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
      await insertProject(form);
      alert('프로젝트 등록 완료!');
      navigate(`/project/${username}`)
    } catch (err) {
      console.error('등록 실패:', err);
      alert('등록 실패');
    }
  };
  console.log(form);
  return (
    <Container className="mt-4">
      <h2>프로젝트 등록</h2>
      <Form onSubmit={handleSubmit}>
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
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default ProjectInsertPage;
