/**
 * 모바일 디바이스 감지를 위한 커스텀 훅
 * 화면 크기에 따라 모바일 여부를 실시간으로 감지하고 반환
 *
 * @fileoverview 반응형 디자인을 위한 모바일 디바이스 감지 React 훅
 */

import { useEffect, useState } from "react";

/**
 * 현재 화면 크기가 모바일인지 감지하는 커스텀 훅
 * MediaQuery API를 사용하여 실시간으로 화면 크기 변화를 감지
 *
 * @param {number} [breakpoint=768] - 모바일로 간주할 최대 너비 (px)
 * @returns {boolean} 현재 화면이 모바일인지 여부
 *
 * @example
 * const isMobile = useIsMobile(768);
 * const isTablet = useIsMobile(1024);
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileLayout /> : <DesktopLayout />}
 *   </div>
 * );
 */
export default function useIsMobile(breakpoint = 768) {
    /**
     * 현재 화면 크기가 breakpoint 이하인지 확인하는 내부 함수
     * SSR 환경에서는 false를 반환
     */
    const get = () =>
        typeof window !== "undefined"
            ? window.matchMedia(`(max-width:${breakpoint}px)`).matches
            : false;

    // 초기값을 즉시 계산하여 설정
    const [isMobile, setIsMobile] = useState(get);

    useEffect(() => {
        // SSR 환경에서는 실행하지 않음
        if (typeof window === "undefined") return;

        // MediaQuery 객체 생성
        const mq = window.matchMedia(`(max-width:${breakpoint}px)`);

        // 상태 변경 핸들러
        const handler = (e) => setIsMobile(e.matches);

        // 초기 상태 동기화 (혹시 모를 경우를 대비)
        setIsMobile(mq.matches);

        // 브라우저 호환성을 고려한 이벤트 리스너 등록
        if (mq.addEventListener) {
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        } else {
            // 구형 브라우저 지원
            mq.addListener(handler);
            return () => mq.removeListener(handler);
        }
    }, [breakpoint]); // breakpoint 변경 시 재실행

    return isMobile;
}
