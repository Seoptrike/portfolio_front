import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StackPage from './stack/StackPage';
import ProjectDetailPage from '../project/ProjectDetailPage';
import MypagePage from '../user/MypagePage';
import WorkExperiencesItem from './career/WorkExperiencesItem';
import EduHistoryItem from './career/EduHistoryItem';
import FloatingUserLayout from './FloatingUserLayout';
import './ScrollableMainLayout.css';

const ScrollableMainLayout = ({
    userID,
    username,
    userCareers,
    userProject,
    userInfo,
    editMode,
    showProfileModal,
    setShowProfileModal,
    CallTotalAPI
}) => {
    // ScrollableMainLayout.css 스타일을 인라인으로 이동 - 상단 컬러바 제거
    const scrollableLayoutStyle = {
        position: 'relative',
        overflowX: 'hidden'
    };

    const heroSectionStyle = {
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    // CSS 스타일 적용 제거 (일단 모든 스타일 해제)


    const heroBackgroundStyle = {
        position: 'absolute',
        inset: '0',
        zIndex: '-1'
    };

    const heroGradientStyle = {
        position: 'absolute',
        inset: '0',
        background: 'linear-gradient(135deg, rgba(255, 138, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 25%, rgba(220, 53, 69, 0.1) 50%, rgba(13, 110, 253, 0.05) 75%, rgba(111, 66, 193, 0.1) 100%)'
    };

    const heroParticlesStyle = {
        position: 'absolute',
        inset: '0'
    };

    const heroContentStyle = {
        maxWidth: '1200px',
        width: '100%',
        padding: '0 2rem',
        textAlign: 'center'
    };

    const heroProfileStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
        marginBottom: '4rem'
    };

    const profileImageWrapperStyle = {
        position: 'relative',
        flexShrink: 0
    };

    const profileImageStyle = {
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 4px 8px rgba(255, 255, 255, 0.9)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };

    const heroTextStyle = {
        flex: 1,
        textAlign: 'left',
        maxWidth: '600px'
    };

    const heroTitleStyle = {
        fontSize: '3.5rem',
        fontWeight: '800',
        lineHeight: '1.2',
        color: '#1a1a1a',
        marginBottom: '1.5rem'
    };
    const [activeSection, setActiveSection] = useState('hero');
    const navigate = useNavigate();

    // 스크롤 위치에 따른 액티브 섹션 업데이트
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'career', 'projects', 'techstack'];
            const scrollPosition = window.scrollY + 100;
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 스무스 스크롤
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="scrollable-layout">

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-particles"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-profile">
                        <div className="profile-image-wrapper">
                            <img
                                src={userInfo.photo ? userInfo.photo : "/images/vite.svg"}
                                alt="Profile"
                                className="profile-image"
                            />
                            {editMode && (
                                <button
                                    className="profile-edit-btn"
                                    onClick={() => setShowProfileModal(true)}
                                    aria-label="프로필 설정"
                                >
                                    ⚙️
                                </button>
                            )}
                        </div>
                        <div className="hero-text">
                            <h1 className="hero-title">
                                시스템에 감칠맛을 더하고
                                <br />
                                도전을 통해 성장하는<br />
                                <span className="highlight">풀스택 개발자</span>입니다
                            </h1>
                            <p className="hero-subtitle">
                                실무 프로젝트와 개인 학습을 통해 <span className="metric">프론트엔드부터 백엔드까지</span>
                                <br />
                                다양한 기술 스택을 경험하며 성장하고 있는 개발자
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-number">5+</div>
                                    <div className="stat-label">개인 프로젝트</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">10+</div>
                                    <div className="stat-label">기술 스택</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">무한∞</div>
                                    <div className="stat-label">성장 가능성</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-indicator">
                        <div className="scroll-arrow"></div>
                        <span>Scroll Down</span>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="section-container">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <div className="intro-banner">
                                {userInfo.intro && <h3>{userInfo.intro}</h3>}
                                <p>
                                    전직 요리사에서 인테리어 시공를 거쳐 개발자로 전향한 특별한 경험을 가지고 있습니다.<br/>
                                    현재도 개발 관련 업무를 하고 있지만, 보다 더 전문적인 환경에서 기술적 도전과 성장을 추구하고 싶어<br/>
                                    새로운 기회를 모색하고 있습니다.
                                </p>
                            </div>
                            <div className="intro-action">
                                <button
                                    className="intro-btn"
                                    onClick={() => navigate(`/${username}/about`)}
                                >
                                    자기소개서 보러가기 →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Section */}
            <section id="career" className="career-section">
                <div className="section-container">
                    <h2 className="section-title">Career & Education</h2>
                    <div className="career-content">
                        <div className="career-left">
                            <EduHistoryItem
                                userID={userID}
                                username={username}
                                data={userCareers.educationHistory}
                                onSuccess={() => CallTotalAPI()}
                                hideTopBar={true}
                            />
                        </div>
                        <div className="career-right">
                            <WorkExperiencesItem
                                userID={userID}
                                username={username}
                                data={userCareers.workExperience}
                                onSuccess={() => CallTotalAPI()}
                                hideTopBar={true}
                            />
                        </div>
                    </div>
                    <div className="career-action">
                        <button 
                            className="career-btn"
                            onClick={() => navigate(`/${username}/resume`)}
                        >
                            경력기술서 보러가기 →
                        </button>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects-section">
                <div className="section-container">
                    <h2 className="section-title">Projects</h2>
                    <div className="projects-content">
                        <ProjectDetailPage projects={userProject} />
                    </div>
                    <div className="projects-action">
                        <button 
                            className="projects-btn"
                            onClick={() => navigate(`/${username}/project`)}
                        >
                            프로젝트 보러가기 →
                        </button>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section id="techstack" className="techstack-section">
                <div className="section-container">
                    <h2 className="section-title">Tech Stack</h2>
                    <div className="techstack-content">
                        <StackPage
                            userID={userID}
                            username={username}
                            stack={userCareers.stacks}
                            onSuccess={() => CallTotalAPI()}
                        />
                    </div>
                </div>
            </section>

            {/* Floating User Layout */}
            <FloatingUserLayout
                userInfo={userInfo}
                editMode={editMode}
                showProfileModal={showProfileModal}
                setShowProfileModal={setShowProfileModal}
                activeSection={activeSection}
            />

            {/* Profile Modal */}
            <Modal
                show={showProfileModal}
                onHide={() => setShowProfileModal(false)}
                size="lg"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>프로필 설정</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    <MypagePage setShowProfileModal />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ScrollableMainLayout;