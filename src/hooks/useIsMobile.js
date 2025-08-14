import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
    const get = () =>
        typeof window !== "undefined"
            ? window.matchMedia(`(max-width:${breakpoint}px)`).matches
            : false;

    const [isMobile, setIsMobile] = useState(get);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia(`(max-width:${breakpoint}px)`);

        const handler = (e) => setIsMobile((e && e.matches) ?? mq.matches);

        // 초기 동기화
        handler();

        if (mq.addEventListener) {
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        } else {
            // 사파리 구버전 대응
            mq.addListener(handler);
            return () => mq.removeListener(handler);
        }
    }, [breakpoint]);

    return isMobile;
}
