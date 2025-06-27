import React, { useState } from 'react';

const ProjectTemplate = ({
  title,
  subtitle,
  tech = [],
  features = [],
  role,
  links = {},
  enableImageUpload = false
}) => {
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
        .project-container {
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

      <div className="project-container">
        <h2 className="project-title">{title}</h2>

        {enableImageUpload && (
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
        )}

        {subtitle && <p className="project-subtitle">{subtitle}</p>}

        <hr className="divider" />

        {tech.length > 0 && (
          <section className="project-section">
            <h4>📌 사용 기술</h4>
            <ul>{tech.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </section>
        )}

        {features.length > 0 && (
          <section className="project-section">
            <h4>✨ 주요 기능</h4>
            <ul>{features.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </section>
        )}

        {role && (
          <section className="project-section">
            <h4>👨‍💻 맡은 역할</h4>
            <p>{role}</p>
          </section>
        )}

        {Object.keys(links).length > 0 && (
          <section className="project-section">
            <h4>🔗 링크</h4>
            <ul>
              {links.github && (
                <li>
                  <a href={links.github} target="_blank" rel="noreferrer">GitHub 저장소</a>
                </li>
              )}
              {links.demo && (
                <li>
                  <a href={links.demo} target="_blank" rel="noreferrer">배포 링크</a>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </>
  );
};

export default ProjectTemplate;
