import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { register } from '../../api/authApi';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    photo: '',
    github_url: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    console.log(formData);
    alert('회원가입 정보가 콘솔에 출력되었습니다!');
  };

  return (
    <Container className="mt-5 pt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <h3 className="text-center mb-4">회원가입</h3>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="아이디" className="mb-3">
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="아이디"
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="비밀번호" className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호"
                  required
                />
              </FloatingLabel>

              <FloatingLabel label="휴대폰 번호" className="mb-3">
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                />
              </FloatingLabel>

              <Form.Group controlId="formPhoto" className="mb-3">
                <Form.Label>프로필 사진</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Form.Group>

              <FloatingLabel label="GitHub URL" className="mb-3">
                <Form.Control
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/yourname"
                />
              </FloatingLabel>

              <div className="d-grid">
                <Button type="submit" variant="primary">회원가입</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
