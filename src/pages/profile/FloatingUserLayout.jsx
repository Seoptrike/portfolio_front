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

    // 전화번호 포맷팅 함수 (3-4-4 형식)
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        }
        return phoneNumber;
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
                            src={userInfo.photo || "/images/vite.svg"}
                            alt="Profile"
                            className="profile-avatar"
                        />
                    </div>
                    <div className="profile-info">
                        <h4 className="profile-name">김인섭</h4>
                        <p className="profile-role">Backend Developer</p>
                        <div className="profile-contact">
                            {/* 임시 이메일 주소 - 백엔드에서 데이터 받으면 userInfo.email로 변경 */}
                            <div
                                className="contact-item"
                                onClick={() => window.location.href = `mailto:dlstjq977@gmail.com`}
                            >
                                <span className="contact-icon">📧</span>
                                <span className="contact-text">dlstjq977@gmail.com</span>
                            </div>
                            {userInfo.email && userInfo.email !== 'dlstjq977@gmail.com' && (
                                <div
                                    className="contact-item"
                                    onClick={() => window.location.href = `mailto:${userInfo.email}`}
                                >
                                    <span className="contact-icon">📧</span>
                                    <span className="contact-text">{userInfo.email}</span>
                                </div>
                            )}
                            {userInfo.phone && (
                                <div 
                                    className="contact-item"
                                    onClick={() => window.location.href = `tel:${userInfo.phone.replace(/\D/g, '')}`}
                                >
                                    <span className="contact-icon">📱</span>
                                    <span className="contact-text">{formatPhoneNumber(userInfo.phone)}</span>
                                </div>
                            )}
                            {userInfo.github && (
                                <div 
                                    className="contact-item"
                                    onClick={() => window.open(userInfo.github, '_blank')}
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