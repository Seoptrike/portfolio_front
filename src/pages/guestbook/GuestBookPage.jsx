import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../../context/AuthContext';
import { fetchGuestBookList, createGuestBook, deleteGuestBook, updateGuestBook } from '../../api/guestBookApi';
import useEditMode from '../../hooks/useEditMode';
import HeaderSection from './HeaderSection';

const GuestBookPage = () => {
    // 1. 필요한 Hooks 및 Context 설정
    const { username } = useParams(); // URL에서 방명록 주인의 username 가져오기
    const { isHost } = useContext(AuthContext); // 포트폴리오 주인 여부
    const { editMode } = useEditMode();

    // 카테고리 매핑
    const categoryMapping = {
        "기술 스택": 1,
        "프로젝트 완성도": 2,
        "코드 품질": 3,
        "UI/UX": 4,
        "포트폴리오 구성": 5,
        "경력/경험": 6,
        "개선사항": 7,
        "전반적 평가": 8
    };

    const categoryDisplay = {
        1: { name: "기술 스택", emoji: "💻" },
        2: { name: "프로젝트 완성도", emoji: "🚀" },
        3: { name: "코드 품질", emoji: "🔧" },
        4: { name: "UI/UX", emoji: "🎨" },
        5: { name: "포트폴리오 구성", emoji: "📄" },
        6: { name: "경력/경험", emoji: "👨‍💼" },
        7: { name: "개선사항", emoji: "💡" },
        8: { name: "전반적 평가", emoji: "⭐" }
    };

    // 2. State 설정
    const [list, setList] = useState([]); // 방명록 목록
    const [newMessage, setNewMessage] = useState(''); // 새로 작성할 메시지
    const [guestName, setGuestName] = useState(''); // 익명 작성자 이름
    const [feedbackCategory, setFeedbackCategory] = useState(''); // 피드백 카테고리
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null); // 수정 중인 항목의 ID (null이면 수정 중 아님)
    const [editingText, setEditingText] = useState(''); // 수정 중인 항목의 새 메시지

    // 폼 입력 공통 스타일 (세 곳에서 재사용)
    const fieldStyle = {
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-strong)',
        background: 'var(--surface-2)',
        color: 'var(--text)',
        padding: '0.7rem 1rem',
        fontSize: 'var(--text-base)',
    };
    const labelStyle = { fontWeight: 600, color: 'var(--text-muted)' };

    // 3. 데이터 로딩 함수 (단순화)
    const fetchList = async () => {
        try {
            const response = await fetchGuestBookList(username);
            setList(response.data);
        } catch {
            navigate("/notfound")
        }
    };

    // 4. 컴포넌트가 마운트되거나 username이 바뀔 때 목록 로딩
    useEffect(() => {
        fetchList();
    }, [username]);


    // 5. 이벤트 핸들러
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    // 완전 익명 피드백 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return alert("피드백을 입력해주세요.");

        try {
            await createGuestBook({
                loginName: guestName.trim() || "익명",
                message: newMessage,
                category: feedbackCategory ? categoryMapping[feedbackCategory] : null, // 카테고리를 숫자로 변환
                username: username
            });

            // 폼 초기화
            setNewMessage('');
            setGuestName('');
            setFeedbackCategory('');

            fetchList();
            alert("익명 피드백이 등록되었습니다!");
        } catch (error) {
            console.error("피드백 등록에 실패했습니다.", error);
            alert("피드백 등록 중 오류가 발생했습니다.");
        }
    };


    const handleDelete = async (guestbookId) => {
        if (window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
            try {
                await deleteGuestBook(guestbookId);
                fetchList();
            } catch (error) {
                console.error("방명록 삭제에 실패했습니다.", error);
                alert(error.response?.data || "메시지 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // '수정' 버튼 클릭 시
    const handleEditClick = (item) => {
        setEditingId(item.guestbookId); // 수정 모드로 전환
        setEditingText(item.message);   // 현재 메시지를 수정 텍스트로 설정
    };

    // '취소' 버튼 클릭 시
    const handleCancelEdit = () => {
        setEditingId(null); // 수정 모드 해제
        setEditingText('');
    };

    // 수정 중인 textarea의 내용 변경 시
    const handleEditingTextChange = (e) => {
        setEditingText(e.target.value);
    };

    // '저장' 버튼 클릭 시
    const handleUpdateSubmit = async (guestbookId) => {
        if (!editingText.trim()) return alert("메시지를 입력해주세요.");

        try {
            const data = { guestbookId: guestbookId, message: editingText, username: username };
            await updateGuestBook(data);
            setEditingId(null); // 수정 모드 해제
            fetchList();
        } catch (error) {
            console.error("방명록 수정에 실패했습니다.", error);
            alert(error.response?.data || "메시지 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <HeaderSection username={username} />
            {/* --- 메시지 리스트 영역 --- */}
            {isHost &&
                <Card className="mb-4 shadow-sm">

                    <ListGroup variant="flush">
                        {list.map(item => (
                            <ListGroup.Item key={item.guestbookId} >
                                {/* editingId와 현재 항목의 ID가 일치하면 수정 폼을, 아니면 일반 뷰를 보여줌 */}
                                {editingId === item.guestbookId ? (
                                    // --- ✅ 수정 모드 UI ---
                                    <Form onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit(item.guestbookId); }}>
                                        <Form.Group className="mb-2">
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                value={editingText}
                                                onChange={handleEditingTextChange}
                                            />
                                        </Form.Group>
                                        <div className="text-end">
                                            <Button variant="secondary" size="sm" className="me-2" onClick={handleCancelEdit}>
                                                취소
                                            </Button>
                                            <Button variant="primary" size="sm" type="submit">
                                                저장
                                            </Button>
                                        </div>
                                    </Form>
                                ) : (
                                    // --- ✅ 일반 모드 UI ---
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center mb-1">
                                                <strong>{item.guestname}</strong>
                                                <small className="text-muted ms-2">({new Date(item.createdAt).toLocaleString()})</small>
                                            </div>
                                            {item.category && categoryDisplay[item.category] && (
                                                <span className="badge bg-primary me-2 mb-2">
                                                    {categoryDisplay[item.category].emoji} {categoryDisplay[item.category].name}
                                                </span>
                                            )}
                                            <p className="mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>{item.message}</p>
                                        </div>
                                        {/* 포트폴리오 주인(편집모드)일 때만 수정/삭제 버튼 표시 */}
                                        {editMode && (
                                            <div className="flex-shrink-0">
                                                <Button variant="light" size="sm" className="p-1 me-1" onClick={() => handleEditClick(item)}>
                                                    <PencilSquare />
                                                </Button>
                                                <Button variant="light" size="sm" className="p-1" onClick={() => handleDelete(item.guestbookId)}>
                                                    <Trash />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            }
            {/* --- 글쓰기 폼 영역 --- */}
            {/* 주인이 아닐 때 항상 폼을 보여줌 (로그인 여부 무관) */}
            {!isHost && (
                <div className="feedback-form-container" style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    marginTop: 'var(--space-6)',
                    border: '1px solid var(--border)'
                }}>
                    {/* 헤더 섹션 */}
                    <div className="text-center mb-4">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginBottom: '0.5rem'
                        }}>
                            <div style={{
                                fontSize: '3rem'
                            }}>
                                💬
                            </div>
                            <h2 style={{
                                color: 'var(--text)',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                피드백 남기기
                            </h2>
                        </div>
                    </div>

                    {/* 정보 카드 */}
                    <div style={{
                        background: 'var(--accent-subtle)',
                        border: '1px solid var(--accent-border)',
                        borderRadius: 'var(--radius)',
                        padding: 'var(--space-4)',
                        marginBottom: 'var(--space-6)',
                        textAlign: 'center'
                    }}>
                        <small style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                            💡 익명으로 피드백을 남겨주세요. 포트폴리오 개선에 큰 도움이 됩니다!
                        </small>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        {/* 이름 입력 */}
                        <div className="mb-4">
                            <Form.Label style={labelStyle}>
                                표시할 이름
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이름을 입력하지 않으면 '익명'으로 표시됩니다"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                style={fieldStyle}
                            />
                        </div>

                        {/* 카테고리 선택 */}
                        <div className="mb-4">
                            <Form.Label style={labelStyle}>
                                피드백 카테고리
                            </Form.Label>
                            <Form.Select
                                value={feedbackCategory}
                                onChange={(e) => setFeedbackCategory(e.target.value)}
                                style={fieldStyle}
                            >
                                <option value="">카테고리 선택 (선택사항)</option>
                                <option value="기술 스택">💻 기술 스택</option>
                                <option value="프로젝트 완성도">🚀 프로젝트 완성도</option>
                                <option value="코드 품질">🔧 코드 품질</option>
                                <option value="UI/UX">🎨 UI/UX 디자인</option>
                                <option value="포트폴리오 구성">📄 포트폴리오 구성</option>
                                <option value="경력/경험">👨‍💼 경력/경험</option>
                                <option value="개선사항">💡 개선사항</option>
                                <option value="전반적 평가">⭐ 전반적 평가</option>
                            </Form.Select>
                        </div>

                        {/* 메시지 입력 */}
                        <div className="mb-4">
                            <Form.Label style={labelStyle}>
                                피드백 내용
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="포트폴리오에 대한 솔직하고 구체적인 피드백을 남겨주세요..."
                                name="message"
                                value={newMessage}
                                onChange={handleChange}
                                style={{ ...fieldStyle, minHeight: '150px', resize: 'vertical' }}
                            />
                        </div>

                        {/* 제출 버튼 */}
                        <Button
                            type="submit"
                            style={{
                                background: 'var(--accent)',
                                border: '1px solid var(--accent)',
                                borderRadius: 'var(--radius)',
                                padding: '0.85rem 2rem',
                                fontSize: 'var(--text-base)',
                                fontWeight: 700,
                                width: '100%',
                                color: 'var(--text-on-accent)'
                            }}
                        >
                            익명 피드백 등록하기
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default GuestBookPage;