import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectListPage from '../pages/project/ProjectListPage'
import ProjectUpsertPage from '../pages/project/ProjectUpsertPage'

const ProjectRouter = () => {
    return (
        <Routes>
            <Route path="/insert/:username" element={<ProjectUpsertPage />} />
            <Route path="/:username" element={<ProjectListPage />} />
            <Route path="/update/:username/:projectId" element={<ProjectUpsertPage />} />
        </Routes>
    )
}

export default ProjectRouter