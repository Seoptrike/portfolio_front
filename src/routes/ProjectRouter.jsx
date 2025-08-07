import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectListPage from '../pages/project/ProjectListPage'
import ProjectInsertPage from '../pages/project/ProjectInsertPage'
import ProjectUpdatePage from '../pages/project/ProjectUpdatePage'

const ProjectRouter = () => {
    return (
        <Routes>
            <Route path="/insert/:username" element={<ProjectInsertPage />} />
            <Route path="/:username" element={<ProjectListPage />} />
            <Route path="/update/:username/:projectId" element={<ProjectUpdatePage />} />
        </Routes>
    )
}

export default ProjectRouter