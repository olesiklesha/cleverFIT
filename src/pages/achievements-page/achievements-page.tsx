import React, { useEffect } from 'react';
import { AchievementsTabs } from '@components/achievements-tabs';
import { FeedbackErrorModal as FetchErrorModal } from '@components/feedback-modals';
import { Header } from '@components/header';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setDefault } from '@redux/achievements-slice/achievements-slice.ts';
import { getTrainingList } from '@redux/achievements-slice/achievements-slice-thunk.ts';
import { Content } from 'antd/es/layout/layout';

import './achievements-page.css';

export const AchievementsPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTrainingList());
    }, [dispatch]);

    useEffect(() => () => {
            dispatch(setDefault());

            return undefined;
        });

    return (
        <React.Fragment>
            <Header />
            <Content className='page-content achievements-content'>
                <AchievementsTabs />
            </Content>
            <FetchErrorModal />
        </React.Fragment>
    );
};
