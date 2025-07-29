import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import WorkExpModal from './WorkExpModal';
import { insertWorkExp } from '../../../api/careerApi';
import { Pencil } from 'react-bootstrap-icons';
import { AuthContext } from '../../../context/AuthContext';

const WorkExperiencesPage = ({ userID, username, workExp, onSuccess }) => {
    const { isHost } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        company_name: '',
        position: '',
        start_date: '',
        end_date: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setForm({ company_name: '', position: '', start_date: '', end_date: '' });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (item) => {
        setForm({
            company_name: item.company_name,
            position: item.position,
            start_date: item.start_date,
            end_date: item.end_date
        });
        setOpen(true);
    };

    const handleSubmit = async () => {
        const payload = { ...form, user_id: userID };
        try {
            await insertWorkExp(payload);
            onSuccess();
            handleClose();
        } catch (err) {
            console.error('등록 실패:', err);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col><h5>경력 사항</h5></Col>
                {isHost && (
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
                        {isHost && <th className="text-center">관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(workExp) && workExp.length > 0 ? (
                        workExp.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.company_name}</td>
                                <td>{item.position}</td>
                                <td>{item.start_date} ~ {item.end_date}</td>
                                {isHost && (
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
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={isHost ? 4 : 3}>경력 정보가 없습니다.</td>
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
            />
        </Container>
    );
};

export default WorkExperiencesPage;
