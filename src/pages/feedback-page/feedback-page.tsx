import React, { useEffect, useState } from 'react';
import { CustomBreadcrumb } from '@components/custom-breadcrumb';
import { EmptyFeedbacks } from '@components/empty-feedbacks';
import { FeedbackCard } from '@components/feedback-card';
import {
    FeedbackCreateModal,
    FeedbackErrorModal,
    FeedbackResultModal,
} from '@components/feedback-modals';
import { COLLAPSED_FEEDBACK_COUNT, Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { toggleCreatorModal } from '@redux/feedback-slice/feedback-slice.ts';
import { getFeedback } from '@redux/feedback-slice/feedback-slice-thunk.ts';
import { authSelector, feedbackSelector, routerSelector } from '@redux/selectors.ts';
import { Button, PageHeader } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { FeedbackObj } from '../../models';

import './feadback-page.css';

const collapsedBtnText = ['Развернуть отзывы', 'Свернуть все отзывы'];

const getFeedbackCards = (isCollapsed: boolean, data: FeedbackObj[]) => {
    const feedbackData = [...data].reverse();
    const filteredData = isCollapsed
        ? feedbackData.slice(0, COLLAPSED_FEEDBACK_COUNT)
        : feedbackData;

    return filteredData.map((el) => <FeedbackCard {...el} key={el.id} />);
};

export const FeedbackPage = () => {
    const { feedbacks } = useAppSelector(feedbackSelector);
    const { previousLocations } = useAppSelector(routerSelector);
    const { token } = useAppSelector(authSelector);
    const [prevLocation] = previousLocations as Location[];
    const [isFeedbacksCollapsed, setFeedbackCollapsed] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (prevLocation.pathname !== Paths.MAIN) {
            if (!token) {
                history.push(Paths.AUTH);

                return;
            }

            dispatch(getFeedback(token));
        }
    }, [dispatch, prevLocation.pathname, token]);

    const handleCollapseBtn = () => {
        setFeedbackCollapsed((prev) => !prev);
    };

    const handleToggleCreatorModal = () => {
        dispatch(toggleCreatorModal());
    };

    return (
        <React.Fragment>
            <PageHeader className='breadcrumbs-header'>
                <CustomBreadcrumb />
            </PageHeader>
            {feedbacks.length ? (
                <Content className='feedbacks-content'>
                    <div
                        className={
                            isFeedbacksCollapsed
                                ? 'feedbacks-container feedbacks-container_collapsed'
                                : 'feedbacks-container'
                        }
                    >
                        {getFeedbackCards(isFeedbacksCollapsed, feedbacks)}
                    </div>
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
                            onClick={handleCollapseBtn}
                            data-test-id='all-reviews-button'
                        >
                            {isFeedbacksCollapsed ? collapsedBtnText[0] : collapsedBtnText[1]}
                        </Button>
                    </div>
                </Content>
            ) : (
                <EmptyFeedbacks />
            )}
            <FeedbackCreateModal />
            <FeedbackResultModal />
            <FeedbackErrorModal />
        </React.Fragment>
    );
};
