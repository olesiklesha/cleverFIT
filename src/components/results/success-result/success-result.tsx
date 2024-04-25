import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Button, Result } from 'antd';

import { LocationState } from '../../../models';

export const SuccessResult = () => {
    const locationState: null | LocationState = useLocation().state;
    const titleText = locationState?.afterChangePass
        ? 'Пароль успешно изменен'
        : 'Регистрация успешна';
    const subTitleText = locationState?.afterChangePass
        ? 'Теперь можно войти в аккаунт, используя свой логин и новый пароль'
        : 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.';

    const handleClick = () => history.push(Paths.AUTH);

    return (
        <Result
            status='success'
            title={titleText}
            subTitle={subTitleText}
            extra={[
                <Button
                    type='primary'
                    block={true}
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id={
                        locationState?.afterChangePass
                            ? 'change-entry-button'
                            : 'registration-enter-button'
                    }
                >
                    {locationState?.afterChangePass ? 'Вход' : 'Войти'}
                </Button>,
            ]}
        />
    );
};
