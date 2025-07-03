import React, { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import Chip from '@mui/material/Chip'

// 리액트 아이콘 import
import {
    FaReact, FaVuejs, FaNodeJs, FaPython, FaJava, FaGithub,
} from 'react-icons/fa'
import {
    SiTypescript, SiDjango, SiMongodb, SiMysql,
    SiSpring, SiJavascript, SiHtml5, SiCss3, SiNextdotjs, SiJira,
} from 'react-icons/si'

// 아이콘 매핑
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
}

const StackPage = ({ userID, username, EduHis, onSuccess }) => {
    const isAdmin = true
    const [showOptions, setShowOptions] = useState(false)
    const [selectedStacks, setSelectedStacks] = useState([])

    const techStacks = [
        'HTML', 'CSS', 'JavaScript', 'TypeScript',
        'React', 'Vue', 'Next.js', 'Node.js',
        'Python', 'Django',
        'Java', 'Spring Boot', 'MySQL', 'MongoDB',
        'GitHub', 'Jira',
    ]

    const handleCheck = (e) => {
        const { value, checked } = e.target
        setSelectedStacks((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        )
    }

    return (
        <>
            <style>{`
        .stack-card {
          padding: 1.5rem;
          margin: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 10px;
        }

        .stack-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stack-title {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .stack-options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem 1rem;
          margin-bottom: 1rem;
        }

        .stack-chip-container {
          padding: 1rem;
          border-radius: 8px;
        }

        .stack-chip-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .stack-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
      `}</style>

            <Card className="stack-card">
                <div className="stack-header">
                    <div className="stack-title">🛠️ 기술 스택</div>
                    {isAdmin && (
                        <Button
                            variant={showOptions ? 'success' : 'outline-success'}
                            size="sm"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            {showOptions ? '저장하기' : '선택하기'}
                        </Button>
                    )}
                </div>

                {showOptions && (
                    <Form className="stack-options">
                        {techStacks.map((stack, idx) => (
                            <Form.Check
                                key={idx}
                                type="checkbox"
                                id={`stack-${idx}`}
                                label={stack}
                                value={stack}
                                checked={selectedStacks.includes(stack)}
                                onChange={handleCheck}
                            />
                        ))}
                    </Form>
                )}

                {selectedStacks.length > 0 && (
                    <div className="stack-chip-container">
                        <div className="stack-chip-list">
                            {selectedStacks.map((s, i) => (
                                <Chip
                                    key={i}
                                    icon={stackIcons[s]}
                                    label={s}
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
                    </div>
                )}
            </Card>
        </>
    )
}

export default StackPage
