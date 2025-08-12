// YYYY-MM 헬퍼 모음 (문자열 비교가 안전해서 가급적 Date 생성 피함)

const YM_RE = /^\d{4}-\d{2}$/;
const YMD_RE = /^\d{4}-\d{2}-\d{2}/;

/** 무엇이 와도 YYYY-MM 문자열로 정규화. 실패시 "" */
export function toYearMonth(v) {
  if (!v) return "";
  if (typeof v === "string") {
    if (YM_RE.test(v)) return v;
    if (YMD_RE.test(v)) return v.slice(0, 7);
    // 2025/08/03 같은 케이스
    const s = v.replaceAll("/", "-");
    if (YMD_RE.test(s)) return s.slice(0, 7);
  }
  if (v instanceof Date && !isNaN(v)) {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }
  return "";
}

/** YYYY-MM → YYYY-MM-01 (서버 LocalDate용) */
export function ymToFirstDay(ym) {
  return ym ? `${ym}-01` : null;
}

/** YYYY-MM → 그 달 말일(YYYY-MM-DD) */
export function ymToLastDay(ym) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map(Number);
  const last = new Date(y, m, 0).getDate(); // 해당 월의 마지막 날
  return `${ym}-${String(last).padStart(2, "0")}`;
}

/** YYYY-MM 표시용: 2025-08 -> 2025.08 */
export function formatYM(ym, emptyText = "") {
  return ym ? ym.replace("-", ".") : emptyText;
}

/** a<b 이면 true (YYYY-MM 문자열 비교로 충분) */
export function ymLt(a, b) {
  return !!a && !!b && a < b;
}

/** end가 start보다 빠르면 start로 보정 */
export function clampEndYM(start, end) {
  if (!start || !end) return end || "";
  return end < start ? start : end;
}

/** 서버에서 받은 {startDate, endDate}를 폼값(YYYY-MM)으로 */
export function apiDatesToForm({ startDate, endDate }) {
  return {
    startDate: toYearMonth(startDate),
    endDate: toYearMonth(endDate),
  };
}

/** 폼값(YYYY-MM)을 서버 페이로드(LocalDate)로 변환 */
export function formToApiDates({ startDate, endDate }) {
  return {
    startDate: ymToFirstDay(startDate),
    endDate: endDate ? ymToLastDay(endDate) : null,
  };
}
