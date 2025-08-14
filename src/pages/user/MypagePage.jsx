import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getUserData, updateUserData } from "../../api/userApi";
import ImagePicker from "../../components/common/ImagePicker";
import useImageKitUpload from "../../hooks/useImageKitUpload.js";

const MypagePage = () => {
    const navigate = useNavigate();
    const { isLogin, loginName } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(null);    // 현재 저장된 프로필 사진 URL
    const [photoFile, setPhotoFile] = useState(null);  // 새로 선택된 파일(저장 전까지 업로드 X)
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        githubUrl: "",
    });

    const { uploadImage, busy: uploading, progress } = useImageKitUpload();

    useEffect(() => {
        // 보호 라우팅
        if (!isLogin) {
            navigate("/auth/login");
            return;
        }
        (async () => {
            try {
                const res = await getUserData(loginName);
                console.log(res.data);
                setPhotoUrl(res.data.photo ?? null);
                setUserId(res.data.userId);
                setFormData({
                    username: res.data.username,                        // URL 파라미터 기준 표시용(수정 X)
                    phone: res.data.phone ?? "",
                    githubUrl: res.data.githubUrl ?? "",
                });
                setUsername(res.data.username);
            } catch (e) {
                console.error(e);
                navigate("/notfound");
            } finally {
                setLoading(false);
            }
        })();
    }, [isLogin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!userId) return;
        setSaving(true);
        try {
            // 1) 저장 시점에만 이미지 업로드
            let newPhotoUrl = photoUrl;
            let newPhotoFileId = null;

            if (photoFile) {
                const uploaded = await uploadImage(photoFile, { username, folder: "profile" });
                newPhotoUrl = uploaded?.url ?? null;
                newPhotoFileId = uploaded?.fileId ?? null;
            }

            // 2) 프로필 정보 업데이트 (백엔드에서 이전 fileId 정리)
            await updateUserData({
                userId: userId,
                phone: formData.phone,
                githubUrl: formData.githubUrl,
                photo: newPhotoUrl,
                photoUrlId: newPhotoFileId, // 없으면 null → 서버는 변경 없음 처리
            });
            setPhotoUrl(newPhotoUrl);
            setPhotoFile(null);
            alert("프로필이 저장되었습니다.");
            navigate(`/${username}`)
        } catch (err) {
            console.error(err);
            alert("저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 pt-4 text-center">
                <Spinner animation="border" /> 불러오는 중…
            </Container>
        );
    }

    const shownPhoto = photoUrl ? `${photoUrl}?tr=w-180,h-180,fo-auto,q=auto` : "/images/vite.svg";

    return (
        <Row className="justify-content-center">
            <Col>
                <Card className="shadow-lg p-4">
                    <h3 className="text-center mb-4">마이페이지</h3>

                    <Form onSubmit={handleSave}>
                        <FloatingLabel label="아이디" className="mb-3">
                            <Form.Control type="text" value={formData.username} disabled readOnly />
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

                        <FloatingLabel label="GitHub URL" className="mb-3">
                            <Form.Control
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/yourname"
                            />
                        </FloatingLabel>

                        <Form.Group className="mb-3">
                            <Form.Label>프로필 사진</Form.Label>
                            <div style={{ display: "grid", gap: 12, placeItems: "center" }}>
                                <img
                                    src={shownPhoto}
                                    alt="profile"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "1px solid #eee",
                                    }}
                                />
                                {/* 파일 선택만; 업로드는 저장 때 */}
                                <ImagePicker value={photoFile} onChange={setPhotoFile} />
                                {uploading && <small style={{ color: "#666" }}>{progress}% 업로드 중…</small>}
                            </div>
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" variant="primary" disabled={saving || uploading}>
                                {saving || uploading ? "수정 중…" : "수정"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default MypagePage