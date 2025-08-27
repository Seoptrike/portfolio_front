# 섭트폴리오 (SeoP Portfolio)

[![Frontend Deploy](https://img.shields.io/badge/vercel-deployed-brightgreen?logo=vercel)](https://portfolio-front-dun.vercel.app/)
[![Backend Deploy](https://img.shields.io/badge/render-deployed-blue?logo=render)](https://portfolio-back-prod.onrender.com)
[![UptimeRobot status](https://img.shields.io/uptimerobot/status/ur3080415-95ab227abd22404eb3bef434)](https://stats.uptimerobot.com/ur3080415-95ab227abd22404eb3bef434)
[![CI/CD](https://github.com/Seoptrike/portfolio_back/actions/workflows/deploy.yml/badge.svg)](https://github.com/Seoptrike/portfolio_back/actions)

---

## 개요
개인 포트폴리오를 효율적으로 관리하고 공유할 수 있는 웹 애플리케이션.  
회원가입 후 학력, 경력, 기술 스택, 프로젝트를 등록하고 이미지 업로드 가능.

## 기술 스택
- **Frontend**: React + Vite, MUI → Vercel 배포  
- **Backend**: Spring Boot + Gradle, Spring Security (JWT 쿠키 기반 인증), MyBatis → Render 배포  
- **Database**: PostgreSQL  
- **Infra/기타**: ImageKit(이미지 업로드), UptimeRobot(헬스체크)  
- **CI/CD**: Vercel 자동배포, GitHub Actions → Render 자동배포  

## 현재 구현된 기능 (v1.0)
- 회원가입/로그인 (JWT 인증)  
- 학력, 경력, 기술 스택, 프로젝트 CRUD  
- 이미지 업로드(ImageKit)  
- 헬스체크(`/health`) 및 모니터링  
- CI/CD 자동화  

## 문제 인식 및 개선 필요성
과거 학원 프로젝트는 배포 불가/기능 위주 → 보안·운영·테스트 부족.  
이번 프로젝트에서는 단순 기능 구현에서 **운영 가능한 서비스**로 끌어올리는 것을 목표.

## 개선 로드맵 (2025.08 ~ 2025.09 진행 중)
- **프론트엔드**: ESLint/Prettier 적용 ✅, UI 컴포넌트 분리, 라우트 lazy-loading  
- **백엔드**: Dead Code 정리, MyBatis 네이밍 정비, Swagger 도입 예정, k6 부하 테스트 예정  
- **공통**: JUnit 단위/통합 테스트, ERD/아키텍처 다이어그램, Runbook/ADR 기록  

## 성과 및 학습 포인트
- MVP 실제 배포 → 서비스 단위 운영 경험  
- 보안(JWT), 품질(코드 정리/테스트), 운영(CI/CD, 헬스체크) 고려  
- 개선 로드맵 기반 지속 성장 경험  

## 배포 주소
- Frontend: [https://portfolio-front-dun.vercel.app/](https://portfolio-front-dun.vercel.app/)  
- Backend: [https://portfolio-back-prod.onrender.com](https://portfolio-back-prod.onrender.com)  
- Swagger (예정): `/swagger-ui.html`  
- Healthcheck: `/health`  
