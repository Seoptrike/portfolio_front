import React, { useContext, useEffect, useState } from 'react';
import { Container, Accordion, ListGroup, Button, Form } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircleDotted } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAchieve, fetchAchieveList, insertAchieve, updateAchieve } from '../../api/achievements';
import WorkExpModal from '../profile/career/WorkExpModal';
import { insertWorkExp } from '../../api/careerApi';
import { AuthContext } from '../../context/AuthContext';
import useEditMode from '../../hooks/useEditMode';
import dayjs from 'dayjs';

const CareerPage = () => {
    const { username } = useParams();
    const [careers, setCareers] = useState([]);
    const [open, setOpen] = useState(false);
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const formatYM = (v) => v ? dayjs(v).format('YYYY.MM') : '';
    const navigate = useNavigate();
    const [form, setForm] = useState({
        companyName: '',
        position: '',
        startDate: '',
        endDate: ''
    });
    // 현재 수정 중인 detail 항목의 ID를 저장합니다. null이면 수정 중인 항목이 없다는 의미입니다.
    const [editingDetailId, setEditingDetailId] = useState(null);

    // 수정 중인 detail 항목의 내용을 담을 form state입니다.
    const [editingForm, setEditingForm] = useState({ title: '', content: '' });

    // 상세 내용을 '추가' 중인 부모 경력(career)의 ID를 저장합니다.
    const [addingDetailToWorkId, setAddingDetailToWorkId] = useState(null);

    // 새로 추가할 상세 내용의 내용을 담을 form state입니다.
    const [newDetailForm, setNewDetailForm] = useState({ title: '', content: '' });

    const callAPI = async () => {
        try {
            const res = await fetchAchieveList(username);
            setCareers(res.data);
        } catch {
            navigate("/notfound")
        }
    }

    useEffect(() => {
        callAPI();
    }, [username])

    //모달 관련
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setForm({ companyName: '', position: '', startDate: '', endDate: '' });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // 서버로 보낼 payload의 key를 camelCase로 변경
        const payload = { ...form, username: username };
        try {
            await insertWorkExp(payload);
            callAPI();
            handleClose();
        } catch (err) {
            console.error('등록 실패:', err);
        }
    };

    // '수정' 버튼을 눌렀을 때
    const handleDetailEdit = (detail) => {
        setEditingDetailId(detail.detailId);
        setEditingForm({
            title: detail.title,
            content: detail.content
        });
    };

    // 수정 내용 저장 
    const handleSaveDetail = async (workId, detailId) => {
        console.log(`${workId} 경력의 ${detailId} 상세 내용을 저장합니다.`, editingForm);
        const payload = { ...editingForm, detailId: detailId };
        await updateAchieve(payload)
        // await updateWorkExpDetail(detailId, editingForm);
        callAPI();
        setEditingDetailId(null);
    };

    // 수정 취소
    const handleCancelEdit = () => {
        setEditingDetailId(null); // 수정 모드 해제
        setEditingForm({ title: '', content: '' }); // 폼 초기화
    };

    // 수정 폼 내용 변경 시
    const handleEditingFormChange = (e) => {
        setEditingForm({
            ...editingForm,
            [e.target.name]: e.target.value
        });
    };

    // '상세 내용 추가하기' 버튼을 눌렀을 때
    const handleDetailAdd = (workId) => {
        setAddingDetailToWorkId(workId); // 추가 모드로 전환 (어떤 career에 추가할지 ID 저장)
    };

    // '추가' 취소
    const handleCancelAdd = () => {
        setAddingDetailToWorkId(null); // 추가 모드 해제
        setNewDetailForm({ title: '', content: '' }); // 폼 초기화
    };

    // '추가' 폼 내용 변경 시
    const handleNewDetailChange = (e) => {
        setNewDetailForm({
            ...newDetailForm,
            [e.target.name]: e.target.value
        });
    };

    // '추가' 내용 저장 (API 연동 필요)
    const handleSaveNewDetail = async (workId) => {
        console.log(`${workId} 경력에 새로운 상세 내용을 저장합니다.`, newDetailForm);
        const payload = { ...newDetailForm, workId: workId };
        await insertAchieve(payload);
        callAPI();
        handleCancelAdd(); // 추가 모드 해제 및 폼 초기화
    };

    // '삭제하기'
    const handleDetailDelete = async (detailId) => {
        await deleteAchieve(detailId);
        callAPI()
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center">💼 경력 기술서</h2>
            {careers.length > 0 ?
                (<Accordion defaultActiveKey="0" alwaysOpen>
                    {careers.map(career => (
                        <Accordion.Item eventKey={career.workId} key={career.workId} className="mb-3 shadow-sm">
                            <Accordion.Header>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong style={{ fontSize: '1.1rem' }}>{career.companyName}</strong>
                                        <span className="text-muted">{formatYM(career.startDate)} ~ {formatYM(career.endDate)}</span>
                                    </div>
                                    <div className="text-muted small mt-1">{career.position}</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    {career.details.map(detail => (
                                        <ListGroup.Item key={detail.detailId} className="px-0 py-3">
                                            {editingDetailId === detail.detailId ? (
                                                // ✅ 수정 모드일 때: 입력 폼을 보여줌
                                                <div>
                                                    <Form.Group className="mb-2">
                                                        <Form.Control
                                                            type="text"
                                                            name="title"
                                                            value={editingForm.title}
                                                            onChange={handleEditingFormChange}
                                                            placeholder="제목"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="content"
                                                            value={editingForm.content}
                                                            onChange={handleEditingFormChange}
                                                            placeholder="상세 내용"
                                                        />
                                                    </Form.Group>
                                                    <div className="text-end">
                                                        <Button variant="secondary" size="sm" className="me-2" onClick={handleCancelEdit}>
                                                            취소
                                                        </Button>
                                                        <Button variant="primary" size="sm" onClick={() => handleSaveDetail(career.workId, detail.detailId)}>
                                                            저장
                                                        </Button>
                                                    </div>
                                                </div>

                                            ) : (
                                                // ✅ 일반 모드일 때: 기존 내용을 보여줌
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="me-3">
                                                        <h6 className="mb-1">{detail.title}</h6>
                                                        <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-line' }}>
                                                            {detail.content}
                                                        </p>
                                                    </div>
                                                    {editMode && (
                                                        <div className="flex-shrink-0">
                                                            <Button variant="light" size="sm" className="p-1 me-1" onClick={() => handleDetailEdit(detail)}>
                                                                <PencilSquare />
                                                            </Button>
                                                            <Button variant="light" size="sm" className="p-1" onClick={() => handleDetailDelete(detail.detailId)}>
                                                                <Trash />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                    {editMode && (
                                        <ListGroup.Item className="text-center p-3">
                                            {addingDetailToWorkId === career.workId ? (
                                                // ✅ 추가 모드일 때: 입력 폼을 보여줌
                                                <div className="text-start">
                                                    <h6 className="mb-3">상세 내용 추가</h6>
                                                    <Form.Group className="mb-2">
                                                        <Form.Control
                                                            type="text"
                                                            name="title"
                                                            value={newDetailForm.title}
                                                            onChange={handleNewDetailChange}
                                                            placeholder="제목"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="content"
                                                            value={newDetailForm.content}
                                                            onChange={handleNewDetailChange}
                                                            placeholder="상세 내용"
                                                        />
                                                    </Form.Group>
                                                    <div className="text-end">
                                                        <Button variant="secondary" size="sm" className="me-2" onClick={handleCancelAdd}>
                                                            취소
                                                        </Button>
                                                        <Button variant="primary" size="sm" onClick={() => handleSaveNewDetail(career.workId)}>
                                                            추가
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // ✅ 일반 모드일 때: '추가' 버튼을 보여줌
                                                <Button variant="outline-secondary" className="w-100 border-2 border-dashed" onClick={() => handleDetailAdd(career.workId)}>
                                                    <PlusCircleDotted size={20} className="me-2" />
                                                    경력 상세 내용 추가하기
                                                </Button>
                                            )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>)
                : isHost === true ? (
                    // 2. 경력은 없지만, 페이지 주인일 경우 (isHost가 true)
                    <div>
                        <p className="text-center text-muted">아직 등록된 경력이 없습니다.</p>
                        <div className="text-center mt-3">
                            <Button onClick={handleOpen}>경력 추가하기</Button>
                        </div>
                    </div>
                ) : (
                    // 3. 경력도 없고, 페이지 주인도 아닐 경우
                    <div className="text-center text-muted">
                        <p>등록된 경력이 없습니다.</p>
                    </div>
                )}
            <WorkExpModal
                show={open}
                onHide={handleClose}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
};

export default CareerPage;