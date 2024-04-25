/* eslint-disable import/no-extraneous-dependencies */
import { getNonEmptyTitleExercises } from '@components/calendar-side-panels/helpers';
import { isPast } from '@components/training-modals/helpers';
import moment from 'moment';

import {
    ExercisesPropsForRequest,
    InviteStatuses,
    NewTrainingProps,
    Nullable,
    PartnerProps,
    PeriodType,
    PostTrainingBody,
    PostTrainingBodyWithParameters,
    TrainingInfo,
    TrainingProps,
    WorkoutsFormProps,
} from '../models';

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const setToken = (value: string) => {
    localStorage.setItem('token', value);
};

export const getTrainingsForCurrentDate = (date: moment.Moment, trainings: TrainingProps[]) => {
    const currDateStr = date.toISOString().slice(0, 10);

    return trainings.filter((el) => {
        if (typeof el.date === 'number')
            return new Date(el.date).toISOString().slice(0, 10) === currDateStr;

        return el.date.slice(0, 10) === currDateStr;
    });
};

export const getFormattedPostTrainingBody = (newTraining: NewTrainingProps): PostTrainingBody => {
    const exercises: ExercisesPropsForRequest[] = newTraining.exercises.map((el) => ({
        name: el.name,
        replays: el.replays,
        weight: el.weight,
        approaches: el.approaches,
        isImplementation: false,
    }));

    return {
        name: newTraining.name,
        date: new Date(newTraining.date).toISOString(),
        isImplementation: false,
        exercises,
    } as PostTrainingBody;
};

export const getFormattedTrainingBodyFromForm = (
    formValues: WorkoutsFormProps,
): PostTrainingBodyWithParameters => {
    const { trainingName, date, exercises, repeat, period } = formValues;

    const preparedExercises = getNonEmptyTitleExercises(exercises).map((el) => ({
        ...el,
        isImplementation: false,
    }));

    const result = {
        name: trainingName,
        date: date?.toISOString(),
        isImplementation: false,
        exercises: preparedExercises,
    } as PostTrainingBodyWithParameters;

    return repeat
        ? ({
              ...result,
              parameters: {
                  repeat,
                  period: period as PeriodType,
              },
          } as PostTrainingBodyWithParameters)
        : result;
};

export const getEditWorkoutBody = (training: TrainingProps, changedTraining: WorkoutsFormProps) => {
    const exercises = getNonEmptyTitleExercises(changedTraining.exercises).map((el) => ({
        ...el,
        isImplementation: false,
    }));
    const isPastDate = isPast(changedTraining.date?.toISOString() as string);

    const result = {
        ...training,
        isImplementation: isPastDate,
        date: changedTraining.date?.toISOString(),
        parameters: {
            repeat: changedTraining.repeat,
        },
        exercises,
    } as TrainingProps;

    return changedTraining.period
        ? ({
              ...training,
              isImplementation: isPastDate,
              date: changedTraining.date?.toISOString(),
              parameters: {
                  repeat: changedTraining.repeat,
                  period: changedTraining.period,
              },
              exercises,
          } as TrainingProps)
        : result;
};

export const getExpirationDate = (isoStr: string) => {
    const date = new Date(isoStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}.${month}`;
};

export const getFavoriteTrainingType = (
    trainings: TrainingProps[],
    trainingList: TrainingInfo[],
) => {
    const map: Map<string, number> = new Map();

    if (trainings.length === 0 || trainingList.length === 0) return 'random';

    trainings.forEach((training) => {
        const { name } = training;

        if (map.has(name)) {
            const count = map.get(name);

            map.set(name, count ? count + 1 : 1);
        } else {
            map.set(name, 1);
        }
    });

    const trainingNamesArr = [...map.entries()].sort((a, b) => b[1] - a[1]);

    const trainingInfo = trainingList.find(
        (el) => el.name === trainingNamesArr[0][0],
    ) as TrainingInfo;

    return trainingInfo.key;
};

const alphabeticallySort = (a: PartnerProps, b: PartnerProps) => a.name.localeCompare(b.name);

export const getSortedPartners = (partners: PartnerProps[]): PartnerProps[] => {
    const accepted = partners.filter((el) => el.status === InviteStatuses.ACCEPTED);
    const rejected = partners.filter((el) => el.status === InviteStatuses.REJECTED);
    const remaining = partners.filter(
        (el) => el.status !== InviteStatuses.ACCEPTED && el.status !== InviteStatuses.REJECTED,
    );

    return [
        ...accepted.sort(alphabeticallySort),
        ...remaining.sort(alphabeticallySort),
        ...rejected.sort(alphabeticallySort),
    ];
};

export const isTopLeftPos = (
    targetX: number,
    targetY: number,
    viewportX: number,
    viewportY: number,
) => {
    const modalWidth = 264;
    const maxModalHeight = 262;

    return targetX + modalWidth < viewportX && targetY + maxModalHeight < viewportY;
};

export const getName = (firstName: Nullable<string>, lastName: Nullable<string>) => {
    const res = `${firstName || ''} ${lastName || ''}`;

    return res.trim().length ? res.trim() : 'Пользователь';
};
