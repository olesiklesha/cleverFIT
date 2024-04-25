import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';

import { WorkoutsModals } from '../../../models';

import './empty-workouts.css';

export const EmptyWorkouts = () => {
    const { trainingList } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.SIDE_PANEL,
                isOpen: true,
            }),
        );
    };

    return (
        <div className='empty-workouts'>
            <div className='empty-workouts-info'>
                <Title level={2}>У вас ещё нет созданных тренировок</Title>
                {trainingList.length && (
                    <Button
                        type='primary'
                        size='large'
                        onClick={handleClick}
                        data-test-id='create-new-training-button'
                    >
                        Создать тренировку
                    </Button>
                )}
            </div>
        </div>
    );
};
