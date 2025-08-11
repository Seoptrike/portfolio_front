import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkExpModal = ({ show, onHide, form, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>경력 추가/수정</Modal.Title>
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
            <Form.Label>근무 시작일</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>근무 종료일</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>취소</Button>
        <Button variant="primary" onClick={handleSubmit}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkExpModal;