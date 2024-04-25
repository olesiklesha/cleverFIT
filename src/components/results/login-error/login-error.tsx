import React from 'react';
import { Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Button, Result } from 'antd';

export const LoginError: React.FC = () => {
    const handleClick = () => {
        history.push(Paths.AUTH);
    };

    return (
        <Result
            status='warning'
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз'
            extra={[
                <Button
                    type='primary'
                    block={true}
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='login-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
