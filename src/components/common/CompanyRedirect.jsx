import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const CompanyRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const company = searchParams.get('company');

        if (company) {
            sessionStorage.setItem('company', company);
        }

        const isDev = import.meta.env.DEV;
        const redirectPath = isDev ? '/test' : '/kis';

        navigate(redirectPath, { replace: true });
    }, [searchParams, navigate]);

    return null;
};

export default CompanyRedirect;