import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setPartnerInfoModal } from '@redux/workouts-slice/workouts-slice.ts';
import { Avatar, Card } from 'antd';

import { PartnerProps } from '../../../models';

import './active-partner-card.css';

type Props = {
    partner: PartnerProps;
    index: number;
};

export const ActivePartnerCard: React.FC<Props> = ({ partner, index }) => {
    const { name, trainingType, avgWeightInWeek, imageSrc } = partner;
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setPartnerInfoModal(partner));

    return (
        <Card
            className='partner-card active-partner-card'
            onClick={handleClick}
            data-test-id={`joint-training-cards${index}`}
        >
            <div className='partner-info'>
                <Avatar size={42} src={imageSrc} icon={<UserOutlined />} />
                <p className='partner-name'>{name}</p>
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
        </Card>
    );
};
