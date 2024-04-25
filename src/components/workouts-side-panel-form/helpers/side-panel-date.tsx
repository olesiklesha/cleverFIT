/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { getTrainingsForCurrentDate } from '@utils/helpers.ts';
import moment from 'moment/moment';

import { TrainingProps } from '../../../models';

export const dateRender = (current: moment.Moment, trainings: TrainingProps[]) => {
    const filteredTrainings = getTrainingsForCurrentDate(current, trainings);
    const style: React.CSSProperties = {};

    if (filteredTrainings.length !== 0) {
        style.background = '#F0F5FF';
    }

    return (
        <div className='ant-picker-cell-inner' style={style}>
            {current.date()}
        </div>
    );
};
