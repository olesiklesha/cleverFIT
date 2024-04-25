import React, { useEffect, useRef } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setJointTrainingSidePanel } from '@redux/workouts-slice/workouts-slice.ts';
import { Avatar, Button, Card, Tooltip } from 'antd';

import { InviteStatuses, Nullable, PartnerProps, StatusType } from '../../../models';

import './partner-card.css';

export const StatusComponent: React.FC<{
    status?: Nullable<StatusType>;
}> = ({ status }) => {
    if (status === InviteStatuses.ACCEPTED)
        return (
            <span className='invite-status-text'>
                тренировка одобрена
                <CheckCircleFilled style={{ color: Colors.SUCCESS, marginLeft: 8 }} />
            </span>
        );

    if (status === InviteStatuses.PENDING)
        return <span className='invite-status-text'>ожидает подтверждения</span>;

    if (status === InviteStatuses.REJECTED)
        return (
            <span className='invite-status-text'>
                тренировка отклонена
                <Tooltip
                    title='повторный запрос будет доступнен через 2 недели'
                    color='#000'
                    overlayStyle={{ width: 174, padding: '6px 8px' }}
                >
                    <ExclamationCircleOutlined style={{ marginLeft: 8 }} />
                </Tooltip>
            </span>
        );

    return <span>status</span>;
};

type Props = {
    partner: PartnerProps;
    index: number;
};
export const PartnerCard: React.FC<Props> = ({ partner, index }) => {
    const { name, trainingType, avgWeightInWeek, imageSrc, status } = partner;
    const { searchValue } = useAppSelector(workoutsSelector);
    const ref = useRef<HTMLParagraphElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const regex = new RegExp(searchValue, 'gi');

        if (ref.current) {
            ref.current.innerHTML = searchValue.trim()
                ? name.replace(regex, (match) => `<mark>${match}</mark>`)
                : name;
        }
    }, [name, searchValue]);

    const handleClick = () => dispatch(setJointTrainingSidePanel(partner));

    return (
        <Card
            className='partner-card'
            bordered={false}
            data-test-id={`joint-training-cards${index}`}
        >
            <div className='partner-info'>
                <Avatar size={42} src={imageSrc} icon={<UserOutlined />} />
                <p className='partner-name' ref={ref}>
                    {name}
                </p>
            </div>
            <div className='partner-training-info'>
                <div className='partner-training-info__item'>
                    <span>Тип тренировки:</span>
                    <span>Средняя нагрузка:</span>
                </div>
                <div className='partner-training-info__item'>
                    <span>{trainingType}</span>
                    <span>{avgWeightInWeek} кг/нед</span>
                </div>
            </div>
            <Button type='primary' onClick={handleClick} disabled={Boolean(status)}>
                Создать тренировку
            </Button>
            {status && <StatusComponent status={status} />}
        </Card>
    );
};
