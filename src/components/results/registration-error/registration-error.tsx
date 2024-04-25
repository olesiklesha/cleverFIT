import { Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Button, Result } from 'antd';

export const RegistrationError = () => {
    const handleClick = () => history.push(Paths.REGISTRATION);

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={[
                <Button
                    type='primary'
                    block={true}
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='registration-back-button'
                >
                    Назад к регистрации
                </Button>,
            ]}
        />
    );
};
