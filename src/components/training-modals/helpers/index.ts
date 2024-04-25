import {
    DefaultOptionType,
    ExercisesPropsForRequest,
    NewTrainingProps,
    Nullable,
    TrainingInfo,
    TrainingProps,
} from '../../../models';

export const getFormattedStr = (dateStr: Nullable<string> | number) => {
    if (!dateStr) return 'date';

    const date = new Date(dateStr);
    const dayNum = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${dayNum}.${month}.${year}`;
};

export const getModalTitleWithDate = (dateStr: Nullable<string>) => {
    if (!dateStr) return 'Тренировка';

    return `Тренировка на ${getFormattedStr(dateStr)}`;
};

export const isPast = (dateStr: Nullable<string>) => {
    if (!dateStr) return true;

    const currDate = new Date();
    const date = new Date(dateStr);

    return (
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0).getTime() <=
        new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 0).getTime()
    );
};

export const getTrainingsForDate = (date: Nullable<string>, trainings: TrainingProps[]) => {
    if (!date) return [];
    const currDateStr = date.slice(0, 10);

    return trainings.filter((el) => {
        if (typeof el.date === 'number')
            return new Date(el.date).toISOString().slice(0, 10) === currDateStr;

        return el.date.slice(0, 10) === currDateStr;
    });
};

export const getCurTraining = (
    trainingName: string,
    date: Nullable<string>,
    trainings: TrainingProps[],
) => {
    const dayTrainings = getTrainingsForDate(date, trainings);

    return dayTrainings.find((el) => el.name === trainingName) || null;
};

export const getEditSelectOptions = (
    names: TrainingInfo[],
    date: Nullable<string>,
    trainings: TrainingProps[],
    isNew: boolean,
): DefaultOptionType[] | undefined => {
    const isPastDate = isPast(date);

    const usedNames = getTrainingsForDate(date, trainings)
        .filter((training) => !training.isImplementation)
        .map((el) => el.name);
    const remainingNames = names.filter((el) => usedNames.includes(el.name));

    if (isPastDate) {
        return remainingNames.length
            ? remainingNames.map((el) => ({
                  value: el.name,
                  label: el.name,
              }))
            : undefined;
    }

    if (isNew) {
        const unusedNames = names.filter((el) => !usedNames.includes(el.name));

        return unusedNames.length
            ? unusedNames.map((el) => ({
                  value: el.name,
                  label: el.name,
              }))
            : undefined;
    }

    return names.map((el) => ({
        value: el.name,
        label: el.name,
    }));
};

export const getEditTrainingBody = (
    training: TrainingProps,
    changedTraining: NewTrainingProps,
    isPastDate: boolean,
) => {
    const formattedDate =
        typeof changedTraining.date === 'number'
            ? new Date(changedTraining.date).toISOString()
            : changedTraining.date;

    const exercises: ExercisesPropsForRequest[] = changedTraining.exercises.map((el) => ({
        ...el,
        isImplementation: false,
    }));

    return {
        ...training,
        isImplementation: isPastDate,
        date: formattedDate,
        exercises,
    } as TrainingProps;
};
