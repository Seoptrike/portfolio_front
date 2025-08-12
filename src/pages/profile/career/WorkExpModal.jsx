import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkExpModal = ({ show, onHide, form, handleChange, handleSubmit,isEdit }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? '경력 수정' : '경력 추가'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>근무처</Form.Label>
                        <Form.Control
                            type="text"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>직급</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>근무 시작(년-월)</Form.Label>
                        <Form.Control
                            type="month"                 // ← date 대신 month
                            name="startDate"
                            value={form.startDate || ""} // "2025-08" 형태
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>근무 종료(년-월)</Form.Label>
                        <Form.Control
                            type="month"
                            name="endDate"
                            value={form.endDate || ""}   // 비우면 '현재' 취급
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>취소</Button>
                <Button variant="primary" onClick={handleSubmit}> {isEdit ? '수정' : '저장'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WorkExpModal;