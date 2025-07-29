import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
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

    return (
        <>
            <style>{`
                    .stack-chip-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.6rem;
                }

                /* 각 Chip의 기본 크기 설정 */
                .stack-chip-list .MuiChip-root {
                flex: 1 1 calc(25% - 0.6rem); /* 한 줄에 4개 */
                min-width: 120px;
                max-width: 25%;
                }

                /* 반응형: 화면이 작아지면 2개씩, 1개씩으로 조정 */
                @media (max-width: 992px) {
                .stack-chip-list .MuiChip-root {
                    flex: 1 1 calc(50% - 0.6rem); /* 2개 */
                    max-width: 50%;
                }
                }

                @media (max-width: 576px) {
                .stack-chip-list .MuiChip-root {
                    flex: 1 1 100%; /* 1개 */
                    max-width: 100%;
                }
                }
            `}</style>
            <Card className="stack-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <strong>기술스택</strong>
                </Card.Header>

                <Card.Body>
                    <div className="stack-chip-list">
                        {stack.map((s) => (
                            <Chip
                                key={s.stack_id}
                                icon={stackIcons[s.stack_name] || null}
                                label={
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '0.9rem' }}>{s.stack_name}</span>
                                        <Rating
                                            name={`rating-${s.stack_name}`}
                                            value={Math.min(s.usage_count || 0, 5)}
                                            readOnly
                                            precision={1}
                                            size="small"
                                            sx={{ mt: 0.3 }}
                                        />
                                    </div>
                                }
                                variant="outlined"
                                color="primary"
                                sx={{
                                    height: 'auto',
                                    padding: '6px 12px',
                                    '.MuiChip-icon': {
                                        fontSize: '1.4rem',
                                        marginLeft: '4px'
                                    }
                                }}
                            />
                        ))}
                    </div>

                </Card.Body>
            </Card>
        </>
    );
};

export default StackPage;