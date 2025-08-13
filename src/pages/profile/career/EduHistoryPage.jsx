import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { insertEduHistory, updateEduHistory, deleteEduHistory } from '../../../api/careerApi';
import { Pencil, Trash } from 'react-bootstrap-icons';
import EduHistoryModal from './EduHistoryModal';
import { AuthContext } from '../../../context/AuthContext';
import dayjs from 'dayjs';
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from '../../../utils/yearModule';
import useEditMode from '../../../hooks/useEditMode';

const EduHistoryPage = ({ userId, username, EduHis, onSuccess }) => {
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        educationId: null,
        username: username,
        schoolName: '',
        major: '',
        startDate: '',
        endDate: ''
    });
    const formatYM = (v) => v ? dayjs(v).format('YYYY.MM') : '';
    const handleOpen = () => {
        setIsEdit(false);           // 신규 모드
        setForm(f => ({
            ...f,
            educationId: null,
            schoolName: '',
            major: '',
            startDate: '',
            endDate: ''
        }));
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
        setForm(f => ({
            ...f,
            educationId: null,
            schoolName: '',
            major: '',
            startDate: '',
            endDate: ''
        }));
    };

    const handleEdit = (item) => {
        setIsEdit(true); // ★ 수정 모드
        setForm({
            educationId: item.educationId,        // ★ 서버가 식별할 PK
            username: username,         // 혹은 item.username ?? username
            schoolName: item.schoolName ?? "",
            major: item.major ?? "",
            ...apiDatesToForm({ startDate: item.startDate, endDate: item.endDate }) // YYYY-MM
        });
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;           // value는 YYYY-MM
        setForm((f) => {
            if (name === "endDate") {
                return { ...f, endDate: clampEndYM(f.startDate, value) };
            }
            return { ...f, [name]: value };
        });
    };

    const handleSubmit = async () => {
        if (ymLt(form.endDate, form.startDate)) {
            alert("종료월은 시작월 이후여야 해요.");
            return;
        }
        const payload = {
            schoolName: form.schoolName,
            major: form.major,
            username: form.username,
            ...formToApiDates(form), // startDate/endDate를 YYYY-MM-DD로 보정
        };

        try {
            if (isEdit) {
                await updateEduHistory({ ...payload, educationId: form.educationId }); // ★ 수정
            } else {
                await insertEduHistory(payload);                              // ★ 신규
            }
            onSuccess();
            handleClose();
        } catch (err) {
            console.error('등록/수정 실패:', err);
        }
    };

    const handleDelete = async (educationId) => {
        if (!window.confirm('정말 삭제할까요?')) return;
        try {
            await deleteEduHistory(educationId);
            onSuccess();
        } catch (e) {
            alert('삭제에 실패했습니다.');
        }
    };
    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col><h5>학력 사항</h5></Col>
                {editMode && (
                    <Col className="text-end">
                        <Button variant="outline-primary" size="sm" onClick={handleOpen}>
                            + 추가
                        </Button>
                    </Col>
                )}
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>학교</th>
                        <th>전공</th>
                        <th>재학 기간</th>
                        {editMode && <th className="text-center">관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(EduHis) && EduHis.length > 0 ? (
                        EduHis.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.schoolName}</td>
                                <td>{item.major}</td>
                                <td>{formatYM(item.startDate)} ~ {item.endDate ? formatYM(item.endDate) : '현재'}</td>
                                {editMode && (
                                    <td className="text-center">
                                        <OverlayTrigger overlay={<Tooltip>수정</Tooltip>}>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
                                                style={{ padding: '0.25rem', margin: '0 4px' }}
                                            >
                                                <Pencil />
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip>삭제</Tooltip>}>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleDelete(item.educationId)}
                                                style={{ padding: '0.25rem', margin: '0 4px' }}
                                                className="text-danger"
                                                aria-label="삭제"
                                            >
                                                <Trash />
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">학력 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <EduHistoryModal
                show={open}
                onHide={handleClose}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit}
            />
        </Container>
    )
}

export default EduHistoryPage;