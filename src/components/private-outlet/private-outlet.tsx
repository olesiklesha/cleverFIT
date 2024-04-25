import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@components/sidebar';
import { Paths } from '@constants/index.ts';
import { Layout } from 'antd';

export const PrivateOutlet = () => {
    const location = useLocation();

    if (location.pathname === Paths.R_SWITCHER) return <Navigate to={Paths.MAIN} />;

    return (
        <Layout className='wrapper'>
            <Sidebar />
            <Layout className='main-container'>
                <Outlet />
            </Layout>
        </Layout>
    );
};
