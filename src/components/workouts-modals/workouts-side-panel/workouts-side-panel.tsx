import { useCallback, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { WorkoutsSidePanelForm } from '@components/workouts-side-panel-form';
import { WorkoutsSidePanelTitle } from '@components/workouts-side-panel-title';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { postWorkout, putWorkout } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { getEditWorkoutBody, getFormattedTrainingBodyFromForm } from '@utils/helpers.ts';
import { Button, Drawer } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { TrainingProps, WorkoutsFormProps, WorkoutsModals } from '../../../models';

export const WorkoutsSidePanel = () => {
    const { modals, currTraining } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const [disabled, setDisabled] = useState(true);
    const [form] = useForm<WorkoutsFormProps>();

    const handleClose = () => {
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.SIDE_PANEL,
                isOpen: false,
            }),
        );
        setDisabled(true);
        form.resetFields();
    };

    const handleFormChange = useCallback(
        (isDisabled: boolean) => {
            setDisabled(isDisabled);
        },
        [setDisabled],
    );

    const handleSaveBtn = () => {
        const body = currTraining
            ? getEditWorkoutBody(currTraining, form.getFieldsValue())
            : getFormattedTrainingBodyFromForm(form.getFieldsValue());

        handleClose();

        return currTraining
            ? dispatch(putWorkout(body as TrainingProps))
            : dispatch(postWorkout(body));
    };

    useEffect(() => {
        if (currTraining) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [currTraining, modals]);

    return (
        <Drawer
            title={<WorkoutsSidePanelTitle isEdit={Boolean(currTraining)} />}
            headerStyle={{ padding: isDesktop ? '24px 32px 16px' : '24px 16px 16px' }}
            placement={isDesktop ? 'right' : 'bottom'}
            open={modals[WorkoutsModals.SIDE_PANEL]}
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
                    Сохранить
                </Button>
            }
            closeIcon={
                <CloseOutlined
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <WorkoutsSidePanelForm form={form} setDisabled={handleFormChange} />
        </Drawer>
    );
};
