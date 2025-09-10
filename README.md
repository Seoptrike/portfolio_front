# 섭트폴리오 Frontend

[![Vercel Deploy](https://img.shields.io/badge/vercel-deployed-brightgreen?logo=vercel)](https://portfolio-front-dun.vercel.app/)

> React + Vite 기반의 개인 포트폴리오 관리 시스템 프론트엔드

---

## 🛠 기술 스택

- **React** 19.1.0 + **Vite** 7.0.0
- **Bootstrap** 5.3.7 + React Bootstrap
- **React Router DOM** 7.6.2
- **Axios** 1.10.0
- **Chart.js**, **TinyMCE**, **SweetAlert2**
- **ImageKit** (이미지 CDN)

---

## ⚡ 빠른 시작

```bash
# 클론 및 설치
git clone https://github.com/Seoptrike/portfolio_front.git
cd portfolio_front
npm install

# 환경변수 설정
cp .env.example .env.development
# .env.development에서 API URL 등 설정

# 개발 서버 실행
npm run dev
# → http://localhost:5173
```

---

## 🎯 주요 기능

- **포트폴리오 관리**: 프로젝트, 경력, 기술스택 CRUD
- **인증 시스템**: JWT 쿠키 기반 로그인
- **이미지 업로드**: ImageKit 연동
- **관리자 대시보드**: 시스템 모니터링
- **반응형 UI**: 모바일 퍼스트 디자인

---

## 📁 프로젝트 구조

```
src/
├── pages/          # 페이지 컴포넌트
├── components/     # 재사용 컴포넌트
├── api/           # API 통신
├── hooks/         # 커스텀 훅
├── layouts/       # 레이아웃
└── routes/        # 라우터 설정
```

---

## 🚀 배포

**Vercel 자동배포** - GitHub 푸시 시 자동 빌드/배포

- **Frontend**: https://portfolio-front-dun.vercel.app/
- **Backend API**: https://portfolio-back-prod.onrender.com

---

## 📜 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드  
npm run preview  # 빌드 미리보기
npm run lint     # 코드 린트
```