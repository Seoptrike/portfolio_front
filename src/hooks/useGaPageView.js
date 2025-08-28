import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function useGaPageView(measurementId) {
    const location = useLocation();
    const lastPath = useRef("");

    useEffect(() => {
        if (!window.gtag) return;
        const path = location.pathname + location.search;
        if (lastPath.current === path) return; // (dev 중복 호출 방지)
        lastPath.current = path;

        window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: path,
        });
    }, [location, measurementId]);
}
