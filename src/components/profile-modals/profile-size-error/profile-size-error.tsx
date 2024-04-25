import { CloseCircleOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setModalIsOpen } from '@redux/profile-slice/profile-slice.ts';
import { profileSelector } from '@redux/selectors.ts';
import { Button, Modal } from 'antd';

import { ProfileModals } from '../../../models/user-models.ts';

export const ProfileSizeError = () => {
    const { modalsState } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(
            setModalIsOpen({
                modal: ProfileModals.SIZE_ERROR,
                isOpen: false,
            }),
        );
    };

    return (
        <Modal
            open={modalsState[ProfileModals.SIZE_ERROR]}
            bodyStyle={{ padding: 32 }}
            width={416}
            footer={null}
            centered={true}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(4px)' }}
            onCancel={handleClose}
            closable={false}
            destroyOnClose={true}
            className='save-error-modal'
        >
            <div className='modal-body'>
                <CloseCircleOutlined style={{ fontSize: 24, color: Colors.ERROR }} />
                <div>
                    <h3
                        className='modal-body__title'
                        data-test-id='modal-error-user-training-title'
                    >
                        Файл слишком большой
                    </h3>
                    <p data-test-id='modal-error-user-training-subtitle'>
                        Выберите файл размером до 5 МБ.
                    </p>
                </div>
            </div>
            <Button
                size='large'
                type='primary'
                className='modal-error-btn'
                onClick={handleClose}
                data-test-id='big-file-error-close'
            >
                Закрыть
            </Button>
        </Modal>
    );
};
