import React, { useState } from 'react';

const Pododoc = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <>
            <style>
                {`
        .pododoc-container {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
        }

        .project-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        .project-subtitle {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.2rem;
        }

        .divider {
          border: none;
          border-top: 1px solid #eee;
          margin: 1.5rem 0;
        }

        .project-section {
          margin-bottom: 1.5rem;
        }

        .project-section h4 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }

        .project-section ul {
          padding-left: 1.2rem;
        }

        .project-section a {
          color: #007acc;
          text-decoration: none;
        }

        .project-section a:hover {
          text-decoration: underline;
        }

        .image-upload {
          margin: 1rem 0;
        }

        .thumbnail {
          margin-top: 1rem;
          width: 200px;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.2);
        }
        `}
            </style>

            <div className="pododoc-container">
                <h2 className="project-title">🍇 Pododoc</h2>
                {/* 이미지 업로드 섹션 */}
                <section className="project-section image-upload">
                    <h4>🖼️ 이미지 업로드</h4>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="업로드 미리보기"
                            className="thumbnail"
                        />
                    )}
                </section>
                <p className="project-subtitle">
                    문서 기반 지식관리 시스템 구축 프로젝트. 팀 협업과 문서 작성의 편의성을 극대화한 플랫폼입니다.
                </p>

                <hr className="divider" />

                <section className="project-section">
                    <h4>📌 사용 기술</h4>
                    <ul>
                        <li>React, React Router</li>
                        <li>Node.js, Express</li>
                        <li>Firebase Auth, Firestore</li>
                    </ul>
                </section>

                <section className="project-section">
                    <h4>✨ 주요 기능</h4>
                    <ul>
                        <li>실시간 협업 문서 편집</li>
                        <li>카테고리 기반 문서 관리</li>
                        <li>권한 기반 문서 접근 제어</li>
                        <li>검색 및 필터 기능</li>
                    </ul>
                </section>

                <section className="project-section">
                    <h4>👨‍💻 맡은 역할</h4>
                    <p>프론트엔드 개발 / 로그인 및 라우팅 / 실시간 문서 에디터 구현</p>
                </section>

                <section className="project-section">
                    <h4>🔗 링크</h4>
                    <ul>
                        <li><a href="https://github.com/your-username/pododoc" target="_blank" rel="noreferrer">GitHub 저장소</a></li>
                        <li><a href="https://pododoc.web.app" target="_blank" rel="noreferrer">배포 링크</a></li>
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Pododoc;
