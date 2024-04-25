import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PASS_REGEXP, Paths } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { changePassword } from '@redux/auth-slice/auth-slice-thunk.ts';
import { Button, Form, Input } from 'antd';
import Typography from 'antd/es/typography';

import './recovery-pass-form.css';

type FormProps = {
    password: string;
    confirm: string;
};

export const RecoveryPassForm = () => {
    const dispatch = useAppDispatch();

    if (!useLocation().state) {
        return <Navigate to={Paths.R_SWITCHER} />;
    }

    const handleSubmit = ({ password }: FormProps) => {
        dispatch(changePassword({ password, confirmPassword: password }));
    };

    return (
        <React.Fragment>
            <Typography.Title level={2} className='form-title'>
                Восстановление аккауанта
            </Typography.Title>
            <Form className='auth-form auth-form_r auth-form_rec' onFinish={handleSubmit}>
                <Form.Item
                    className='password-field'
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    name='password'
                    rules={[
                        { required: true },
                        {
                            pattern: PASS_REGEXP,
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Новый пароль'
                        size='large'
                        name='password'
                        data-test-id='change-password'
                    />
                </Form.Item>
                <Form.Item
                    className='repeat-password-field'
                    name='confirm'
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        size='large'
                        name='confirm'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Form.Item className='btn-area'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};
