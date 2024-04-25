import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '@constants/index.ts';
import { Card, Layout } from 'antd';

import './result-page.css';

export const ResultPage: React.FC = () => {
    const location = useLocation();

    if (!location.state) {
        return <Navigate to={Paths.R_SWITCHER} />;
    }

    return (
        <Layout className='wrapper_enter'>
            <div className='blur'>
                <Card className='result-card'>
                    <Outlet />
                </Card>
            </div>
        </Layout>
    );
};
