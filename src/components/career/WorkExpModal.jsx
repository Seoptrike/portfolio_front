import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkExpModal = ({ show, onHide, form, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>경력 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>근무처</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              value={form.company_name}
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
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>근무 종료일</Form.Label>
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
  );
};

export default WorkExpModal;
