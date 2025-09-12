// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const portfolioUsername = import.meta.env.VITE_PORTFOLIO_USERNAME || 'kis';
    
    return (
        <div className="home-page">
            <div className="home-container">
                <header className="header">
                    <h1>🚀 Seopotfolio</h1>
                    <p className="subtitle">개발자를 위한 포트폴리오 플랫폼</p>
                    <div className="header-buttons">
                        <Link to="/auth/login" className="header-btn login-btn">로그인</Link>
                        <Link to={`/${portfolioUsername}`} className="header-btn portfolio-btn">개발자 포트폴리오 보기</Link>
                    </div>
                </header>

                <div className="intro">
                    <h2>📋 프로젝트 소개</h2>
                    <p>
                        <strong>Seopotfolio</strong>는 누구나 회원가입하여 자신의 <span className="highlight">자기소개서, 커리어, 경력기술서, 프로젝트</span>를 
                        업로드할 수 있는 포트폴리오 플랫폼입니다.
                    </p>
                    <p>
                        개발자들이 자신의 역량을 효과적으로 어필할 수 있도록 다양한 에디터와 시각화 기능을 제공하며,
                        <br/> 
                        현대적인 서버리스 아키텍처로 구축되어 높은 가용성과 확장성을 보장합니다.
                    </p>
                </div>

                <div className="project-goal">
                    <h2>🎯 프로젝트 목표</h2>
                    <p>
                        이 프로젝트는 <strong>서버리스 배포 경험을 쌓기 위한 목적</strong>으로 시작되었습니다. 
                        <br/>
                        프론트엔드부터 백엔드, 데이터베이스, CI/CD까지 모든 과정을 서버리스 환경에서 구현하여 
                        웹 개발 및 배포 경험을 습득하는 것이 주요 목표였습니다.
                    </p>
                </div>

                <div className="architecture">
                    <div className="section tech-stack">
                        <h3><span className="icon">🏗️</span>서버리스 아키텍처</h3>
                        <div className="tech-grid">
                            <div className="tech-item">
                                <h4>Frontend</h4>
                                <span className="badge">React + Vite</span>
                                <span className="badge">Vercel 배포</span>
                            </div>
                            <div className="tech-item">
                                <h4>Backend</h4>
                                <span className="badge">Spring Boot</span>
                                <span className="badge">Docker</span>
                                <span className="badge">Render 배포</span>
                            </div>
                            <div className="tech-item">
                                <h4>Database</h4>
                                <span className="badge">PostgreSQL</span>
                                <span className="badge">Render 호스팅</span>
                            </div>
                            <div className="tech-item">
                                <h4>DevOps</h4>
                                <span className="badge">GitHub Actions</span>
                                <span className="badge">Uptime Robot</span>
                                <span className="badge">ImageKit</span>
                            </div>
                        </div>
                    </div>

                    <div className="section features">
                        <h3><span className="icon">✨</span>핵심 기능</h3>
                        <ul>
                            <li><strong>회원가입 및 프로필 관리</strong> - 포트폴리오 생성</li>
                            <li><strong>자기소개 에디터</strong> - 리치 텍스트 에디터</li>
                            <li><strong>경력/기술서 작성</strong> - 마크다운 에디터</li>
                            <li><strong>프로젝트 갤러리</strong> - 프로젝트 관리</li>
                            <li><strong>기술 스택 자동 집계</strong> - 자동 별점 생성</li>
                            <li><strong>이미지 업로드</strong> - 최적화된 이미지 관리</li>
                            <li><strong>헬스체크</strong> - 서버 상태 모니터링</li>
                            <li><strong>CI/CD 파이프라인</strong> - 자동화된 배포</li>
                        </ul>
                    </div>

                    <div className="section">
                        <h3><span className="icon">📝</span>에디터 기능</h3>
                        <ul>
                            <li><strong>자기소개 에디터</strong> - 폰트, 색상 디자인</li>
                            <li><strong>마크다운 에디터</strong> - 경력 및 기술서 작성</li>
                            <li><strong>실시간 미리보기</strong> - 마크다운 렌더링</li>
                            <li><strong>코드 하이라이팅</strong> - 코드 블록 지원</li>
                        </ul>
                    </div>

                    <div className="section">
                        <h3><span className="icon">⚙️</span>자동화 기능</h3>
                        <ul>
                            <li><strong>기술 스택 자동 집계</strong> - 프로젝트에 체크한 기술만큼 별점 자동 증가</li>
                            <li><strong>반응형 디자인</strong> - 모바일부터 데스크톱까지 완벽 지원</li>
                            <li><strong>플로팅 네비게이션</strong> - 사용자 친화적인 인터페이스</li>
                            <li><strong>이미지 최적화</strong> - ImageKit을 통한 자동 이미지 최적화</li>
                        </ul>
                    </div>
                </div>

                <div className="section future-plans">
                    <h3><span className="icon">🔮</span>향후 개발 계획</h3>
                    <ul>
                        <li><strong>GitHub API 연동</strong> - 레포지토리를 직접 읽어서 자동으로 기술 스택 분석</li>
                        <li><strong>OpenAI 연동</strong> - AI가 자기소개서를 분석하여 메인 화면에 요약 제공</li>
                        <li><strong>추천 시스템</strong> - 기술 스택 기반 개발자 추천 기능</li>
                        <li><strong>팀 매칭</strong> - 프로젝트별 팀원 모집 및 매칭</li>
                        <li><strong>통계 대시보드</strong> - 개인 포트폴리오 조회수 및 분석 제공</li>
                    </ul>
                </div>

                <div className="developer-info">
                    <h3>👨‍💻 개발자: 김인섭 (풀스택 개발자)</h3>
                    <div className="contact">
                        <a href="mailto:dlstjq977@gmail.com" className="contact-item">
                            <span>📧</span>
                            <span>dlstjq977@gmail.com</span>
                        </a>
                        <a href="tel:010-4111-0342" className="contact-item">
                            <span>📱</span>
                            <span>010-4111-0342</span>
                        </a>
                    </div>
                </div>

                <footer className="footer">
                    <p>
                        프로젝트에 대한 문의나 협업 제안은 언제든 연락 주세요! 📩
                    </p>
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                        서버리스 아키텍처로 구축된 현대적인 포트폴리오 플랫폼 © 2024 김인섭
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;