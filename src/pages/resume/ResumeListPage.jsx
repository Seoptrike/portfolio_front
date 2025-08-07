import React from 'react';
import { Container, Accordion, Badge, ListGroup } from 'react-bootstrap';

// ✅ 방금 다듬은 경력 내용을 UI에 맞는 데이터 구조로 정리했습니다.
const careerHistory = [
    {
        eventKey: '0',
        company: '넷컴솔루션',
        period: '2024.10 - 2025.10', // 실제 재직 기간으로 수정하세요.
        role: 'AI 컨설턴트 (Voicebot/Chatbot)',
        description: 'KT AICC 플랫폼 기반의 보이스봇/챗봇 솔루션을 통해 고객사의 비즈니스 문제를 해결했습니다. 대화형 AI 성능 최적화, 안정적인 시스템 아키텍처 설계를 포함한 기술 컨설팅을 수행했습니다.',
        achievements: [
            '멀티모달(음성+화면) 대화형 AI 시나리오 설계 및 개발 (유성구청)',
            'NLU 성능 향상을 위한 예문 데이터 재설계 및 의도(Intent)/개체(Entity) 사전 구조 개편을 통한 음성 인식률 개선 (대전 서구청)',
            '상담원 그룹 및 업무 시간에 따른 동적 담당자 배정 로직 설계 및 구현 (유성구청)',
            '기존 다이얼로그 플로우의 안정성 강화를 위한 예외 처리 및 오류 방지 아키텍처 설계 (대전 서구청)',
            '로그 분석 기반의 문제 원인 파악 및 해결을 통한 초기 시스템 안정화 (남이섬)',
        ],
        techStack: ['KT AICC', 'VUI/CUI Design', 'NLU', 'ASR Tuning', 'Dialogue Flow']
    }
];

// 날짜 포맷을 'YYYY.MM' 형식으로 바꿔주는 헬퍼 함수
const formatDate = (dateString) => {
    if (!dateString) return '현재';
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const CareerPage = () => {
    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center">💼 경력 기술서</h2>

            <Accordion defaultActiveKey="0" alwaysOpen>
                {careerHistory.map(career => (
                    <Accordion.Item eventKey={career.eventKey} key={career.eventKey} className="mb-3 shadow-sm">
                        <Accordion.Header>
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <strong style={{ fontSize: '1.1rem' }}>{career.company}</strong>
                                    <span className="text-muted">{career.period}</span>
                                </div>
                                <div className="text-muted small mt-1">{career.role}</div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className="text-muted">{career.description}</p>
                            <h6 className="mt-4">주요 성과</h6>
                            <ListGroup variant="flush" className="mb-3">
                                {career.achievements.map((item, index) => (
                                    <ListGroup.Item key={index} className="ps-0 border-0">
                                        • {item}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <h6 className="mt-4">관련 기술</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {career.techStack.map((tech, index) => (
                                    <Badge pill bg="light" text="dark" key={index} className="border px-2 py-1 fw-normal">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default CareerPage;