import React from 'react'
import { useLoading } from '../../context/LoadingContext';
import Spinner from "react-bootstrap/Spinner";

const CommonSpinner = () => {
    const { loading } = useLoading();
    if (!loading) return null;
    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(255,255,255,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "saturate(180%) blur(2px)"
        }}>
            <Spinner animation="border" />
        </div>
    );
}

export default CommonSpinner