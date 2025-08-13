// providers/EditModeProvider.jsx
import React, { useEffect, useMemo, useState } from "react";
import { EditModeContext } from "../context/EditModeContext";

export default function EditModeProvider({ children, isHost, username, persist = false }) {
    const storageKey = `edit:${username}`;
    const [editMode, setEditMode] = useState(false);

    // username 바뀌면 초기화
    useEffect(() => {
        if (persist) {
            const saved = sessionStorage.getItem(storageKey);
            setEditMode(saved === "1");
        } else {
            setEditMode(false);
        }
    }, [username, persist, storageKey]);

    // host가 아니면 무조건 off
    useEffect(() => {
        if (!isHost) setEditMode(false);
    }, [isHost]);

    // persist 옵션 세션 저장
    useEffect(() => {
        if (!persist) return;
        sessionStorage.setItem(storageKey, editMode ? "1" : "0");
    }, [persist, storageKey, editMode]);

    const value = useMemo(
        () => ({
            editMode,
            setEditMode, // ✅ 값만 넣어주는 setter
        }),
        [editMode]
    );

    return (
        <EditModeContext.Provider value={value}>
            {children}
        </EditModeContext.Provider>
    );
}
