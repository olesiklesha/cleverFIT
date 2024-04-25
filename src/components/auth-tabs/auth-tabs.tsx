import React from 'react';
import { AuthForm } from '@components/auth-form';
import { RegistrationForm } from '@components/registration-form';
import { AuthTabsKey, Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Tabs } from 'antd';

type AuthTabsProps = {
    activeTab: AuthTabsKey;
};

export const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab }) => {
    const handleTabClick = (activeKey: string) => {
        history.push(
            Number(activeKey) - 1 === AuthTabsKey.REGISTRATION ? Paths.REGISTRATION : Paths.AUTH,
        );
    };

    return (
        <React.Fragment>
            <div className='logo' />
            <Tabs defaultActiveKey={`${activeTab + 1}`} onTabClick={handleTabClick}>
                <Tabs.TabPane tab='Вход' key='1'>
                    <AuthForm />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Регистрация' key='2'>
                    <RegistrationForm />
                </Tabs.TabPane>
            </Tabs>
        </React.Fragment>
    );
};
