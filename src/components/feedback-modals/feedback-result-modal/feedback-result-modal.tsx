import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { toggleCreatorModal, toggleResultModal } from '@redux/feedback-slice/feedback-slice.ts';
import { feedbackSelector } from '@redux/selectors.ts';
import { Button, Modal, Result } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import './feedback-result-modal.css';

export const FeedbackResultModal = () => {
    const { resultModal, isSuccess } = useAppSelector(feedbackSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const handleCloseResult = () => {
        dispatch(toggleCreatorModal());
        dispatch(toggleResultModal());
    };

    const handleWriteFeedback = () => {
        dispatch(toggleResultModal());
        dispatch(toggleCreatorModal());
    };

    return (
        <Modal
            open={resultModal}
            onCancel={handleCloseResult}
            centered={true}
            closable={false}
            footer={null}
            width={isDesktop ? 540 : 328}
            className='result-modal'
            bodyStyle={{ padding: isDesktop ? '64px 32px' : '32px 16px' }}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(4px)' }}
        >
            {isSuccess ? (
                <Result
                    status='success'
                    title='Отзыв успешно опубликован'
                    extra={
                        <Button type='primary' size='large' block={true} onClick={handleCloseResult}>
                            Отлично
                        </Button>
                    }
                />
            ) : (
                <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз'
                    className='error-result'
                    extra={[
                        <Button
                            type='primary'
                            size='large'
                            onClick={handleWriteFeedback}
                            key='write feedback'
                            block={true}
                            data-test-id='write-review-not-saved-modal'
                        >
                            Написать отзыв
                        </Button>,
                        <Button
                            type='default'
                            size='large'
                            onClick={handleCloseResult}
                            key='close-btn'
                            block={true}
                        >
                            Закрыть
                        </Button>,
                    ]}
                />
            )}
        </Modal>
    );
};
