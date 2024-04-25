import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { checkEmail } from '@redux/auth-slice/auth-slice-thunk.ts';
import { history } from '@redux/configure-store.ts';
import { authSelector } from '@redux/selectors.ts';
import { Button, Result } from 'antd';

import './email-error.css';

export const EmailError = () => {
    const { email } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        history.push(Paths.AUTH);
        if (email) {
            dispatch(checkEmail({ email }));
        }
    };

    return (
        <Result
            status='500'
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
            className='check-email-error'
            extra={[
                <Button
                    type='primary'
                    size='large'
                    onClick={handleClick}
                    key='btn'
                    data-test-id='check-back-button'
                >
                    Назад
                </Button>,
            ]}
        />
    );
};
