import React, { useEffect, useMemo, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImagePicker from "../../components/common/ImagePicker";
import useImageKitUpload from "../../hooks/useImageKitUpload.js";
import { AuthContext } from "../../context/AuthContext";
import { getAllStack } from "../../api/techStackApi";
import { insertProject, updateProject, getProjectById } from "../../api/projectApi";

const toDateInput = (v) => (v ? String(v).slice(0, 10) : "");

const ProjectUpsertPage = () => {
    const { username, projectId } = useParams();
    const { loginId } = useContext(AuthContext); // userId가 컨텍스트에 있어야 함
    const isEdit = useMemo(() => Boolean(projectId), [projectId]);
    const navigate = useNavigate();

    const [stackList, setStackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // 썸네일 파일(저장 누르기 전까지는 업로드 X)
    const [imageFile, setImageFile] = useState(null);
    const { uploadImage, busy: uploading, progress } = useImageKitUpload();

    const [form, setForm] = useState({
        username,
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        githubUrl: "",
        deployUrl: "",
        notionUrl: "",
        thumbnailUrl: "",
        stackIds: [],
    });

    useEffect(() => {
        (async () => {
            try {
                const stacksP = getAllStack("");
                if (isEdit) {
                    const [stacksRes, projectRes] = await Promise.all([stacksP, getProjectById(projectId)]);
                    setStackList(stacksRes.data ?? []);
                    const p = projectRes.data;
                    setForm((prev) => ({
                        ...prev,
                        username,
                        title: p.title ?? "",
                        description: p.description ?? "",
                        startDate: toDateInput(p.startDate),
                        endDate: toDateInput(p.endDate),
                        githubUrl: p.githubUrl ?? "",
                        deployUrl: p.deployUrl ?? "",
                        notionUrl: p.notionUrl ?? "",
                        thumbnailUrl: p.thumbnailUrl ?? "",
                        stackIds: Array.isArray(p.stackNames) ? p.stackNames.map((s) => s.stackId) : [],
                    }));
                } else {
                    const stacksRes = await stacksP;
                    setStackList(stacksRes.data ?? []);
                    setForm((f) => ({ ...f, username })); // 라우트 변경 대비
                }
            } catch (e) {
                console.error(e);
                // navigate("/notfound");
            } finally {
                setLoading(false);
            }
        })();
    }, [isEdit, projectId, username, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleStackChange = (id) => {
        setForm((prev) => ({
            ...prev,
            stackIds: prev.stackIds.includes(id)
                ? prev.stackIds.filter((sid) => sid !== id)
                : [...prev.stackIds, id],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
            alert("종료일은 시작일 이후여야 합니다.");
            return;
        }
        setSaving(true);
        try {
            let thumbnailUrl = form.thumbnailUrl || null;
            let thumbnailFileId = form.thumbnailFileId || null;

            if (imageFile) {
                const uploaded = await uploadImage(imageFile, { userId: loginId, folder: "project" });
                thumbnailUrl = uploaded?.url ?? null;
                thumbnailFileId = uploaded?.fileId ?? null; // ✅ 새 fileId 저장
            }

            const payload = { ...form, username, thumbnailUrl, thumbnailFileId };
            if (isEdit) await updateProject(projectId, payload);
            else await insertProject(payload);

            alert(isEdit ? "프로젝트 수정 완료!" : "프로젝트 등록 완료!");
            navigate(`/${username}/project`);
        } catch (e) {
            console.error(e);
            alert("저장 실패");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" /> 불러오는 중…
            </Container>
        );
    }
    console.log(stackList);
    return (
        <>
            <h2>{isEdit ? "프로젝트 수정" : "프로젝트 등록"}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>설명</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>시작일</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>종료일</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                min={form.startDate || undefined}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>GitHub URL</Form.Label>
                    <Form.Control name="githubUrl" value={form.githubUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>배포 URL</Form.Label>
                    <Form.Control name="deployUrl" value={form.deployUrl} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Notion URL</Form.Label>
                    <Form.Control name="notionUrl" value={form.notionUrl} onChange={handleChange} />
                </Form.Group>

                {/* 썸네일: 파일 선택만, 업로드는 저장 시점 */}
                <Form.Group className="mb-3">
                    <Form.Label>썸네일 이미지</Form.Label>
                    <div>
                        <ImagePicker value={imageFile} onChange={setImageFile} />
                        {uploading && (
                            <small style={{ marginLeft: 8, color: "#666" }}>{progress}% 업로드 중…</small>
                        )}
                        {!imageFile && form.thumbnailUrl && (
                            <div style={{ marginTop: 8 }}>
                                <img
                                    src={`${form.thumbnailUrl}?tr=w-160,h-160,fo-auto,q=auto`}
                                    alt="current thumbnail"
                                    style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }}
                                />
                            </div>
                        )}
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>기술 스택</Form.Label>
                    <div className="d-flex flex-wrap gap-3 mt-2">
                        {stackList.map((stack) => (
                            <Form.Check
                                key={stack.stackId}
                                type="checkbox"
                                id={`stack-${stack.stackId}`}
                                label={stack.name}
                                checked={form.stackIds.includes(stack.stackId)}
                                onChange={() => handleStackChange(stack.stackId)}
                            />
                        ))}
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={saving || uploading}>
                    {saving || uploading ? "저장 중…" : isEdit ? "수정" : "등록"}
                </Button>
            </Form>
        </>
    );
};

export default ProjectUpsertPage;
