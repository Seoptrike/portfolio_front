import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import WorkExpModal from './WorkExpModal';
import { insertWorkExp, updateWorkExp, deleteWorkExp } from '../../../api/careerApi';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../../../context/AuthContext';
import dayjs from 'dayjs';
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from '../../../utils/yearModule';
import useEditMode from '../../../hooks/useEditMode';

const WorkExperiencesPage = ({ username, workExp, onSuccess }) => {
    const { isHost } = useContext(AuthContext);
    const { editMode } = useEditMode();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        workId: null,
        username: username,
        companyName: '',
        position: '',
        startDate: '',
        endDate: ''
    });

    const formatYM = (v) => v ? dayjs(v).format('YYYY.MM') : '';
    const handleOpen = () => {
        setIsEdit(false);           // 신규 모드
        setForm(f => ({
            ...f,
            workId: null,
            companyName: '',
            position: '',
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
            workId: null,
            companyName: '',
            position: '',
            startDate: '',
            endDate: ''
        }));
    };

    const handleEdit = (item) => {
        setIsEdit(true); // ★ 수정 모드
        setForm({
            workId: item.workId,        // ★ 서버가 식별할 PK
            username: username,         // 혹은 item.username ?? username
            companyName: item.companyName ?? "",
            position: item.position ?? "",
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
            companyName: form.companyName,
            position: form.position,
            username: form.username,
            ...formToApiDates(form), // startDate/endDate를 YYYY-MM-DD로 보정
        };

        try {
            if (isEdit) {
                await updateWorkExp({ ...payload, workId: form.workId }); // ★ 수정
            } else {
                await insertWorkExp(payload);                              // ★ 신규
            }
            onSuccess();
            handleClose();
        } catch (err) {
            console.error('등록/수정 실패:', err);
        }
    };

    const handleDelete = async (workId) => {
        if (!window.confirm('정말 삭제할까요?')) return;
        try {
            await deleteWorkExp(workId);   // 백엔드: DELETE /api/career/work/{workId}
            onSuccess();                   // 목록 새로고침
        } catch (e) {
            alert('삭제에 실패했습니다.');
        }
    };

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col><h5>경력 사항</h5></Col>
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
                        <th>근무처</th>
                        <th>직급</th>
                        <th>근무 기간</th>
                        {editMode && <th className="text-center">관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(workExp) && workExp.length > 0 ? (
                        workExp.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.companyName}</td>
                                <td>{item.position}</td>
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
                                                onClick={() => handleDelete(item.workId)}
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
                            <td colSpan={editMode ? 4 : 3} className="text-center">경력 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <WorkExpModal
                show={open}
                onHide={handleClose}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEdit={isEdit}
            />
        </Container>
    );
};

export default WorkExperiencesPage;