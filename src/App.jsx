import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GuestBookPage from './pages/GuestBookPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutMePage from './pages/AboutMePage';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './components/projects/details/ProjectDetailPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutMePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="guestbook" element={<GuestBookPage />} />
            </Route>
        </Routes>
    );
}

export default App;
