import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
    const get = () =>
        typeof window !== "undefined"
            ? window.matchMedia(`(max-width:${breakpoint}px)`).matches
            : false;

    // ✅ 초기값을 즉시 boolean으로
    const [isMobile, setIsMobile] = useState(get);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia(`(max-width:${breakpoint}px)`);
        const handler = (e) => setIsMobile(e.matches);

        // 혹시 모를 재동기화
        setIsMobile(mq.matches);

        if (mq.addEventListener) {
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        } else {
            mq.addListener(handler);
            return () => mq.removeListener(handler);
        }
    }, [breakpoint]);

    return isMobile; // 항상 boolean
}
