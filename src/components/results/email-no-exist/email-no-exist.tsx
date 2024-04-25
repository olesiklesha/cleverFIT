import React from 'react';
import { Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Button, Result } from 'antd';

import './email-no-exist.css';

export const EmailNoExist: React.FC = () => {
    const handleClick = () => {
        history.push(Paths.AUTH);
    };

    return (
        <Result
            status='error'
            title='Такой e-mail не зарегистрирован'
            subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
            className='email-no-exist-pass-result'
            extra={[
                <Button
                    type='primary'
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='check-retry-button'
                >
                    Попробовать снова
                </Button>,
            ]}
        />
    );
};
