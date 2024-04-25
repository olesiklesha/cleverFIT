import React from 'react';
import { Header } from '@components/header';
import { ProfileForm } from '@components/profile-form';
import { Content } from 'antd/es/layout/layout';

import './profile-page.css';

export const ProfilePage = () => (
    <React.Fragment>
        <Header />
        <Content className='page-content profile-content'>
            <ProfileForm />
        </Content>
    </React.Fragment>
);
