import { QuestionCircleOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { putUserInfo } from '@redux/profile-slice/profile-slice-thunk.ts';
import { profileSelector } from '@redux/selectors.ts';
import { Form, Switch, Tooltip } from 'antd';

import { SwitchName } from '../../models/user-models.ts';

import './settings-features-form.css';

export const SettingsFeaturesForm = () => {
    const { userInfo } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();

    const updateField = (fieldName: SwitchName, value: boolean) => {
        if (fieldName === SwitchName.DARK_MODE) return;
        dispatch(
            putUserInfo({
                [fieldName]: value,
            }),
        );
    };
    const onTrainingChange = (value: boolean) => updateField(SwitchName.TRAINING, value);
    const onNotificationChange = (value: boolean) => updateField(SwitchName.NOTIFICATION, value);
    const onDarkModeChange = (value: boolean) => updateField(SwitchName.DARK_MODE, value);

    return (
        <Form className='settings-features-form'>
            <Form.Item>
                <span className='form-item-label'>
                    Открыт для совместных тренировок
                    <Tooltip
                        placement='top'
                        title='включеная функция позволит участвовать в совместных тренировках'
                        color='#000'
                        overlayInnerStyle={{ width: 205 }}
                    >
                        <QuestionCircleOutlined
                            style={{ color: Colors.LIGHT_GRAY }}
                            data-test-id='tariff-trainings-icon'
                        />
                    </Tooltip>
                </span>
                <Switch
                    defaultChecked={userInfo?.readyForJointTraining}
                    onChange={onTrainingChange}
                    data-test-id='tariff-trainings'
                />
            </Form.Item>
            <Form.Item name='sendNotification'>
                <span className='form-item-label'>
                    Уведомления
                    <Tooltip
                        placement='top'
                        title='включеная функция позволит получать уведомления об активностях'
                        color='#000'
                        overlayInnerStyle={{ width: 219 }}
                    >
                        <QuestionCircleOutlined
                            style={{ color: Colors.LIGHT_GRAY }}
                            data-test-id='tariff-notifications-icon'
                        />
                    </Tooltip>
                </span>
                <Switch
                    defaultChecked={userInfo?.sendNotification}
                    onChange={onNotificationChange}
                    data-test-id='tariff-notifications'
                />
            </Form.Item>
            <Form.Item name='darkMode'>
                <span
                    className={
                        userInfo?.tariff
                            ? 'form-item-label'
                            : 'form-item-label form-item-label_disabled'
                    }
                >
                    Тёмная тема
                    <Tooltip
                        placement='top'
                        title='темная тема доступна для PRO tarif'
                        color='#000'
                        overlayInnerStyle={{ width: 113 }}
                    >
                        <QuestionCircleOutlined
                            style={{ color: Colors.LIGHT_GRAY }}
                            data-test-id='tariff-theme-icon'
                        />
                    </Tooltip>
                </span>
                <Switch
                    defaultChecked={false}
                    onChange={onDarkModeChange}
                    disabled={!userInfo?.tariff}
                    data-test-id='tariff-theme'
                />
            </Form.Item>
        </Form>
    );
};
