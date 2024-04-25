import { UserOutlined } from '@ant-design/icons';
import { StatusComponent } from '@components/partner-cards/partner-card/partner-card.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { deleteJointTraining } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Avatar, Button, Modal } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { WorkoutsModals } from '../../../models';

import './workout-partner-info-modal.css';

export const WorkoutPartnerInfoModal = () => {
    const { modals, currPartner } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const handleCloseBtn = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.PARTNER_INFO,
                isOpen: false,
            }),
        );

    const handleClick = () => {
        if (currPartner) {
            dispatch(deleteJointTraining(currPartner.inviteId));
        }
    };

    return (
        <Modal
            open={modals[WorkoutsModals.PARTNER_INFO]}
            onCancel={handleCloseBtn}
            centered={true}
            closable={true}
            footer={null}
            maskStyle={{
                background: 'rgba(121, 156, 212, 0.5)',
                backdropFilter: 'blur(4px)',
            }}
            bodyStyle={{ padding: isDesktop ? '40px 32px' : '16px 12px' }}
            width={isDesktop ? 540 : 328}
            data-test-id='partner-modal'
        >
            <div className='partner-info-modal-container'>
                <div className='partner-info-modal-block'>
                    <div className='partner-info'>
                        <Avatar size={42} src={currPartner?.imageSrc} icon={<UserOutlined />} />
                        <p className='partner-name'>{currPartner?.name}</p>
                    </div>
                    <div className='partner-training-info'>
                        <div className='partner-training-info__item'>
                            <span>Тип тренировки:</span>
                            <span>Средняя нагрузка:</span>
                        </div>
                        <div className='partner-training-info__item'>
                            <span>{currPartner?.trainingType}</span>
                            <span>{currPartner?.avgWeightInWeek} кг/нед</span>
                        </div>
                    </div>
                </div>
                <div className='partner-info-modal-block'>
                    <StatusComponent status={currPartner?.status} />
                    <Button size='large' onClick={handleClick}>
                        Отменить тренировку
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
