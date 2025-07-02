import React from 'react'
import Layout from '../components/Layout';
import GuestBookPage from '../pages/GuestBookPage';
import ProjectsPage from '../pages/ProjectsPage';
import AboutMePage from '../pages/AboutMePage';
import HomePage from '../pages/HomePage';
import ProjectDetailPage from '../components/projects/details/ProjectDetailPage';
import AuthRouter from '../routes/AuthRouter';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/main/MainPage';

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="main/:username" element={<MainPage />} />
                <Route path="about/:username" element={<AboutMePage />} />
                <Route path="projects/:username" element={<ProjectsPage />} />
                <Route path="/projects/:username/:id" element={<ProjectDetailPage />} />
                <Route path="guestbook/:username" element={<GuestBookPage />} />
                <Route path="auth/*" element={<AuthRouter />} />
            </Route>
        </Routes>
    )
}

export default RouterConfig