import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import AuthRouter from '../routes/AuthRouter';
import MainPage from '../pages/profile/MainPage';
import Layout from '../layouts/Layout';
import NotFound from '../components/common/NotFound';
import UserLayout from '../layouts/UserLayout';
import SearchPage from '../pages/search/SearchPage';
import RequireAdmin from "./RequireAdmin";
import CompanyRedirect from '../components/common/CompanyRedirect';

// 무거운 의존성(에디터·차트)이 딸린 화면은 지연 로드해 초기 번들에서 분리
const AboutMePage = lazy(() => import('../pages/aboutme/AboutMePage'));
const ResumeListPage = lazy(() => import('../pages/resume/ResumeListPage'));
const ProjectRouter = lazy(() => import('./ProjectRouter'));
const GuestBookPage = lazy(() => import('../pages/guestbook/GuestBookPage'));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

const RouterConfig = () => {
    return (
        <Suspense fallback={null}>
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
        </Suspense>
    )
}

export default RouterConfig