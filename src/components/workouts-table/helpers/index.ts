import { PERIODS } from '@constants/index.ts';

import { TrainingProps, Undefinable, WorkoutsFormData } from '../../../models';

export const getFormattedTableData = (trainings: TrainingProps[]): WorkoutsFormData[] =>
    trainings.map((training) => ({
        name: training.name,
        date: training.date,
        id: training._id,
        period: training.parameters.period,
        isImplementation: training.isImplementation,
    })) as WorkoutsFormData[];

export const getPeriodStr = (period: Undefinable<number>) => {
    if (!period) return period;

    return PERIODS[period - 1];
};

export const compare = (a: WorkoutsFormData, b: WorkoutsFormData) => {
    if (!a.period) return -1;
    if (!b.period) return 1;
    if (a.period > b.period) return -1;
    if (a.period === b.period) return 0;
    if (a.period < b.period) return 1;

    return 0;
};
