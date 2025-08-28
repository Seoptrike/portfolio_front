import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import AuthProvider from './providers/AuthProvider.jsx';
import LoadingProvider from './providers/LoadingProvider.jsx';
import api from './api/axiosInstance.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import CommonSpinner from './components/common/CommonSpinner.jsx';
import { Analytics } from "@vercel/analytics/react";
import PageViewTracker from './analytics/PageViewTracker.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <LoadingProvider attachAxios={api}>
            <AuthProvider>
                <CommonSpinner/>
                <PageViewTracker/>
                <RouterConfig />
                <Analytics/>
            </AuthProvider>
        </LoadingProvider>
    </BrowserRouter>
)
