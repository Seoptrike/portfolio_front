import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Stack, Form } from 'react-bootstrap';
import {
    fetchAboutList,
    insertAboutDetail,
    updateAboutDetail,
    deleteAboutDetail,
    createAbout,
} from '../../api/aboutApi';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useEditMode from '../../hooks/useEditMode';

const AboutMePage = () => {
    const [aboutList, setAboutList] = useState([]);
    const { username } = useParams();
    const { editMode } = useEditMode();
    const { isHost } = useContext(AuthContext);
    const [about_id, setAbout_id] = useState(null);
    const navigate = useNavigate();

    // 추가 폼 관리
    const [isAdding, setIsAdding] = useState(false);
    const [newAbout, setNewAbout] = useState({ title: '', content: '' });

    // 수정 상태 관리
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 항목의 detail_id
    const [editingContent, setEditingContent] = useState({ title: '', content: '' }); // 수정 중인 내용

    const callAPI = async () => {
        try {
            const res = await fetchAboutList(username);
            const sortedData = [...res.data].sort((a, b) => a.sort - b.sort);
            setAboutList(sortedData);
            if (res.data && res.data.length > 0) {
                setAbout_id(res.data[0].about_id);
            } else {
                setAbout_id(null);
            }
        } catch (error) {
            navigate("/notfound")
        }
    };

    useEffect(() => {
        callAPI();
    }, [username]);

    // --- 추가 관련 핸들러 ---
    const handleAddClick = () => setIsAdding(true);

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewAbout(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSave = async () => {
        try {
            if (about_id) {
                // 기존 항목에 상세 내용 '추가'
                const dataToSave = { ...newAbout, aboutId: about_id };
                await insertAboutDetail(dataToSave);
                alert('항목이 성공적으로 추가되었습니다.');
            } else {
                // 자기소개 '최초 생성'
                const dataToCreate = { username: username ,title: newAbout.title, content: newAbout.content };
                await createAbout(dataToCreate);
                alert('첫 자기소개가 성공적으로 생성되었습니다.');
            }
            // 성공 후 공통 로직
            setNewAbout({ title: '', content: '' });
            setIsAdding(false);
            callAPI();
        } catch (error) {
            console.error("저장 실패:", error);
            alert('저장에 실패했습니다.');
        }
    };

    const handleAddCancel = () => {
        setIsAdding(false);
        setNewAbout({ title: '', content: '' });
    };

    // --- 수정 관련 핸들러 ---
    const handleEditClick = (about) => {
        setEditingId(about.detail_id);
        setEditingContent({ title: about.title, content: about.content });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditingContent({ title: '', content: '' });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingContent(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async (detail_id) => {
        const dataToUpdate = { ...editingContent, detailId: detail_id };
        try {
            await updateAboutDetail(dataToUpdate);
            alert('수정되었습니다.');
            setEditingId(null);
            callAPI();
        } catch (error) {
            console.error("수정 실패:", error);
            alert('수정에 실패했습니다.');
        }
    };

    // --- 삭제 핸들러 ---
    const handleDelete = async (detail_id) => {
        if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
            try {
                await deleteAboutDetail(detail_id);
                alert('삭제되었습니다.');
                callAPI();
            } catch (error) {
                console.error("삭제 실패:", error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    // --- 렌더링 함수 ---
    const renderAddUI = () => {
        if (editingId !== null) return null;

        return (
            <div className={aboutList.length > 0 ? "mt-3" : ""}>
                {isAdding ? (
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="제목을 입력하세요" name="title" value={newAbout.title} onChange={handleAddInputChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control as="textarea" rows={5} placeholder="내용을 입력하세요" name="content" value={newAbout.content} onChange={handleAddInputChange} />
                                </Form.Group>
                                <div className="d-flex justify-content-end gap-2">
                                    <Button variant="secondary" onClick={handleAddCancel}>취소</Button>
                                    <Button variant="primary" onClick={handleAddSave}>저장</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="shadow-sm" onClick={handleAddClick} style={{ cursor: 'pointer', border: '2px dashed #ced4da' }}>
                        <Card.Body className="d-flex align-items-center justify-content-center text-muted" style={{ minHeight: '150px' }}>
                            <div className="text-center">
                                <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>+</span>
                                <p className="mb-0 mt-2">새 자기소개 추가하기</p>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        );
    };

    const renderContent = () => {
        if (aboutList.length === 0) {
            return isHost ? renderAddUI() : (
                <Card className="p-4 text-center">
                    <Card.Body>작성된 자기소개가 없습니다.</Card.Body>
                </Card>
            );
        }

        return (
            <Stack gap={3}>
                {aboutList.map(about => (
                    <Card key={about.detail_id} className="shadow-sm">
                        <Card.Body>
                            {editingId === about.detail_id ? (
                                <Form>
                                    <Form.Control type="text" name="title" value={editingContent.title} onChange={handleEditInputChange} className="mb-2" />
                                    <Form.Control as="textarea" rows={5} name="content" value={editingContent.content} onChange={handleEditInputChange} />
                                    <div className="d-flex justify-content-end gap-2 mt-3">
                                        <Button variant="secondary" size="sm" onClick={handleEditCancel}>취소</Button>
                                        <Button variant="primary" size="sm" onClick={() => handleEditSave(about.detail_id)}>저장</Button>
                                    </div>
                                </Form>
                            ) : (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Card.Title className="mb-0">{about.title}</Card.Title>
                                        {editMode && (
                                            <div>
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleEditClick(about)}>수정</Button>{' '}
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(about.detail_id)}>삭제</Button>
                                            </div>
                                        )}
                                    </div>
                                    <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                                        {about.content}
                                    </Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                ))}
                {editMode && renderAddUI()}
            </Stack>
        );
    };

    return (
        <Container className="my-3 my-md-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={12}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0">나를 소개합니다 ✒️</h2>
                    </div>
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default AboutMePage;