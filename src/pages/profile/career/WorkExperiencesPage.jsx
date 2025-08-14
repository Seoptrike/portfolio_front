import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import WorkExpModal from './WorkExpModal';
import { insertWorkExp, updateWorkExp, deleteWorkExp } from '../../../api/careerApi';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../../../context/AuthContext';
import dayjs from 'dayjs';
import { apiDatesToForm, formToApiDates, ymLt, clampEndYM } from '../../../utils/yearModule';
import useEditMode from '../../../hooks/useEditMode';
import useIsMobile from '../../../hooks/useIsMobile';
import CommonHeroBanner from '../../../components/common/CommonHeroBanner';

const WorkExperiencesPage = ({ username, workExp, onSuccess }) => {
    const { isHost } = useContext(AuthContext);
    const isMobile = useIsMobile();
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
                <Col><CommonHeroBanner title="경력사항" size="compact"/></Col>
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
                        <th style={{width:`40%`}}>근무처</th>
                        <th style={{width:`40%`}}>직급</th>
                        <th style={{width:`30%`}}>근무 기간</th>
                        {editMode && <th className="text-center">관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(workExp) && workExp.length > 0 ? (
                        workExp.map((item) => (
                            <tr key={item.workId}>
                                <td style={{width:`40%`}}>
                                    <div
                                        style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', whiteSpace:'nowrap' }}
                                        title={item.companyName} // 전체값 툴팁
                                    >
                                        {item.companyName}
                                    </div>
                                </td>

                                <td style={{width:`40%`}}>
                                    <div
                                        style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', whiteSpace:'nowrap' }}
                                        title={item.position}
                                    >
                                        {item.position}
                                    </div>
                                </td>

                                <td style={{width:`30%`}}>
                                    <div
                                        style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', whiteSpace:'nowrap' }}
                                        title={`${formatYM(item.startDate)} ~ ${item.endDate ? formatYM(item.endDate) : '현재'}`}
                                    >
                                        {formatYM(item.startDate)} ~ {item.endDate ? formatYM(item.endDate) : '현재'}
                                    </div>
                                </td>

                                {editMode && (
                                    <td
                                        className="text-center"
                                        style={{
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap', // 버튼들도 줄바꿈 금지
                                        }}
                                    >
                                        <OverlayTrigger overlay={<Tooltip>수정</Tooltip>}>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
                                                style={{
                                                    padding: '0.25rem',
                                                    margin: '0 4px',
                                                    fontSize: '1em', // 부모 글자 크기에 비례
                                                }}
                                                aria-label="수정"
                                            >
                                                <Pencil />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger overlay={<Tooltip>삭제</Tooltip>}>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleDelete(item.workId)}
                                                style={{
                                                    padding: '0.25rem',
                                                    margin: '0 4px',
                                                    fontSize: '1em',
                                                }}
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
                            <td
                                colSpan={editMode ? 4 : 3}
                                style={{ textAlign: 'center', ffontSize: isMobile ? '0.8rem' : '0.9rem', whiteSpace: 'nowrap' }}
                            >
                                경력 정보가 없습니다.
                            </td>
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