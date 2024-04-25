import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { registration } from '@redux/auth-slice/auth-slice-thunk.ts';
import { history } from '@redux/configure-store.ts';
import { authSelector } from '@redux/selectors.ts';
import { Button, Result } from 'antd';

export const RegistrationSaveError = () => {
    const { email, newPass } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        history.push(Paths.AUTH);

        if (email && newPass) {
            dispatch(registration({ email, password: newPass }));
        }
    };

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
            extra={[
                <Button
                    type='primary'
                    block={true}
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='registration-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
