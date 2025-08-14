import React from 'react';
import { Card } from 'react-bootstrap';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import CommonHeroBanner from '../../../components/common/CommonHeroBanner';
import {
    FaReact, FaVuejs, FaNodeJs, FaPython, FaJava, FaGithub,
} from 'react-icons/fa';
import {
    SiTypescript, SiDjango, SiMongodb, SiMysql,
    SiSpring, SiJavascript, SiHtml5, SiCss3, SiNextdotjs, SiJira,
} from 'react-icons/si';

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

const StackPage = ({ stack = [] }) => {

    return (
        <>
            <style>{`
               .stack-chip-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

@media (max-width: 992px) {
  .stack-chip-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stack-chip-list {
    grid-template-columns: repeat(1, 1fr);
  }
}

            `}</style>
            <div className='my-4'>
                <CommonHeroBanner title="기술스택" size="compact" />
                <Card className="stack-card">
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
            </div>
        </>
    );
};

export default StackPage;