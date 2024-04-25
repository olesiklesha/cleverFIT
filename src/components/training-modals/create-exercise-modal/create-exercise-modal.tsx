import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import {
    getCurTraining,
    getEditSelectOptions,
    getEditTrainingBody,
    isPast,
} from '@components/training-modals/helpers';
import { SaveTrainingErrorModal } from '@components/training-modals/save-training-error-modal';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { authSelector, trainingSelector } from '@redux/selectors.ts';
import {
    openSidePanel,
    setCurTraining,
    setIsEditSidePanelOpen,
    setModalIsOpen,
    setNewTraining,
    updateFormInitialProps,
} from '@redux/training-slice/training-slice.ts';
import { editTraining, postTraining } from '@redux/training-slice/training-slice-thunk.ts';
import { Button, Modal, Select } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RelativePosModalProps, TrainingModals, Undefinable } from '../../../models';

import './create-exercise-modal.css';

export const CreateExerciseModal: React.FC<RelativePosModalProps> = ({ parent }) => {
    const { date, isTopLeft, offset } = useAppSelector(trainingSelector).relativeModalProps;
    const { loading } = useAppSelector(authSelector);
    const { trainingModals, trainingNames, curTraining, trainings, newTraining } =
        useAppSelector(trainingSelector);
    const [selected, setSelected] = useState<Undefinable<string>>(curTraining?.name);

    // useAppSelector(trainingSelector);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(
            setModalIsOpen({
                modal: TrainingModals.CREATE_EXERCISE,
                isOpen: false,
            }),
        );
    };

    const handleBackBtn = () => {
        closeModal();
        dispatch(
            setModalIsOpen({
                modal: TrainingModals.CREATE_TRAINING,
                isOpen: true,
            }),
        );
    };

    const handleSelect = (value: string) => {
        setSelected(value);

        const currTraining = getCurTraining(value, date, trainings);

        if (currTraining) {
            dispatch(setCurTraining(currTraining));
        } else {
            dispatch(
                setNewTraining({
                    name: value,
                    date: date as string,
                    exercises: [],
                }),
            );
        }
    };

    const handleAddBtn = () => {
        if (!newTraining) return;

        dispatch(updateFormInitialProps());
        dispatch(openSidePanel(newTraining.name));
    };

    const handleEditBtn = () => {
        dispatch(updateFormInitialProps());
        dispatch(setIsEditSidePanelOpen(true));
    };

    const handleSaveBTn = () => {
        if (newTraining && curTraining?.name !== newTraining?.name) {
            dispatch(postTraining(newTraining));

            return;
        }

        const isPastDate = isPast(date);

        if (!curTraining || !newTraining) return;

        const requestBody = getEditTrainingBody(curTraining, newTraining, isPastDate);

        if (!isPastDate) {
            dispatch(editTraining(requestBody));

            return;
        }

        dispatch(editTraining(requestBody));
    };

    useEffect(() => {
        setSelected(
            curTraining?.name === newTraining?.name ? curTraining?.name : newTraining?.name,
        );
    }, [curTraining, newTraining]);

    return (
        <React.Fragment>
            <Modal
                open={trainingModals[TrainingModals.CREATE_EXERCISE]}
                onCancel={closeModal}
                getContainer={parent}
                wrapClassName={isTopLeft ? 'top-left' : 'bottom-right'}
                mask={false}
                width={isDesktop ? 264 : '100%'}
                className='create-training-modal'
                bodyStyle={{ padding: 0 }}
                style={isDesktop ? {} : { top: -offset }}
                closable={false}
                destroyOnClose={true}
                data-test-id='modal-create-exercise'
                footer={[
                    <Button
                        block={true}
                        key='add-exercise-btn'
                        disabled={!selected}
                        onClick={handleAddBtn}
                    >
                        Добавить упражнения
                    </Button>,
                    <Button
                        size='large'
                        type='text'
                        block={true}
                        key='save'
                        disabled={newTraining?.exercises.length === 0 || !newTraining}
                        loading={loading}
                        onClick={handleSaveBTn}
                    >
                        {isPast(date) ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>,
                ]}
            >
                <div className='create-modal-header'>
                    <Button
                        icon={<ArrowLeftOutlined size={16} color='#262626' />}
                        style={{ border: 'none', boxShadow: 'none' }}
                        onClick={handleBackBtn}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        placeholder='Выбор типа тренировки'
                        options={getEditSelectOptions(
                            trainingNames,
                            date,
                            trainings,
                            Boolean(!curTraining),
                        )}
                        bordered={false}
                        onChange={handleSelect}
                        value={selected}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
                <div className='create-modal-body'>
                    {newTraining &&
                        newTraining.exercises.map((exercise, i) => (
                            <div key={exercise.name} className='training-container'>
                                <span>{exercise.name}</span>
                                <Button
                                    icon={<EditOutlined style={{ color: Colors.PRIMARY }} />}
                                    style={{ border: 'none' }}
                                    size='small'
                                    onClick={handleEditBtn}
                                    data-test-id={`modal-update-training-edit-button${i}`}
                                />
                            </div>
                        ))}
                </div>
            </Modal>
            <SaveTrainingErrorModal />
        </React.Fragment>
    );
};
