import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import MypagePage from '../user/MypagePage';
import './FloatingUserLayout.css';

const FloatingUserLayout = ({ 
    userInfo, 
    editMode, 
    showProfileModal, 
    setShowProfileModal,
    activeSection 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Hero 섹션을 지나면 플로팅 레이아웃 표시
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollPosition = window.scrollY + 100;
                setIsVisible(scrollPosition > heroBottom);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const navItems = [
        { id: 'hero', label: 'Home', icon: '🏠' },
        { id: 'about', label: 'About', icon: '👨‍💻' },
        { id: 'career', label: 'Career', icon: '💼' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'techstack', label: 'Skills', icon: '⚡' }
    ];

    return (
        <>
            <div className={`floating-user-layout ${isVisible ? 'visible' : ''}`}>
                {/* Profile Section */}
                <div className="floating-profile">
                    <div className="profile-avatar-wrapper">
                        <img
                            src={userInfo.photo || "/images/avatar-default.svg"}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    </div>
                    <div className="profile-info">
                        <h4 className="profile-name">{userInfo.username || ''}</h4>
                        <p className="profile-role">Fullstack Developer</p>
                        <div className="profile-contact">
                            {/* 연락처는 GitHub만 노출한다.
                                전화번호는 개인정보라 공개 프로필에 싣지 않고(본인은 마이페이지에서 확인),
                                이메일은 users 테이블에 컬럼 자체가 없다. */}
                            {userInfo.githubUrl && (
                                <div
                                    className="contact-item"
                                    onClick={() => window.open(userInfo.githubUrl, '_blank', 'noopener,noreferrer')}
                                >
                                    <span className="contact-icon">💻</span>
                                    <span className="contact-text">GitHub</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {editMode && (
                        <button
                            className="profile-settings-btn"
                            onClick={() => setShowProfileModal(true)}
                            title="프로필 설정"
                        >
                            ⚙️
                        </button>
                    )}
                </div>

                {/* Navigation Section */}
                <div className="floating-navigation">
                    <div className="nav-menu always-visible">
                        {navItems.map(({ id, label, icon }) => (
                            <button
                                key={id}
                                className={`nav-item ${activeSection === id ? 'active' : ''}`}
                                onClick={() => scrollToSection(id)}
                                title={label}
                            >
                                <span className="nav-icon">{icon}</span>
                                <span className="nav-label">{label}</span>
                                <div className="nav-ripple"></div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

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
                    <MypagePage setShowProfileModal={setShowProfileModal} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FloatingUserLayout;