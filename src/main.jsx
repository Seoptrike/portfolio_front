import { createRoot } from 'react-dom/client'
// Bootstrap을 먼저 불러야 아래 index.css의 토큰이 최종 승자가 된다 (순서 바꾸지 말 것)
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from './theme/muiTheme.js';
import RouterConfig from './routes/RouterConfig';
import AuthProvider from './providers/AuthProvider.jsx';
import LoadingProvider from './providers/LoadingProvider.jsx';
import api from './api/axiosInstance.js';
import CommonSpinner from './components/common/CommonSpinner.jsx';
import { Analytics } from "@vercel/analytics/react";
import PageViewTracker from './analytics/PageViewTracker.jsx';

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
            <LoadingProvider attachAxios={api}>
                <AuthProvider>
                    <CommonSpinner />
                    <PageViewTracker />
                    <RouterConfig />
                    <Analytics />
                </AuthProvider>
            </LoadingProvider>
        </BrowserRouter>
    </ThemeProvider>
)
