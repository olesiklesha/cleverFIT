import { useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { EMAIL_REGEXP, PASS_REGEXP } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { registration } from '@redux/auth-slice/auth-slice-thunk.ts';
import { Button, Form, Input } from 'antd';

import './registration-form.css';

type FormValues = {
    email: string;
    password: string;
    confirm: string;
};

export const RegistrationForm = () => {
    const [isDisabled, setDisabled] = useState(true);
    const dispatch = useAppDispatch();
    const handleSubmit = ({ email, password }: FormValues) => {
        dispatch(registration({ email, password }));
    };

    const handleChange = (allValues: FormValues) => {
        const { email, password, confirm } = allValues;
        const isEmailValid = String(email).match(EMAIL_REGEXP);
        const isPassValid =
            String(password) === String(confirm) && String(password).match(PASS_REGEXP);

        if (isEmailValid && isPassValid) {
            setDisabled(false);

            return;
        }

        setDisabled(true);
    };

    return (
        <Form
            name='login'
            initialValues={{ remember: true }}
            className='auth-form auth-form_r'
            onFinish={handleSubmit}
            onValuesChange={(_changedFields, allFields) => handleChange(allFields)}
        >
            <Form.Item
                className='input-field'
                name='email'
                rules={[
                    { required: true, message: '' },
                    {
                        pattern: EMAIL_REGEXP,
                        message: '',
                    },
                ]}
            >
                <Input
                    addonBefore='e-mail:'
                    size='large'
                    name='email'
                    data-test-id='registration-email'
                />
            </Form.Item>
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
                    placeholder='Пароль'
                    size='large'
                    name='password'
                    data-test-id='registration-password'
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
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>
            <Form.Item className='btn-area'>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    disabled={isDisabled}
                    data-test-id='registration-submit-button'
                >
                    Войти
                </Button>
                <Button icon={<GooglePlusOutlined style={{ fontSize: 14 }} />} size='large'>
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
