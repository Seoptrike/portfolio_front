// src/pages/project/ProjectUpsertPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStack } from '../../api/techStackApi';
import { insertProject, updateProject, getProjectById } from '../../api/projectApi';

const toDateInput = (v) => (v ? String(v).slice(0, 10) : '');

export default function ProjectUpsertPage() {
  const { username, projectId } = useParams();
  const isEdit = useMemo(() => Boolean(projectId), [projectId]);
  const navigate = useNavigate();

  const [stackList, setStackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const stacksP = getAllStack('');
        if (isEdit) {
          const [stacksRes, projectRes] = await Promise.all([stacksP, getProjectById(projectId)]);
          setStackList(stacksRes.data ?? []);

          const p = projectRes.data;
          setForm(prev => ({
            ...prev,
            title: p.title ?? '',
            description: p.description ?? '',
            startDate: toDateInput(p.startDate),
            endDate: toDateInput(p.endDate),
            githubUrl: p.githubUrl ?? '',
            deployUrl: p.deployUrl ?? '',
            notionUrl: p.notionUrl ?? '',
            thumbnailUrl: p.thumbnailUrl ?? '',
            // 백엔드가 stackNames: [{stackId, name, categoryId}, ...] 로 줌
            stackIds: Array.isArray(p.stackNames) ? p.stackNames.map(s => s.stackId) : []
          }));
        } else {
          const stacksRes = await stacksP;
          setStackList(stacksRes.data ?? []);
          setForm(f => ({ ...f, username })); // 라우트 변경 대비
        }
      } catch (e) {
        console.error(e);
        navigate('/notfound');
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, projectId, username, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
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
    // 간단 검증: 종료일이 시작일 이전이면 막기
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateProject(projectId, form);
        alert('프로젝트 수정 완료!');
      } else {
        await insertProject(form);
        alert('프로젝트 등록 완료!');
      }
      navigate(`/project/${username}`);
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장 실패');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" /> 불러오는 중…
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>{isEdit ? '프로젝트 수정' : '프로젝트 등록'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>설명</Form.Label>
          <Form.Control as="textarea" name="description" rows={3}
                        value={form.description} onChange={handleChange} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>시작일</Form.Label>
              <Form.Control type="date" name="startDate"
                            value={form.startDate} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>종료일</Form.Label>
              <Form.Control type="date" name="endDate"
                            value={form.endDate} onChange={handleChange}
                            min={form.startDate || undefined} />
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
            {stackList.map((stack) => (
              <Form.Check
                key={stack.stackId}
                type="checkbox"
                id={`stack-${stack.stackId}`}
                label={stack.name}
                checked={form.stackIds.includes(stack.stackId)}
                onChange={() => handleStackChange(stack.stackId)}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? '저장 중…' : (isEdit ? '수정' : '등록')}
        </Button>
      </Form>
    </Container>
  );
}
