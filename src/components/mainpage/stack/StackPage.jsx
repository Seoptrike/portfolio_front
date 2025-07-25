import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import {
    FaReact, FaVuejs, FaNodeJs, FaPython, FaJava, FaGithub,
} from 'react-icons/fa';
import {
    SiTypescript, SiDjango, SiMongodb, SiMysql,
    SiSpring, SiJavascript, SiHtml5, SiCss3, SiNextdotjs, SiJira,
} from 'react-icons/si';
import { AuthContext } from '../../../context/AuthContext';
import { getAllStack } from '../../../api/techStackApi';
import { insertUserStack, updateUserStack } from '../../../api/userStackApi';

const stackIcons = {
    HTML: <SiHtml5 color="#e34c26" />,
    CSS: <SiCss3 color="#264de4" />,
    JavaScript: <SiJavascript color="#f0db4f" />,
    TypeScript: <SiTypescript color="#007acc" />,
    React: <FaReact color="#61dafb" />,
    Vue: <FaVuejs color="#42b883" />,
    'Next.js': <SiNextdotjs />,
    'Node.js': <FaNodeJs color="#68a063" />,
    Python: <FaPython color="#3776ab" />,
    Django: <SiDjango color="#092e20" />,
    Java: <FaJava color="#f89820" />,
    'Spring Boot': <SiSpring color="#6db33f" />,
    MySQL: <SiMysql color="#00758f" />,
    MongoDB: <SiMongodb color="#47a248" />,
    GitHub: <FaGithub color="#000" />,
    Jira: <SiJira color="#0052CC" />,
};

const StackPage = ({ userID, username, stack = [], onSuccess }) => {
    const { isHost } = useContext(AuthContext);
    const [allStack, setAllStack] = useState([]);
    const [selectedStacks, setSelectedStacks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userID) {
            setSelectedStacks(stack.map(s => s.stack_id)); // 기존 스택 선택 처리
        }
    }, [userID, stack]);

    const fetchAllStacks = async () => {
        const res = await getAllStack('');
        setAllStack(res.data);
    };

    const handleEditToggle = async () => {
        if (!isEditing) {
            await fetchAllStacks();
        }
        setIsEditing(!isEditing);
    };

    const handleCheckboxChange = (stackId) => {
        setSelectedStacks(prev =>
            prev.includes(stackId)
                ? prev.filter(id => id !== stackId)
                : [...prev, stackId]
        );
    };

    const handleSave = async () => {
        const payload = {
            userId: userID,
            stackList: selectedStacks.map(id => ({
                stackId: id,
                score: 1
            }))
        };

        try {
            if (stack.length === 0) {
                await insertUserStack(payload);
                alert('스택이 추가되었습니다.');
            } else {
                await updateUserStack(payload);
                alert('스택이 수정되었습니다.');
            }
            setIsEditing(false);
            onSuccess();
        } catch (err) {
            console.error(err);
            alert('스택 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <style>{`
                .stack-chip-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                }
                .stack-checkboxes {
                    margin-top: 1rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 0.5rem;
                }
            `}</style>
            <Card className="stack-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <strong>기술스택</strong>
                    {isHost && !isEditing && (
                        <Button variant="outline-primary" size="sm" onClick={handleEditToggle}>
                            {stack.length > 0 ? '스택 수정하기' : '스택 추가하기'}
                        </Button>
                    )}
                </Card.Header>

                <Card.Body>
                    {isEditing ? (
                        <>
                            <div className="stack-checkboxes mb-3">
                                {allStack.map(item => (
                                    <Form.Check
                                        key={item.stack_id}
                                        type="checkbox"
                                        id={`stack-${item.stack_id}`}
                                        label={item.name}
                                        checked={selectedStacks.includes(item.stack_id)}
                                        onChange={() => handleCheckboxChange(item.stack_id)}
                                    />
                                ))}
                            </div>
                            <div className="d-flex gap-2">
                                <Button variant="success" onClick={handleSave}>저장</Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
                            </div>
                        </>
                    ) : (
                        <div className="stack-chip-list">
                            {stack.map((s) => (
                                <Chip
                                    key={s.user_stack_id}
                                    icon={stackIcons[s.stack_name] || null}
                                    label={s.stack_name}
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        fontSize: '1rem',
                                        height: 42,
                                        padding: '0 12px',
                                        '.MuiChip-icon': {
                                            fontSize: '1.4rem',
                                            marginLeft: '4px'
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default StackPage;
