import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { CustomCalendarIcon, CustomIdCardIcon } from '@components/sidebar/icons';
import { BtnCardType, Colors, Paths } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { getTrainings } from '@redux/training-slice/training-slice-thunk.ts';
import { getWorkouts } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Button, Card } from 'antd';

import './btn-card.css';

type BtnCardProps = {
    type: BtnCardType;
};

const iconArr = [
    <HeartFilled />,
    <CustomCalendarIcon style={{ color: Colors.PRIMARY }} />,
    <CustomIdCardIcon style={{ color: Colors.PRIMARY }} />,
];
const titleArr = ['Расписать тренировки', 'Назначить календарь', 'Заполнить профиль'];
const btnTextArr = ['Тренировки', 'Календарь', 'Профиль'];
const btnCardActionPaths = [Paths.WORKOUTS, Paths.CALENDAR, Paths.PROFILE];
const btnIDs = ['menu-button-training', 'menu-button-calendar', 'menu-button-profile'];

export const BtnCard: React.FC<BtnCardProps> = ({ type }) => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        history.push(btnCardActionPaths[type]);
        switch (btnCardActionPaths[type]) {
            case Paths.CALENDAR:
                dispatch(getTrainings());
                break;

            case Paths.WORKOUTS:
                dispatch(getWorkouts());
                break;

            default:
                break;
        }
    };

    return (
        <Card title={titleArr[type]} className='btn-card' bordered={false}>
            <Button
                type='text'
                icon={iconArr[type]}
                onClick={handleClick}
                data-test-id={btnIDs[type]}
            >
                {btnTextArr[type]}
            </Button>
        </Card>
    );
};
