import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setModalIsOpen } from '@redux/profile-slice/profile-slice.ts';
import { profileSelector } from '@redux/selectors.ts';
import { Alert } from 'antd';

import { ProfileModals } from '../../../models/user-models.ts';

import './profile-success-result.css';

export const ProfileSuccessResult = () => {
    const { modalsState } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(
            setModalIsOpen({
                modal: ProfileModals.SUCCESS,
                isOpen: false,
            }),
        );
    };

    return (
        modalsState[ProfileModals.SUCCESS] && (
            <Alert
                message='Данные профиля успешно обновлены'
                closable={true}
                onClose={handleClose}
                showIcon={true}
                type='success'
                className='profile-alert'
                data-test-id='alert'
            />
        )
    );
};
