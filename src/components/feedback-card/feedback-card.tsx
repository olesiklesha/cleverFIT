import React from 'react';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { getFormattedDateStr } from '@components/feedback-card/helpers';
import { Avatar, Card, Rate } from 'antd';

import { FeedbackObj } from '../../models';

import './feedback-card.css';

export const FeedbackCard: React.FC<FeedbackObj> = ({
    fullName,
    createdAt,
    imageSrc,
    message,
    rating,
}) => (
    <Card className='feedback-card'>
        <div className='author-info'>
            {imageSrc ? (
                <Avatar src={imageSrc} size={42} />
            ) : (
                <Avatar icon={<UserOutlined />} size={42} />
            )}
            <p className='author-fullName'>{fullName || 'Пользователь'}</p>
        </div>
        <div className='feedback-body'>
            <div className='feedback-body__header'>
                <Rate
                    disabled={true}
                    defaultValue={rating}
                    allowHalf={false}
                    style={{ fontSize: 13, lineHeight: 1 }}
                    character={
                        <StarTwoTone
                            color='#FAAD14'
                            twoToneColor='#FAAD14'
                            style={{ fontSize: 13 }}
                        />
                    }
                />
                <span className='date'>{getFormattedDateStr(createdAt)}</span>
            </div>
            <p className='feedback-text'>{message}</p>
        </div>
    </Card>
);
