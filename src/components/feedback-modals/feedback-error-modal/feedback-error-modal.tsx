import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { setFetchErrorModalOpened } from '@redux/feedback-slice/feedback-slice.ts';
import { feedbackSelector } from '@redux/selectors.ts';
import { Button, Modal, Result } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import './feedback-error-modal.css';

export const FeedbackErrorModal = () => {
    const { isFetchErrorModalOpened } = useAppSelector(feedbackSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isMobile = screens.sm;

    const handleCloseBtn = () => {
        dispatch(setFetchErrorModalOpened(false));
        history.push(Paths.MAIN);
    };

    return (
        <Modal
            open={isFetchErrorModalOpened}
            onCancel={handleCloseBtn}
            centered={true}
            closable={false}
            footer={null}
            maskStyle={{
                background: 'rgba(121, 156, 212, 0.5)',
                backdropFilter: 'blur(4px)',
            }}
            bodyStyle={{ padding: '64px 32px 56px 32px' }}
            width={isMobile ? 540 : 328}
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз'
                className='modal-error-500'
                extra={
                    <Button type='primary' onClick={handleCloseBtn}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
