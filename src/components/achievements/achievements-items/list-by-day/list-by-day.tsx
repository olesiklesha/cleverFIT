import React from 'react';
import { Badge } from 'antd';

import './list-by-day.css';

type Props = {
    isExercises: boolean;
    data: Array<[number, string]> | Array<[number, number]>;
};

const dayNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
];

export const ListByDay: React.FC<Props> = ({ isExercises, data }) => (
    <div className='list-container'>
        <h3 className={isExercises ? '' : 'narrow-title'}>
            {isExercises
                ? 'Самые частые упражнения по дням недели'
                : 'Средняя нагрузка по дням недели'}
        </h3>
        <div className={`list ${isExercises ? '' : 'loads-list'}`}>
            {data.map((entry) => {
                const [dayNum, value] = entry;

                return (
                    <div className='list__item' key={dayNum}>
                        <Badge
                            count={dayNum}
                            size='small'
                            className={value ? 'active-list-badge' : ''}
                        >
                            <span />
                        </Badge>
                        <span className='dayName'>{dayNames[dayNum - 1]}</span>
                        {isExercises ? (
                            <span className='item__value'>{value || ''}</span>
                        ) : (
                            <span className='item__value'>
                                {value || ''}
                                {value === 0 ? '' : ' кг'}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);
