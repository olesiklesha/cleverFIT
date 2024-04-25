import React, { useEffect } from 'react';
import { FeedbackCreateModal } from '@components/feedback-modals';
import { SettingsFeaturesForm } from '@components/settings-features-form';
import { SettingsHeader } from '@components/settings-header';
import { SettingsModal } from '@components/settings-modal';
import { SettingsSidePanel } from '@components/settings-side-panel';
import { SettingsTariffList } from '@components/settings-tariff-list';
import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { toggleCreatorModal } from '@redux/feedback-slice/feedback-slice.ts';
import { tariffSelector } from '@redux/selectors.ts';
import { getTariffList } from '@redux/tariff-slice/tariff-slice-thunk.ts';
import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout';

import './settings-page.css';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { tariffList } = useAppSelector(tariffSelector);

    useEffect(() => {
        if (tariffList.length === 0) {
            dispatch(getTariffList());
        }
    }, [tariffList, dispatch]);

    const handleToggleCreatorModal = () => {
        dispatch(toggleCreatorModal());
    };

    const handleBtnClick = () => {
        history.push(Paths.FEEDBACK);
    };

    return (
        <React.Fragment>
            <SettingsHeader />
            <Content className='page-content settings-page'>
                <SettingsTariffList />
                <SettingsFeaturesForm />
                <div className='feedback-btn-container'>
                    <Button
                        type='primary'
                        size='large'
                        onClick={handleToggleCreatorModal}
                        data-test-id='write-review'
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='text'
                        size='large'
                        onClick={handleBtnClick}
                        data-test-id='all-reviews-button'
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </Content>
            <FeedbackCreateModal />
            <SettingsSidePanel />
            <SettingsModal />
        </React.Fragment>
    );
};
