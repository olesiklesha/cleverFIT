import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Button, Modal } from 'antd';

import { WorkoutsModals } from '../../../models';

export const WorkoutsSaveError = () => {
    const { modals } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();

    const handleClose = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.SAVE_ERROR,
                isOpen: false,
            }),
        );

    return (
        <Modal
            open={modals[WorkoutsModals.SAVE_ERROR]}
            bodyStyle={{ padding: 32 }}
            width={416}
            footer={null}
            centered={true}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(4px)' }}
            onCancel={handleClose}
            closable={false}
            destroyOnClose={true}
            className='save-error-modal'
            closeIcon={
                <CloseOutlined
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-error-user-training-button-close'
                />
            }
        >
            <div className='modal-body'>
                <CloseCircleOutlined style={{ fontSize: 24, color: Colors.ERROR }} />
                <div>
                    <h3
                        className='modal-body__title'
                        data-test-id='modal-error-user-training-title'
                    >
                        При сохранении данных произошла ошибка
                    </h3>
                    <p data-test-id='modal-error-user-training-subtitle'>
                        Придётся попробовать ещё раз
                    </p>
                </div>
            </div>
            <Button
                size='large'
                type='primary'
                className='modal-error-btn'
                onClick={handleClose}
                data-test-id='modal-error-user-training-button'
            >
                Закрыть
            </Button>
        </Modal>
    );
};
