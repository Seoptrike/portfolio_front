import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import AuthProvider from './providers/AuthProvider.jsx';
import LoadingProvider from './providers/LoadingProvider.jsx';
import api from './api/axiosInstance.js';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <LoadingProvider attachAxios={api}>
            <AuthProvider>
                <RouterConfig />
            </AuthProvider>
        </LoadingProvider>
    </BrowserRouter>
)
