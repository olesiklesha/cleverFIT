import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import { setModalIsOpen } from '@redux/training-slice/training-slice.ts';
import { getTrainingList } from '@redux/training-slice/training-slice-thunk.ts';
import { Button, Modal } from 'antd';

import { TrainingModals } from '../../../models';

import './training-list-error-modal.css';

export const TrainingListErrorModal = () => {
    const { trainingModals } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const handleBtnClick = () => dispatch(getTrainingList());

    const handleClose = () => {
        dispatch(
            setModalIsOpen({
                modal: TrainingModals.TRAINING_FETCH_ERROR,
                isOpen: false,
            }),
        );
    };

    return (
        <Modal
            open={trainingModals[TrainingModals.TRAINING_FETCH_ERROR]}
            bodyStyle={{ padding: '24px 16px' }}
            width={384}
            footer={null}
            centered={true}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(4px)' }}
            onCancel={handleClose}
            closeIcon={
                <CloseOutlined
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-error-user-training-button-close'
                />
            }
        >
            <div className='modal-body'>
                <CloseCircleOutlined style={{ fontSize: 24, color: Colors.PRIMARY }} />
                <div>
                    <h3
                        className='modal-body__title'
                        data-test-id='modal-error-user-training-title'
                    >
                        При открытии данных произошла ошибка
                    </h3>
                    <p data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</p>
                </div>
            </div>
            <Button
                size='large'
                type='primary'
                className='modal-error-btn'
                onClick={handleBtnClick}
                data-test-id='modal-error-user-training-button'
            >
                Обновить
            </Button>
        </Modal>
    );
};
