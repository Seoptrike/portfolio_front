import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectListPage from '../pages/project/ProjectListPage'
import ProjectInsertPage from '../pages/project/ProjectInsertPage'

const ProjectRouter = () => {
    return (
        <Routes>
            <Route path="/:username" element={<ProjectListPage />} />
            <Route path="/insert/:username" element={<ProjectInsertPage/>}/>
        </Routes>
    )
}

export default ProjectRouter