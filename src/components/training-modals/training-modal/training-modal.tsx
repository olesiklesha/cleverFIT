import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
    getModalTitleWithDate,
    getTrainingsForDate,
    isPast,
} from '@components/training-modals/helpers';
import { ModalTrainingList } from '@components/training-modals/modal-training-list';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import { setEditTrainingModal, setModalIsOpen } from '@redux/training-slice/training-slice.ts';
import { Button, Empty, Modal } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RelativePosModalProps, TrainingModals } from '../../../models';

import './training-modal.css';

export const TrainingModal: React.FC<RelativePosModalProps> = ({ parent }) => {
    const { date, isTopLeft, offset } = useAppSelector(trainingSelector).relativeModalProps;
    const { trainings, trainingNames, trainingModals } = useAppSelector(trainingSelector);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();
    const currTrainings = getTrainingsForDate(date, trainings);

    const closeModal = () => {
        dispatch(
            setModalIsOpen({
                modal: TrainingModals.CREATE_TRAINING,
                isOpen: false,
            }),
        );
    };

    const handleClick = () => {
        closeModal();
        dispatch(setEditTrainingModal(true));
    };

    return (
        <Modal
            open={trainingModals[TrainingModals.CREATE_TRAINING]}
            onCancel={closeModal}
            getContainer={parent}
            wrapClassName={isTopLeft ? 'top-left' : 'bottom-right'}
            mask={false}
            width={isDesktop ? 264 : '100%'}
            className='create-training-modal'
            bodyStyle={{ padding: '16px 12px 0' }}
            style={isDesktop ? {} : { top: -offset }}
            data-test-id='modal-create-training'
            destroyOnClose={true}
            closeIcon={
                <CloseOutlined
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-create-training-button-close'
                />
            }
            footer={[
                <Button
                    size='large'
                    type='primary'
                    block={true}
                    key='create-trening-btn'
                    disabled={isPast(date) || currTrainings.length === trainingNames.length}
                    onClick={handleClick}
                >
                    Создать тренировку
                </Button>,
            ]}
        >
            <div className='modal-header'>
                <h3 className='modal-header__title'>{getModalTitleWithDate(date)}</h3>
                {currTrainings.length === 0 && <span>Нет активных тренировок</span>}
            </div>
            {currTrainings.length > 0 ? (
                <ModalTrainingList currTrainings={currTrainings} />
            ) : (
                <Empty
                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                    imageStyle={{ height: 32, width: 32, margin: '0 auto' }}
                    description={null}
                />
            )}
        </Modal>
    );
};
