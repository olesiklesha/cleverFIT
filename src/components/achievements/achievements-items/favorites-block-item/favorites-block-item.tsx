import React from 'react';

import './favorite-block-item.css';

type Props = {
    title: string;
    value: string;
};

export const FavoritesBlockItem: React.FC<Props> = ({ title, value }) => (
    <div className='favorite-block-item'>
        <div className='title-wrapper'>
            <span>{title}</span>
        </div>
        <span>{value}</span>
    </div>
);
