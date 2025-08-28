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
    const { isHost, loginName } = useContext(AuthContext); // 로그인한 사용자 정보와 주인 여부
    const { editMode } = useEditMode();
    // 2. State 설정
    const [list, setList] = useState([]); // 방명록 목록
    const [newMessage, setNewMessage] = useState(''); // 새로 작성할 메시지
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null); // 수정 중인 항목의 ID (null이면 수정 중 아님)
    const [editingText, setEditingText] = useState(''); // 수정 중인 항목의 새 메시지

    // 3. 데이터 로딩 함수
    const fetchList = async () => {
        try {
            const response = await fetchGuestBookList(username);
            setList(response.data);
        } catch (error) {
            navigate("/notfound")
        } finally {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return alert("메시지를 입력해주세요.");

        try {
            const data = { loginName: loginName, message: newMessage, username: username };
            await createGuestBook(data);
            setNewMessage(''); // 입력창 초기화
            fetchList(); // 목록 새로고침
        } catch (error) {
            console.error("방명록 작성에 실패했습니다.", error);
            alert(error.response?.data || "메시지 작성 중 오류가 발생했습니다.");
        }
    };

    const handleDelete = async (guestbookId) => {
        if (window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
            try {
                await deleteGuestBook(guestbookId);
                fetchList(); // 목록 새로고침
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
            fetchList(); // 목록 새로고침
        } catch (error) {
            console.error("방명록 수정에 실패했습니다.", error);
            alert(error.response?.data || "메시지 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <HeaderSection username={username}/>
            {/* --- 메시지 리스트 영역 --- */}
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
                                    <div>
                                        <strong>{item.guestname}</strong>
                                        <small className="text-muted ms-2">({new Date(item.createdAt).toLocaleString()})</small>
                                        <p className="mb-0 mt-1" style={{ whiteSpace: 'pre-line' }}>{item.message}</p>
                                    </div>
                                    {/* 로그인한 사용자가 주인 또는 작성자일 때만 버튼 표시 */}
                                    {(editMode || loginName === item.guestname) && (
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

            {/* --- 글쓰기 폼 영역 --- */}
            {/* 주인이 아니고, 로그인한 상태일 때만 폼을 보여줌 */}
            {!isHost && loginName && (
                <Card className="p-4 shadow-sm">
                    <h4 className="mb-3">📖 메시지 남기기</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            {/* '이름' 입력란은 로그인 정보로 대체되므로 삭제 */}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={`응원의 한마디를 남겨주세요!`}
                                name="message"
                                value={newMessage}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            남기기
                        </Button>
                    </Form>
                </Card>
            )}
        </div>
    );
}

export default GuestBookPage;