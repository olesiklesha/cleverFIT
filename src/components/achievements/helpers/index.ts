import { AchievementsPeriod, AchievementsPeriodType } from '@constants/index.ts';

import { Nullable, TrainingProps } from '../../../models';

export * from './no-training-icon.tsx';

type DatePeriod = {
    start: number;
    end: number;
};
export const getPeriod = (period: AchievementsPeriodType): DatePeriod => {
    if (period === AchievementsPeriod.WEEK) {
        const end = new Date(new Date().setHours(0, 0, 0, 0));
        const start = new Date(new Date(end).setDate(end.getDate() - 6));

        return {
            start: Date.parse(new Date(start.setHours(3, 0, 0, 0)).toISOString()),
            end: Date.parse(new Date(end.setHours(3, 0, 0, 0)).toISOString()),
        };
    }

    let end = new Date(new Date().setHours(0, 0, 0, 0));
    const start = new Date(new Date(end).setDate(end.getDate() - 28));

    const day = start.getDay();

    if (day === 1) {
        return {
            start: Date.parse(new Date(start.setHours(3, 0, 0, 0)).toISOString()),
            end: Date.parse(new Date(end.setHours(3, 0, 0, 0)).toISOString()),
        };
    }

    const mondayDate = (1 + 7 - day) % 7;
    const monday = new Date(
        new Date(start.setDate(start.getDate() + mondayDate)).setHours(0, 0, 0),
    );

    end = new Date(new Date(monday).setDate(monday.getDate() + 28 - 1));

    return {
        start: Date.parse(new Date(monday.setHours(3, 0, 0, 0)).toISOString()),
        end: Date.parse(new Date(end.setHours(3, 0, 0, 0)).toISOString()),
    };
};

export const getTrainingsForPeriod = (
    trainings: TrainingProps[],
    period: AchievementsPeriodType,
    filter: Nullable<string>,
) => {
    const dates = getPeriod(period);

    const noNameFiltered = trainings
        .filter((el) => {
            const date = new Date(new Date(el.date).setHours(3, 0, 0, 0)).getTime();

            return date >= dates.start && date <= dates.end;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (filter) {
        return noNameFiltered.filter((el) => el.name === filter);
    }

    return noNameFiltered;
};

export type ExercisesChart = {
    exercise: string;
    value: number;
};

type TrainingsAverages = {
    totalLoad: number;
    loadPerDay: number;
    approaches: number;
    replays: number;
};
export const getTrainingsAverages = (
    trainings: TrainingProps[],
    period: AchievementsPeriod,
): TrainingsAverages => {
    let approachesCounter = 0;
    let replaysCounter = 0;
    let totalLoad = 0;

    trainings.forEach((training) => {
        training.exercises.forEach((exercise) => {
            const { replays, weight, approaches } = exercise;

            approachesCounter += approaches;
            replaysCounter += replays;
            totalLoad += approaches * replays * weight;
        });
    });

    return {
        totalLoad,
        loadPerDay: +(totalLoad / period).toFixed(1),
        approaches: approachesCounter,
        replays: replaysCounter,
    };
};

export const getFavoriteTrainingName = (trainings: TrainingProps[]) => {
    const map: Map<string, number> = new Map();

    if (trainings.length === 0) return '';

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

    return trainingNamesArr[0][0];
};

export const getLoadByDay = (trainings: TrainingProps[]) => {
    const map = new Map<number, number>();

    for (let i = 1; i < 8; i++) {
        map.set(i, 0);
    }
    trainings.forEach((training) => {
        const { date } = training;
        const day = new Date(date).getDay();

        let load = map.has(day) ? (map.get(day) as number) : 0;
        let exercisesCounter = 0;

        training.exercises.forEach((exercise) => {
            const { replays, weight, approaches } = exercise;

            load += replays * weight * approaches;
            exercisesCounter += 1;
        });
        map.set(day === 0 ? 7 : day, Math.round(load / exercisesCounter));
    });

    return [...map.entries()];
};

export const getFavoriteExercises = (trainings: TrainingProps[]): ExercisesChart[] => {
    const map: Map<string, number> = new Map();

    if (!trainings.length) return [];

    trainings.forEach((training) => {
        training.exercises.forEach((exercise) => {
            const { name } = exercise;

            if (map.has(name)) {
                const count = map.get(name);

                map.set(name, count ? count + 1 : 1);
            } else {
                map.set(name, 1);
            }
        });
    });

    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

    return sorted.map((entry) => ({
        exercise: entry[0],
        value: entry[1],
    }));
};
export const getFavoriteExerciseByDay = (trainings: TrainingProps[]) => {
    const map = new Map<number, TrainingProps[]>();

    for (let i = 1; i < 8; i++) {
        map.set(i, []);
    }

    trainings.forEach((training) => {
        const { date } = training;
        const day = new Date(date).getDay();

        const prev = map.has(day) ? (map.get(day) as TrainingProps[]) : [];

        map.set(day === 0 ? 7 : day, [...prev, training]);
    });

    const exercisesMap = new Map<number, string>();

    for (let i = 1; i < 8; i++) {
        exercisesMap.set(i, '');
    }

    [...map.entries()].forEach((entry) => {
        const [key, filteredTrainings] = entry;

        if (!filteredTrainings.length) return;
        const favoriteExercise = getFavoriteExercises(filteredTrainings)[0].exercise;

        exercisesMap.set(key, favoriteExercise || '');
    });

    return [...exercisesMap.entries()];
};

export type LoadByDate = {
    type: string;
    value: number;
};

export const getFavoriteExercisesData = (trainings: TrainingProps[]): ExercisesChart[] => {
    const map = new Map<number, TrainingProps[]>();

    for (let i = 1; i < 8; i++) {
        map.set(i, []);
    }

    trainings.forEach((training) => {
        const { date } = training;
        const day = new Date(date).getDay();

        const prev = map.has(day) ? (map.get(day) as TrainingProps[]) : [];

        map.set(day === 0 ? 7 : day, [...prev, training]);
    });

    const exercisesMap = new Map<number, ExercisesChart | string>();

    for (let i = 1; i < 8; i++) {
        exercisesMap.set(i, '');
    }

    [...map.entries()].forEach((entry) => {
        const [key, filteredTrainings] = entry;

        if (!filteredTrainings.length) return;
        const favoriteExercise = getFavoriteExercises(filteredTrainings)[0];

        exercisesMap.set(key, favoriteExercise);
    });

    const favoriteExercises = [...exercisesMap.entries()].filter((el) => !!el[1]);

    const resultMap: Map<string, number> = new Map();

    favoriteExercises.forEach((el) => {
        const exerciseObj = el[1] as ExercisesChart;
        const { exercise, value } = exerciseObj;
        const exerciseName = exercise.toLowerCase();

        const curValue = resultMap.has(exerciseName)
            ? (resultMap.get(exerciseName) as number) + value
            : value;

        resultMap.set(exerciseName, curValue);
    });

    return [...resultMap.entries()].map((entry) => ({
        exercise: entry[0],
        value: entry[1],
    })) as ExercisesChart[];
};

export const getAverageDayLoadsByPeriod = (
    period: AchievementsPeriod,
    trainings: TrainingProps[],
): LoadByDate[] => {
    const datePeriod = getPeriod(period);
    const { start } = datePeriod;
    const res: LoadByDate[] = [];

    for (let i = 0; i < period; i++) {
        const date = new Date(new Date(start).setDate(new Date(start).getDate() + i));

        const trainingsForDate = trainings.filter(
            (el) =>
                new Date(new Date(el.date).setHours(3, 0, 0, 0)).toISOString() ===
                date.toISOString(),
        );
        let load = 0;
        let exerciseCount = 0;

        trainingsForDate.forEach((training) => {
            exerciseCount = 0;
            training.exercises.forEach((exercise) => {
                const { replays, weight, approaches } = exercise;

                load += replays * weight * approaches;
                exerciseCount += 1;
            });
        });

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');

        const dateStr = `${day}.${month}.${date.getFullYear()}`;

        res.push({
            type: dateStr,
            value: +(load / exerciseCount).toFixed(1) || 0,
        });
    }

    return res;
};

export const getLoadsByWeek = (
    period: AchievementsPeriod,
    trainings: TrainingProps[],
): LoadByDate[][] => {
    const data = getAverageDayLoadsByPeriod(period, trainings);
    const size = 7;
    const res: LoadByDate[][] = [];

    for (let i = 0; i < data.length; i += size) {
        res.push(data.slice(i, i + size));
    }

    return res;
};

export const getResultTitle = (period: AchievementsPeriod) =>
    period === AchievementsPeriod.WEEK
        ? 'Ой, такой тренировки на этой неделе не было'
        : 'Ой, такой тренировки в этом месяце не было';
