import React from 'react'
import GuestBookPage from '../pages/guestbook/GuestBookPage';
import AboutMePage from '../pages/aboutme/AboutMePage';
import HomePage from '../pages/home/HomePage';
import AuthRouter from '../routes/AuthRouter';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/profile/MainPage';
import Layout from '../Layout';
import NotFound from '../components/common/NotFound';
import ProjectRouter from './ProjectRouter';
import ResumeRouter from './ResumeRouter';
import UserLayout from '../UserLayout';
import SearchPage from '../pages/search/SearchPage';
import MypagePage from '../pages/user/MypagePage';

const RouterConfig = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* 전역 스코프 */}
                <Route index element={<HomePage />} />
                <Route path="auth/*" element={<AuthRouter />} />
                <Route path="search" element={<SearchPage/>}/>
                <Route path=":username/mypage" element= {<MypagePage/>}/>
                {/* 유저 스코프 */}
                <Route path=":username" element={<UserLayout />}>
                    <Route index element={<MainPage />} />              {/* /:username */}
                    <Route path="about" element={<AboutMePage />} />    {/* /:username/about */}
                    <Route path="guestbook" element={<GuestBookPage />} />
                    <Route path="project/*" element={<ProjectRouter />} />
                    <Route path="resume/*" element={<ResumeRouter />} />
                </Route>

                {/* 그 외 */}
                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />             {/* 404 핸들링 */}
            </Route>
        </Routes>
    )
}

export default RouterConfig