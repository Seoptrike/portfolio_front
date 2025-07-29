import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const EduHistoryModal = ({ show, onHide, form, handleChange, handleSubmit }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>학력 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>학교이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="school_name"
                            value={form.school_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>전공</Form.Label>
                        <Form.Control
                            type="text"
                            name="major"
                            value={form.major}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>입학일</Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>졸업일</Form.Label>
                        <Form.Control
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>취소</Button>
                <Button variant="primary" onClick={handleSubmit}>등록</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EduHistoryModal