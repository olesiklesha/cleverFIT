/* eslint-disable import/no-extraneous-dependencies */
import { PERIODS, WORKOUTS_FORM_DEFAULT_VALUE } from '@constants/index.ts';
import moment from 'moment';

import {
    ExerciseFormProps,
    Nullable,
    TrainingInfo,
    TrainingProps,
    WorkoutsFormProps,
} from '../../../models';

export { dateRender } from './side-panel-date.tsx';

export const getTrainingNameOptions = (trainingName: TrainingInfo[]) =>
    trainingName.map((el) => ({
        value: el.name,
        label: el.name,
    }));

export const getPeriodOptions = () =>
    PERIODS.map((el, i) => ({
        value: i + 1,
        label: el,
    }));

export const isFormValid = (values: WorkoutsFormProps) => {
    const { date, trainingName, exercises } = values;

    if (!trainingName) return false;
    if (!date) return false;
    const filteredExercises = exercises.filter((el) => el && el.name);

    return exercises.length > 0 && filteredExercises.length === exercises.length;
};

export const disablePastDate = (current: moment.Moment) =>
    current && current < moment().endOf('day');

export const getInitialFormValues = (training: Nullable<TrainingProps>): WorkoutsFormProps => {
    if (!training) return WORKOUTS_FORM_DEFAULT_VALUE;

    const exercises: ExerciseFormProps[] = training.exercises.map((el) => ({
        name: el.name,
        replays: el.replays,
        weight: el.weight,
        approaches: el.approaches,
    }));

    return {
        date: moment(training.date),
        period: training.parameters.period,
        repeat: training.parameters.repeat,
        trainingName: training.name,
        exercises,
    } as WorkoutsFormProps;
};
