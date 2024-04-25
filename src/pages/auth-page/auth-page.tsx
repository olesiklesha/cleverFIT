import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@constants/index.ts';
import { getToken } from '@utils/helpers.ts';
import { Card, Layout } from 'antd';

import './auth-page.css';

export const AuthPage: React.FC = () => {
    const isAuth = getToken();

    if (isAuth) {
        return <Navigate to={Paths.MAIN} />;
    }

    return (
        <Layout className='wrapper_enter'>
            <div className='blur'>
                <Card className='auth-card'>
                    <Outlet />
                </Card>
            </div>
        </Layout>
    );
};
