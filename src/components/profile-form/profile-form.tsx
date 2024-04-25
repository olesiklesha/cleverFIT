/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    getFormattedFormFields,
    getInitialFileList,
    getInitValues,
    handleRequest,
} from '@components/profile-form/helpers';
import {
    ProfileSaveError,
    ProfileSizeError,
    ProfileSuccessResult,
} from '@components/profile-modals';
import { DateFormats, EMAIL_REGEXP, PASS_REGEXP } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { putUserInfo } from '@redux/profile-slice/profile-slice-thunk.ts';
import { authSelector, profileSelector } from '@redux/selectors.ts';
import { Button, ConfigProvider, DatePicker, Form, Input, Upload, UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Title from 'antd/es/typography/Title';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import moment from 'moment';
import { FieldData } from 'rc-field-form/lib/interface';

import { Undefinable } from '../../models';
import { ProfileFormProps } from '../../models/user-models.ts';

import './profile-form.css';

const uploadBtn = (
    <div className='upload-btn'>
        <PlusOutlined style={{ color: '#000' }} />
        Загрузить фото профиля
    </div>
);

const mobileUploadBtn = (
    <Button icon={<UploadOutlined />} size='large'>
        Загрузить
    </Button>
);

const UploadBtn: React.FC<{
    isMobile: Undefinable<boolean>;
}> = ({ isMobile }) => (isMobile ? mobileUploadBtn : uploadBtn);

const UploadLabel: React.FC<{
    isMobile: Undefinable<boolean>;
}> = ({ isMobile }) => isMobile && 'Загрузить фото:';

export const ProfileForm = () => {
    const [isDisabled, setDisabled] = useState(true);
    const { token } = useAppSelector(authSelector);
    const { userInfo } = useAppSelector(profileSelector);
    const [form] = useForm<ProfileFormProps>();
    const dispatch = useAppDispatch();
    const [fileList, setFileList] = useState<UploadFile[]>(
        getInitialFileList(userInfo ? userInfo.imgSrc : undefined),
    );
    const [isPassRequired, setPassRequired] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint.xs;

    const handleFormItemChange = (field: FieldData[]) => {
        if (field[0].name === 'password' || field[0].name === 'confirm') {
            setPassRequired(true);
        }

        if (!isDisabled) return;
        setDisabled(false);
    };

    const handleFinish = () => {
        const fields = form.getFieldsValue();
        const body = getFormattedFormFields(fields, fileList);

        dispatch(putUserInfo(body));
        form.setFieldsValue(getInitValues(userInfo));
        setDisabled(true);
    };

    useEffect(() => {
        form.setFieldsValue(getInitValues(userInfo));
    }, [userInfo, form]);

    return (
        <React.Fragment>
            <Form
                style={{ maxWidth: 480 }}
                form={form}
                onFieldsChange={handleFormItemChange}
                initialValues={getInitValues(userInfo)}
                onFinish={handleFinish}
                className='profile-form'
            >
                <Title level={2} className='profile-form-title'>
                    Личная информация
                </Title>
                <div className='profile-form-subcontainer'>
                    <Form.Item
                        name='image'
                        label={fileList.length === 1 ? null : <UploadLabel isMobile={isMobile} />}
                        className='upload-form-item'
                        data-test-id='profile-avatar'
                    >
                        <Upload
                            listType={isMobile ? 'picture' : 'picture-card'}
                            fileList={fileList}
                            customRequest={(options) =>
                                handleRequest(options, token, dispatch, setFileList, setDisabled)
                            }
                            name='avatar'
                            onRemove={() => {
                                setFileList([]);
                            }}
                        >
                            {fileList.length >= 1 ? null : <UploadBtn isMobile={isMobile} />}
                        </Upload>
                    </Form.Item>
                    <div className='inputs-container'>
                        <Form.Item name='firstName'>
                            <Input placeholder='Имя' size='large' data-test-id='profile-name' />
                        </Form.Item>
                        <Form.Item name='lastName'>
                            <Input
                                placeholder='Фамилия'
                                size='large'
                                data-test-id='profile-surname'
                            />
                        </Form.Item>
                        <Form.Item name='birthday'>
                            <ConfigProvider locale={ru_RU}>
                                <DatePicker
                                    defaultValue={
                                        userInfo?.birthday ? moment(userInfo.birthday) : undefined
                                    }
                                    placeholder='Дата рождения'
                                    style={{ width: '100%' }}
                                    format={DateFormats.DATE_PICKER}
                                    size='large'
                                    data-test-id='profile-birthday'
                                />
                            </ConfigProvider>
                        </Form.Item>
                    </div>
                </div>
                <Title level={2} className='profile-form-title'>
                    Приватность и авторизация
                </Title>
                <div className='profile-auth-inputs-container'>
                    <Form.Item
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
                            placeholder='e-mail'
                            addonBefore='e-mail:'
                            size='large'
                            data-test-id='profile-email'
                        />
                    </Form.Item>
                    <Form.Item
                        className='password-field'
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        name='password'
                        rules={[
                            { required: isPassRequired },
                            {
                                pattern: PASS_REGEXP,
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            size='large'
                            name='password'
                            data-test-id='profile-password'
                        />
                    </Form.Item>
                    <Form.Item
                        className='repeat-password-field'
                        name='confirm'
                        rules={[
                            { required: isPassRequired },
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
                            data-test-id='profile-repeat-password'
                        />
                    </Form.Item>
                </div>
                <Button
                    type='primary'
                    size='large'
                    disabled={isDisabled}
                    htmlType='submit'
                    block={isMobile}
                    data-test-id='profile-submit'
                >
                    Сохранить изменения
                </Button>
            </Form>
            <ProfileSuccessResult />
            <ProfileSizeError />
            <ProfileSaveError />
        </React.Fragment>
    );
};
