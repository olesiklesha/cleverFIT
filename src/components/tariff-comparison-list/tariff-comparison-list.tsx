import React from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Colors } from '@constants/index.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileSelector } from '@redux/selectors.ts';
import { getExpirationDate } from '@utils/helpers.ts';
import { Tag } from 'antd';

import './tariff-comparison-list.css';

type TariffComparisonListItem = {
    text: string;
    free: boolean;
};

const TariffListItem: React.FC<TariffComparisonListItem> = ({ text, free }) => (
        <div className='tariff-list-item'>
            <span className='tariff-list-item__text'>{text}</span>
            <div className='comparison-icon-container'>
                {free ? (
                    <CheckCircleFilled style={{ fontSize: 18 }} />
                ) : (
                    <CloseCircleOutlined style={{ color: '#C8C8C8', fontSize: 18 }} />
                )}
                <CheckCircleFilled style={{ fontSize: 18 }} />
            </div>
        </div>
    );

const tariffComparisonListItems: TariffComparisonListItem[] = [
    {
        text: 'Статистика за месяц',
        free: true,
    },
    {
        text: 'Статистика за всё время',
        free: false,
    },
    {
        text: 'Совместные тренировки',
        free: true,
    },
    {
        text: 'Участие в марафонах',
        free: false,
    },
    {
        text: 'Приложение iOS',
        free: false,
    },
    {
        text: 'Приложение Android',
        free: false,
    },
    {
        text: 'Индивидуальный Chat GPT',
        free: false,
    },
];

export const TariffComparisonList = () => {
    const { userInfo } = useAppSelector(profileSelector);

    return (
        <React.Fragment>
            {userInfo?.tariff && (
                <span className='expiration-info'>
                    Ваш PRO tariff активен до {getExpirationDate(userInfo.tariff.expired)}
                </span>
            )}
            <div className='tariff-list-header'>
                <Tag color='#F0F0F0'>Free</Tag>
                <Tag color='#F0F5FF'>
                    Pro
                    {userInfo?.tariff && (
                        <CheckCircleOutlined style={{ color: Colors.SUCCESS, paddingLeft: 4 }} />
                    )}
                </Tag>
            </div>
            <div className='tariff-comparasion-list'>
                {tariffComparisonListItems.map((el) => (
                    <TariffListItem {...el} key={el.text} />
                ))}
            </div>
        </React.Fragment>
    );
};
