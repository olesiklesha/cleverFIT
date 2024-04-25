import React from 'react';
import Icon from '@ant-design/icons';
import {
    AveragesBlock,
    ExercisesBlock,
    FavoritesBlock,
    LoadsBlock,
    LoadsByWeek,
} from '@components/achievements/achievements-items';
import { AchievementsPeriod } from '@constants/index.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';
import { Result } from 'antd';

import { getResultTitle, NoTrainingIcon } from './helpers';
import { TrainingsFilter } from './trainings-filter';

import './achievements.css';

export const Achievements = () => {
    const { filteredTrainings, period } = useAppSelector(achievementsSelector);

    return (
        <div className='statistic-container'>
            <TrainingsFilter />
            {!filteredTrainings.length && (
                <Result
                    className='empty-achievements'
                    title={getResultTitle(period)}
                    icon={<Icon component={NoTrainingIcon} />}
                />
            )}
            {filteredTrainings.length !== 0 && (
                <React.Fragment>
                    <LoadsBlock />
                    {period === AchievementsPeriod.MONTHS && <LoadsByWeek />}
                    <AveragesBlock />
                    <FavoritesBlock />
                    <ExercisesBlock />
                </React.Fragment>
            )}
        </div>
    );
};
