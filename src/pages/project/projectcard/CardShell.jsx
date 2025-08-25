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
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                transition: "box-shadow .2s ease, transform .1s ease",
                "&:hover": editMode ? { boxShadow: 6, transform: "translateY(-2px)" } : undefined,
                cursor: editMode ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {children}
        </Card>
    );
};

export default CardShell;
