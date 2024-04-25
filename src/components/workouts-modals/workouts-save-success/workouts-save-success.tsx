import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Alert } from 'antd';

import { WorkoutsModals } from '../../../models';

export const WorkoutsSaveSuccess = () => {
    const { modals, isWorkoutUpdated } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();

    const handleClose = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.SAVE_SUCCESS,
                isOpen: false,
            }),
        );

    return (
        modals[WorkoutsModals.SAVE_SUCCESS] && (
            <Alert
                message={
                    isWorkoutUpdated
                        ? 'Тренировка успешно обновлена'
                        : 'Новая тренировка успешно добавлена'
                }
                closable={true}
                onClose={handleClose}
                showIcon={true}
                type='success'
                className='profile-alert'
                data-test-id='create-training-success-alert'
            />
        )
    );
};
