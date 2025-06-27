import React, { useState } from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import './NcsPage.css'
import ProjectTemplate from '../projects/ProjectTemplate'

const projects = [
    {
        id: 'eatcha',
        title: 'EatCha',
        img: 'vite.svg',
        props: {
            title: '🍱 EatCha',
            subtitle: '음식 리뷰 기반 맛집 추천 플랫폼',
            tech: ['React', 'Express', 'MongoDB'],
            features: ['리뷰 등록 및 조회', '음식 기반 검색', '즐겨찾기 기능'],
            role: '프론트엔드 및 백엔드 전체 개발',
            links: {
                github: 'https://github.com/your-username/eatcha',
                demo: 'https://eatcha.app'
            },
            enableImageUpload: false
        }
    },
    {
        id: 'greenlog',
        title: 'GreenLog',
        img: 'vite.svg',
        props: {
            title: '🌿 GreenLog',
            subtitle: '환경 보호 실천 기록 서비스',
            tech: ['Vue', 'Firebase'],
            features: ['일별 실천 기록', '캘린더 뷰', '배지 시스템'],
            role: '프론트엔드 개발, DB 설계',
            links: {
                github: 'https://github.com/your-username/greenlog',
                demo: 'https://greenlog.app'
            },
            enableImageUpload: true
        }
    },
    {
        id: 'pododoc',
        title: 'Pododoc',
        img: 'vite.svg',
        props: {
            title: '🍇 Pododoc',
            subtitle: '문서 기반 협업 시스템',
            tech: ['React', 'Firebase', 'Express'],
            features: ['실시간 문서 편집', '공동 작성 기능', '권한 관리'],
            role: '프론트엔드, 에디터 구현',
            links: {
                github: 'https://github.com/your-username/pododoc',
                demo: 'https://pododoc.app'
            },
            enableImageUpload: true
        }
    }
]
const NcsPage = () => {
    const [openId, setOpenId] = useState(null)

    const toggle = (id) => {
        setOpenId(prev => (prev === id ? null : id)) // 같은 ID 클릭 시 닫힘
    }

    return (
        <div className="ncs-container">
            <h2 className="ncs-title">Projects</h2>
            <Row className="g-4">
                {projects.map(({ id, title, img }) => (
                    <Col xs={12} md={6} lg={4} key={id}>
                        <Card className="project-card text-center">
                            <div onClick={() => toggle(id)} style={{ cursor: 'pointer' }}>
                                <img src={img} alt={`${title} Thumbnail`} style={{ width: '50%', borderRadius: '10px' }} />
                                <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                                    {openId === id ? '▲ 닫기' : '▼ 자세히 보기'}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Row 아래에 상세 내용 토글 */}
            {openId && (
                <div style={{ marginTop: '2rem' }}>
                    <ProjectTemplate {...projects.find(p => p.id === openId).props} />
                </div>
            )}
        </div>
    )
}

export default NcsPage
