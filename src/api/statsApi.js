import axios from './axiosInstance';

// UptimeRobot (logs/responseTimes 토글 가능)
export const fetchUptimeRobot = () =>
  axios.get('/api/admin/uptimerobot/monitors');

// Infra 핑 (Vercel / Render 상태+레이턴시)
export const fetchInfraPings = () =>
  axios.get('/api/admin/infra/pings');

// --- Stats (대시보드) ---

// KPI 카드: 오늘 DAU, 최근30일 MAU, 오늘 가입자, 활성 회원수
export const fetchStatsKpis = (excludeInternal = true) =>
  axios.get('/api/admin/stats/kpis', { params: { excludeInternal } });

// DAU 시계열 (기본 최근 7일)
export const fetchDauRange = ({ startDate, endDate, excludeInternal = true } = {}) =>
  axios.get('/api/admin/stats/dau/range', {
    params: { startDate, endDate, excludeInternal },
  });

// 오늘/어제 DAU 비교
export const fetchDauCompare = (excludeInternal = true) =>
  axios.get('/api/admin/stats/dau/compare', { params: { excludeInternal } });

// 가입자 시계열 (기본 최근 7일)
export const fetchSignupRange = ({ startDate, endDate } = {}) =>
  axios.get('/api/admin/stats/signups/range', {
    params: { startDate, endDate },
  });

// 최근 로그인 사용자 (기본 24시간, 20명)
export const fetchRecentLogins = ({ sinceHours = 24, limit = 20 } = {}) =>
  axios.get('/api/admin/stats/logins/recent', {
    params: { sinceHours, limit },
  });

// 활성 일반회원 수 (role=1)
export const fetchActiveUserCount = () =>
  axios.get('/api/admin/stats/users/active-count');