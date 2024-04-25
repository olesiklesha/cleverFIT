import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { SaveTrainingErrorModal } from '@components/training-modals';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { openEditSidePanel, setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Button, Modal, Select } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RelativePosModalProps, TrainingProps, WorkoutsModals } from '../../../models';

import './workouts-exercise-modal.css';

export const WorkoutsExerciseModal: React.FC<RelativePosModalProps> = ({ parent }) => {
    const { modals, currTraining, relativeModalProps, trainingList } =
        useAppSelector(workoutsSelector);
    const { isTopLeft, offset } = relativeModalProps;
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const handleClose = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.EXERCISE_MODAL,
                isOpen: false,
            }),
        );

    const handleAddBtn = () => dispatch(openEditSidePanel(currTraining as TrainingProps));

    return (
        <React.Fragment>
            <Modal
                open={modals[WorkoutsModals.EXERCISE_MODAL]}
                onCancel={handleClose}
                getContainer={parent}
                wrapClassName={isTopLeft ? 'top-left' : 'bottom-right'}
                mask={false}
                width={isDesktop ? 264 : '100%'}
                className='create-training-modal'
                bodyStyle={{
                    padding: 0,
                }}
                style={isDesktop ? {} : { top: -offset }}
                closable={false}
                destroyOnClose={true}
                data-test-id='modal-create-exercise'
                footer={[
                    <Button block={true} key='add-exercise-btn' onClick={handleAddBtn}>
                        Добавить упражнения
                    </Button>,
                ]}
            >
                <div className='create-modal-header'>
                    <Button
                        icon={<ArrowLeftOutlined size={16} color='#262626' />}
                        style={{ border: 'none', boxShadow: 'none' }}
                        onClick={handleClose}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        placeholder='Выбор типа тренировки'
                        bordered={false}
                        value={currTraining?.name}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
                <div
                    className='create-modal-body'
                    style={{
                        boxShadow: `inset 0 1px 0 0 ${
                            currTraining && getTrainingColor(trainingList, currTraining.name)
                        }`,
                    }}
                >
                    {currTraining &&
                        currTraining.exercises.map((exercise) => (
                            <div key={exercise.name} className='training-container'>
                                <span>{exercise.name}</span>
                            </div>
                        ))}
                </div>
            </Modal>
            <SaveTrainingErrorModal />
        </React.Fragment>
    );
};
