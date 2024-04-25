import React, { useCallback, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { getFormattedStr } from '@components/training-modals/helpers';
import { getPeriodStr } from '@components/workouts-table/helpers';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Badge, Modal } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RelativePosModalProps, WorkoutsModals } from '../../../models';

import './workout-info-modal.css';

export const WorkoutInfoModal: React.FC<RelativePosModalProps> = ({ parent }) => {
    const { modals, currTraining, trainingList, relativeModalProps } =
        useAppSelector(workoutsSelector);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();

    const handleClose = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.WORKOUT_INFO,
                isOpen: false,
            }),
        );

    const clickHandler = useCallback(
        (ev: MouseEvent) => {
            const target = ev.target as HTMLElement;

            if (!target.closest('.ant-modal') || !target.closest('.relative-btn')) {
                dispatch(
                    setWorkoutsModalIsOpen({
                        modal: WorkoutsModals.WORKOUT_INFO,
                        isOpen: false,
                    }),
                );
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (modals[WorkoutsModals.WORKOUT_INFO]) window.addEventListener('click', clickHandler);
        else window.removeEventListener('click', clickHandler);
    }, [clickHandler, modals]);

    return (
        <Modal
            open={modals[WorkoutsModals.WORKOUT_INFO]}
            onCancel={handleClose}
            getContainer={parent}
            wrapClassName='top-left'
            mask={false}
            width={isDesktop ? 264 : '100%'}
            className='workout-info-modal'
            style={isDesktop ? {} : { top: -relativeModalProps.offset }}
            closable={true}
            closeIcon={<CloseOutlined style={{ color: '#000' }} />}
            destroyOnClose={true}
            data-test-id='joint-training-review-card'
            footer={null}
            title={
                <Badge
                    color={getTrainingColor(trainingList, currTraining?.name)}
                    text={currTraining?.name}
                />
            }
        >
            <div className='training-container training-container_top'>
                <span className='training-period'>
                    {getPeriodStr(currTraining?.parameters.period)}
                </span>
                <span>{currTraining && getFormattedStr(currTraining.date)}</span>
            </div>
            {currTraining &&
                currTraining.exercises.map((exercise) => (
                    <div key={exercise.name} className='training-container'>
                        <span>{exercise.name}</span>
                        <span className='exercise-info'>
                            {exercise.approaches} x ({exercise.replays})
                        </span>
                    </div>
                ))}
        </Modal>
    );
};
