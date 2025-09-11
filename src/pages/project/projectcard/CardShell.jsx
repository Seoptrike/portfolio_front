// components/ProjectCard/CardShell.jsx
import React from "react";
import { Card } from "@mui/material";

const CardShell = ({ children, onUpdate, editMode }) => {
    const handleKey = (e) => {
        if (!editMode) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onUpdate();
        }
    };

    return (
        <Card
            elevation={0}
            role={editMode ? "button" : undefined}
            tabIndex={editMode ? 0 : -1}
            onKeyDown={handleKey}
            onClick={editMode ? onUpdate : undefined}
            sx={{
                borderRadius: 4,
                border: "1px solid rgba(0,0,0,0.2)",
                overflow: "hidden",
                background: "transparent", // 투명 배경
                boxShadow: `
                    0 4px 16px rgba(0,0,0,0.06),
                    inset 0 1px 0 rgba(255,255,255,0.9),
                    inset 0 -1px 0 rgba(0,0,0,0.05)
                `,
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transformStyle: "preserve-3d", // 3D 변환 활성화
                "&:hover": {
                    transform: "translateY(-8px) rotateX(5deg) rotateY(2deg) scale(1.02)", // 실제 3D 회전
                    boxShadow: `
                        0 12px 30px rgba(0,0,0,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.9),
                        inset 0 -1px 0 rgba(0,0,0,0.05)
                    `
                },
                cursor: editMode ? "pointer" : "default",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {children}
        </Card>
    );
};

export default CardShell;
