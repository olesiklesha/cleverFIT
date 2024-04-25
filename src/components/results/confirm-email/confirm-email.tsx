import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { confirmEmail } from '@redux/auth-slice/auth-slice-thunk.ts';
import { authSelector } from '@redux/selectors.ts';
import { Result } from 'antd';

import { Nullable } from '../../../models';

import './confirm-email.css';

const Subtitle: React.FC<{ email: Nullable<string> }> = ({ email }) => (
    <React.Fragment>
        Мы отправили вам на e-mail <span>{email}</span> шестизначный код. Введите его в поле ниже.
    </React.Fragment>
);

export const ConfirmEmail = () => {
    const [inputValue, setInputValue] = useState('');
    const { errorStatus } = useAppSelector(authSelector);
    const location = useLocation();
    const email = location.state?.email;
    const [isSecondTry, setSecondTry] = useState(false);
    const dispatch = useAppDispatch();

    const handleComplete = (value: string) => {
        if (!email) {
            return <Navigate to={Paths.AUTH} />;
        }

        dispatch(confirmEmail({ email, code: value }));
        setInputValue('');

        return undefined;
    };

    useEffect(() => {
        if (errorStatus) {
            setSecondTry(true);
            setInputValue('');
        }
    }, [errorStatus]);

    if (!useLocation().state) {
        return <Navigate to={Paths.R_SWITCHER} />;
    }

    return (
        <Result
            status={isSecondTry ? 'error' : undefined}
            className={isSecondTry ? 'confirm-result confirm-result_error' : 'confirm-result'}
            title={
                isSecondTry ? (
                    <span>Неверный код. Введите код для восстановления аккауанта</span>
                ) : (
                    <span>
                        Введите код <br /> для восстановления аккауанта
                    </span>
                )
            }
            subTitle={<Subtitle email={email} />}
            extra={[
                <VerificationInput
                    placeholder=''
                    onComplete={handleComplete}
                    key='input'
                    value={inputValue}
                    onChange={setInputValue}
                    inputProps={{ 'data-test-id': 'verification-input' }}
                    classNames={{
                        container: 'vi-custom-container',
                        character: `vi-custom-character ${
                            isSecondTry ? 'vi-custom-character_invalid' : ''
                        }`,
                        characterFilled: 'vi-custom-text',
                    }}
                />,
                <span className='sub-text' key='text'>
                    Не пришло письмо? Проверьте папку Спам.
                </span>,
            ]}
        />
    );
};
