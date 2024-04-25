import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { changePassword } from '@redux/auth-slice/auth-slice-thunk.ts';
import { history } from '@redux/configure-store.ts';
import { authSelector } from '@redux/selectors.ts';
import { Button, Result } from 'antd';

export const ChangePassError = () => {
    const { newPass } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        if (!newPass) {
            history.push(Paths.AUTH);

            return;
        }

        history.push(Paths.CHANGE_PASS, { isAfterRequest: true });
        dispatch(changePassword({ password: newPass, confirmPassword: newPass }));
    };

    return (
        <Result
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={[
                <Button
                    block={true}
                    type='primary'
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='change-retry-button'
                >
                    Повторить
                </Button>,
            ]}
        />
    );
};
