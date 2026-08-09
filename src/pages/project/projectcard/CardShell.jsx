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
                borderRadius: 3,
                border: "1px solid var(--border)",
                overflow: "hidden",
                background: "var(--surface)",
                transition: "border-color var(--duration) var(--ease)",
                "&:hover": {
                    borderColor: "var(--border-strong)"
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
