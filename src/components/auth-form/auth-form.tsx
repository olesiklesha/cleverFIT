import React, { useRef, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { BASE_URL, Colors, EMAIL_REGEXP, Endpoints, PASS_REGEXP } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { checkEmail, login } from '@redux/auth-slice/auth-slice-thunk.ts';
import { Button, Checkbox, Form, Input, InputRef } from 'antd';

import './auth-form.css';

type FormProps = {
    email: string;
    password: string;
    remember: boolean;
};

type FormInputData = {
    email?: string;
    password?: string;
};

export const AuthForm: React.FC = () => {
    const [isBtnDisabled, setBtnDisabled] = useState(false);
    const dispatch = useAppDispatch();
    const emailRef = useRef<InputRef>(null);

    const handleSubmit = ({ email, password, remember }: FormProps) => {
        dispatch(login({ email, password, remember }));
    };

    const handleChange = (e: FormInputData) => {
        if (e.email?.match(EMAIL_REGEXP)) {
            setBtnDisabled(false);

            return;
        }

        setBtnDisabled(false);
    };

    const handlePassRecoveryBtn = () => {
        const email = emailRef.current?.input?.value;

        if (email) {
            dispatch(checkEmail({ email }));
        } else {
            setBtnDisabled(true);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = BASE_URL + Endpoints.GOOGLE;
    };

    return (
        <Form
            name='login'
            initialValues={{ remember: false }}
            className='auth-form'
            onFinish={handleSubmit}
            onValuesChange={handleChange}
        >
            <Form.Item
                className='input-field'
                rules={[
                    { required: true, message: '' },
                    {
                        pattern: EMAIL_REGEXP,
                        message: '',
                    },
                ]}
                name='email'
            >
                <Input
                    addonBefore='e-mail:'
                    size='large'
                    data-test-id='login-email'
                    ref={emailRef}
                />
            </Form.Item>
            <Form.Item
                className='password-field'
                name='password'
                rules={[
                    { required: true, message: 'Введите пароль' },
                    {
                        pattern: PASS_REGEXP,
                        message: '',
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    size='large'
                    name='password'
                    data-test-id='login-password'
                />
            </Form.Item>
            <Form.Item className='check-area'>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    type='text'
                    style={{ color: Colors.PRIMARY }}
                    disabled={isBtnDisabled}
                    onClick={handlePassRecoveryBtn}
                    data-test-id='login-forgot-button'
                >
                    Забыли пароль?
                </Button>
            </Form.Item>
            <Form.Item className='btn-area'>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
                <Button
                    icon={<GooglePlusOutlined style={{ fontSize: 14 }} />}
                    size='large'
                    onClick={handleGoogleAuth}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
