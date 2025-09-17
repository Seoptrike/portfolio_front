import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';

import GuestBookPage from '../pages/guestbook/GuestBookPage';
import AboutMePage from '../pages/aboutme/AboutMePage';
import HomePage from '../pages/home/HomePage';
import AuthRouter from '../routes/AuthRouter';
import MainPage from '../pages/profile/MainPage';
import Layout from '../layouts/Layout';
import NotFound from '../components/common/NotFound';
import ProjectRouter from './ProjectRouter';
import ResumeListPage from '../pages/resume/ResumeListPage';
import UserLayout from '../layouts/UserLayout';
import SearchPage from '../pages/search/SearchPage';
import RequireAdmin from "./RequireAdmin";
import CompanyRedirect from '../components/common/CompanyRedirect';

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

const RouterConfig = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* 전역 스코프 */}
                <Route index element={<HomePage />} />
                <Route path="auth/*" element={<AuthRouter />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="company" element={<CompanyRedirect />} />

                {/* 유저 스코프 */}
                <Route path=":username" element={<UserLayout />}>
                    <Route index element={<MainPage />} />              {/* /:username */}
                    <Route path="about" element={<AboutMePage />} />    {/* /:username/about */}
                    <Route path="guestbook" element={<GuestBookPage />} />
                    <Route path="project/*" element={<ProjectRouter />} />
                    <Route path="resume" element={<ResumeListPage />} />
                </Route>
                {/* 관리자 스코프 */}
                <Route
                    path="admin/*"
                    element={
                        <RequireAdmin>
                            <AdminLayout />
                        </RequireAdmin>
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>

                {/* 그 외 */}
                <Route path="notfound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />             {/* 404 핸들링 */}
            </Route>

        </Routes>
    )
}

export default RouterConfig