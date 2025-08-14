import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../common/ImagePicker';
import useImageKitUpload from '../../hooks/useImageKitUpload';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phone: '',
        photo: '',
        githubUrl: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const { uploadImage, busy: uploading, progress } = useImageKitUpload();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1) 제출 시점에만 업로드
            let photoUrl = null;
            let photoUrlId = null;

            if (photoFile) {
                // 회원가입 전이라 userId가 없으므로 username 기반 폴더 사용
                const uploaded = await uploadImage(photoFile, {
                    userId: formData.username, // dev/prod prefix는 훅에서 처리됨
                    folder: "profile",
                });
                photoUrl = uploaded?.url ?? null;
                photoUrlId = uploaded?.fileId ?? null;
            }

            // 2) 회원가입 요청 (백엔드가 JSON으로 받는다고 가정)
            const payload = {
                username: formData.username,
                password: formData.password,
                phone: formData.phone,
                githubUrl: formData.githubUrl,
                photo: photoUrl,
                photoUrlId,
            };
            console.log(payload);

            await register(payload);
            alert("회원가입을 환영합니다!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("회원가입에 실패했습니다.");
        }
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

                            {/* 파일 선택만, 업로드는 제출 시 */}
                            <Form.Group controlId="formPhoto" className="mb-3">
                                <Form.Label>프로필 사진</Form.Label>
                                <div style={{ display: "grid", gap: 8 }}>
                                    <ImagePicker value={photoFile} onChange={setPhotoFile} />
                                    {uploading && (
                                        <small style={{ color: "#666" }}>{progress}% 업로드 중…</small>
                                    )}
                                </div>
                            </Form.Group>

                            <FloatingLabel label="GitHub URL" className="mb-3">
                                <Form.Control
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
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
