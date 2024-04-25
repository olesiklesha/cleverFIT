import React from 'react';

import './averages-item-card.css';

type Props = {
    title: number;
    subTitle: string;
};
export const AveragesItemCard: React.FC<Props> = ({ title, subTitle }) => (
    <div className='average-card'>
        <h4>{title}</h4>
        <p>{subTitle}</p>
    </div>
);
