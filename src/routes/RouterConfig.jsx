import React from 'react'
import GuestBookPage from '../pages/guestbook/GuestBookPage';
import ProjectsPage from '../pages/project/ProjectsPage';
import AboutMePage from '../pages/aboutme/AboutMePage';
import HomePage from '../pages/home/HomePage';
import ProjectDetailPage from '../components/projects/details/ProjectDetailPage';
import AuthRouter from '../routes/AuthRouter';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/profile/MainPage';
import Layout from '../Layout';
import NotFound from '../components/common/NotFound';
import ProjectRouter from './ProjectRouter';
import ResumeRouter from './ResumeRouter';

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="profile/:username" element={<MainPage/>} />
                <Route path="about/:username" element={<AboutMePage />} />
                <Route path="guestbook/:username" element={<GuestBookPage />} />
                <Route path="project/*" element={<ProjectRouter/>}/>
                <Route path="auth/*" element={<AuthRouter />} />
                <Route path="resume/*" element={<ResumeRouter/>}/>
                <Route path="notfound" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default RouterConfig