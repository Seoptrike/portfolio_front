import React, { useContext, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { insertEduHistory } from '../../../api/careerApi';
import EduHistoryModal from './EduHistoryModal';
import { AuthContext } from '../../../context/AuthContext';

const EduHistoryPage = ({ userID, EduHis, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        schoolName: '',
        major: '',
        startDate: '',
        endDate: ''
    });
    const { isHost } = useContext(AuthContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setForm({ schoolName: '', major: '', startDate: '', endDate: '' });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const payload = { ...form, userId: userID };
        try {
            await insertEduHistory(payload);
            onSuccess();
            handleClose();
        } catch (err) {
            console.error('등록 실패:', err);
        }
    };
    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col><h5>학력 사항</h5></Col>
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
                        <th>학교</th>
                        <th>전공</th>
                        <th>재학 기간</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(EduHis) && EduHis.length > 0 ? (
                        EduHis.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.schoolName}</td>
                                <td>{item.major}</td>
                                <td>{item.startDate} ~ {item.endDate}</td>
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
            />
        </Container>
    )
}

export default EduHistoryPage;