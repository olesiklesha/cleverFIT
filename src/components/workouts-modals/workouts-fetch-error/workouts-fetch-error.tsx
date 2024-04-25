import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Button, Modal, Result } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { WorkoutsModals } from '../../../models';

export const WorkoutsFetchError = () => {
    const { modals } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isMobile = screens.sm;

    const handleCloseBtn = () => {
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.FETCH_ERROR,
                isOpen: false,
            }),
        );
    };

    return (
        <Modal
            open={modals[WorkoutsModals.FETCH_ERROR]}
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
            data-test-id='modal-no-review'
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
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
