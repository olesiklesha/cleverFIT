import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { signOut } from '@redux/auth-slice/auth-slice-thunk.ts';
import { getUserInfo } from '@redux/profile-slice/profile-slice-thunk.ts';
import { profileSelector, tariffSelector } from '@redux/selectors.ts';
import { setIsSettingsModalOpen } from '@redux/tariff-slice/tariff-slice.ts';
import { Modal, Result } from 'antd';

import { Undefinable } from '../../models';

import './settings-modal.css';

const Subtitle: React.FC<{ email: Undefinable<string> }> = ({ email }) => (
    <span>
        Мы отправили инструкцию для оплаты вам на e-mail <b>{String(email)}</b>. шестизначный код.
        После подтверждения оплаты войдите в приложение заново.
    </span>
);

export const SettingsModal = () => {
    const { isModalOpen } = useAppSelector(tariffSelector);
    const { userInfo } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUserInfo());
        }
    }, [dispatch, userInfo]);

    const handleCansel = () => {
        dispatch(setIsSettingsModalOpen(false));
        dispatch(signOut());
    };

    return (
        <Modal
            open={isModalOpen}
            footer={null}
            centered={true}
            className='settings-modal'
            data-test-id='tariff-modal-success'
            onCancel={handleCansel}
            wrapClassName='settings-modal-wrapper'
        >
            <Result
                status='success'
                className='confirm-result'
                title='Чек для оплаты у вас на почте'
                subTitle={<Subtitle email={userInfo?.email} />}
                extra={[
                    <span className='sub-text' key='text'>
                        Не пришло письмо? Проверьте папку Спам.
                    </span>,
                ]}
            />
        </Modal>
    );
};
