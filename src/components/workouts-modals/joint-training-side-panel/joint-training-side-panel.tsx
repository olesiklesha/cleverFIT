import { useCallback, useState } from 'react';
import { CloseOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { JointTrainingForm } from '@components/joint-training-form';
import { getPreparedTrainingBodyToSetInvite } from '@components/workouts-modals/joint-training-side-panel/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { postInvite } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Avatar, Badge, Button, Drawer } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { JointWorkoutsFormProps, WorkoutsModals } from '../../../models';

import './joint-training-side-panel.css';

export const JointTrainingSidePanel = () => {
    const { modals, currPartner, trainingList } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const [disabled, setDisabled] = useState(true);
    const [form] = useForm<JointWorkoutsFormProps>();

    const handleClose = () => {
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.JOINT_TRAINING_SIDE_PANEL,
                isOpen: false,
            }),
        );
        form.resetFields();
    };

    const handleFormChange = useCallback(
        (isDisabled: boolean) => {
            setDisabled(isDisabled);
        },
        [setDisabled],
    );

    const handleSaveBtn = () => {
        if (!currPartner) return;
        const body = getPreparedTrainingBodyToSetInvite(form.getFieldsValue(), currPartner);

        dispatch(
            postInvite({
                training: body,
                partner: currPartner,
            }),
        );
    };

    return (
        <Drawer
            title={
                <h3 className='side-panel-header'>
                    <PlusOutlined style={{ fontSize: 14 }} />
                    Совместная тренировка
                </h3>
            }
            headerStyle={{ padding: isDesktop ? '24px 32px 16px' : '24px 16px 16px' }}
            placement={isDesktop ? 'right' : 'bottom'}
            open={modals[WorkoutsModals.JOINT_TRAINING_SIDE_PANEL]}
            onClose={handleClose}
            width={isDesktop ? 408 : '100%'}
            height={isDesktop ? '100vh' : 555}
            className='drawer'
            bodyStyle={{ padding: isDesktop ? '0 24px 32px 32px' : '24px 16px' }}
            maskStyle={{ background: 'transparent' }}
            destroyOnClose={true}
            data-test-id='modal-drawer-right'
            footer={
                <Button
                    type='primary'
                    size='large'
                    block={true}
                    disabled={disabled}
                    onClick={handleSaveBtn}
                >
                    Отправить приглашение
                </Button>
            }
            closeIcon={
                <CloseOutlined
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <div className='curr-partner-info'>
                <div className='partner-info'>
                    <Avatar src={currPartner?.imageSrc} size={42} icon={<UserOutlined />} />
                    <p className='partner-name'>{currPartner?.name}</p>
                </div>

                <Badge
                    text={currPartner?.trainingType}
                    color={getTrainingColor(trainingList, currPartner?.trainingType)}
                />
            </div>
            <JointTrainingForm form={form} setDisabled={handleFormChange} />
        </Drawer>
    );
};
