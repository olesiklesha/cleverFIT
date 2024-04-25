import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { getFormattedDateStr } from '@components/feedback-card/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setWorkoutInfoModal } from '@redux/workouts-slice/workouts-slice.ts';
import { responseToInvite } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { getName } from '@utils/helpers.ts';
import { Avatar, Button, Card } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Title from 'antd/es/typography/Title';

import { InviteProps, InviteStatuses } from '../../models';

import './workouts-invite-message-card.css';

type Props = {
    invite: InviteProps;
    setParent: React.Dispatch<React.SetStateAction<HTMLElement>>;
};
export const WorkoutsInviteMessageCard: React.FC<Props> = ({ invite, setParent }) => {
    const { training, from, createdAt } = invite;
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();
    const handleInfoBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLElement;
        const targetParent = target.closest('.invite-card') as HTMLElement;

        const parent = isDesktop ? target : targetParent;

        setParent(parent);
        let offset = 0;

        if (!isDesktop) {
            const parentBottom = targetParent.getBoundingClientRect().bottom;
            const childTop = e.currentTarget.getBoundingClientRect().top;

            offset = parentBottom - childTop + 10;
        }

        dispatch(
            setWorkoutInfoModal({
                offset,
                training,
            }),
        );
    };

    const handleAcceptBtn = () =>
        dispatch(
            responseToInvite({
                id: invite._id,
                status: InviteStatuses.ACCEPTED,
            }),
        );

    const handleRejectBtn = () =>
        dispatch(
            responseToInvite({
                id: invite._id,
                status: InviteStatuses.REJECTED,
            }),
        );

    return (
        <Card className='feedback-card invite-card' bordered={false}>
            <div className='author-info'>
                <Avatar src={from.imageSrc} size={42} icon={<UserOutlined />} />

                <p className='author-fullName'>{getName(from.firstName, from.lastName)}</p>
            </div>
            <div className='feedback-body'>
                <div className='feedback-body__header'>
                    <span className='date'>{getFormattedDateStr(createdAt)}</span>
                </div>
                <div>
                    <Title level={3}>
                        Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </Title>
                    <Button
                        type='text'
                        style={{ color: Colors.PRIMARY }}
                        size='small'
                        onClick={handleInfoBtn}
                        className='relative-btn'
                        block={!isDesktop}
                    >
                        Посмотреть детали тренировки
                    </Button>
                </div>
            </div>
            <div className='invite-card__btns'>
                <Button type='primary' size='large' onClick={handleAcceptBtn}>
                    Тренироваться вместе
                </Button>
                <Button size='large' onClick={handleRejectBtn}>
                    Отклонить запрос
                </Button>
            </div>
        </Card>
    );
};
