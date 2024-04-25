import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '@redux/configure-store.ts';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';

import './settings-header.css';

export const SettingsHeader = () => {
    const handleClick = () => history.back();

    return (
        <Header className='settings-header'>
            <Button
                icon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
                type='text'
                onClick={handleClick}
                data-test-id='settings-back'
            />
            <Title level={2}>Настройки</Title>
        </Header>
    );
};
