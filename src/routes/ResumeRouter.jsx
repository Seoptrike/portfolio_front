import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ResumeListPage from '../pages/resume/ResumeListPage'


const ResumeRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ResumeListPage />} />
        </Routes>
    )
}

export default ResumeRouter