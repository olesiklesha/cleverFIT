import { Colors } from '@constants/index.ts';

import {
    ExerciseFormProps,
    FormExerciseProps,
    NewExerciseProps,
    NotFormattedExerciseProps,
    Nullable,
    TrainingInfo,
} from '../../../models';

export const getNonEmptyTitleExercises = (
    exercises: FormExerciseProps[] | ExerciseFormProps[],
): NewExerciseProps[] => {
    const filteredNonEmptyTitle = exercises.filter((el) => el && el.name);

    return filteredNonEmptyTitle.map(
        (el) =>
            ({
                name: el.name,
                approaches: el.approaches ? Number(el.approaches) : 1,
                replays: el.replays ? Number(el.replays) : 1,
                weight: el.weight ? Number(el.weight) : 0,
            } as NewExerciseProps),
    );
};
export const getNonEmptyTitle = (exercises: NotFormattedExerciseProps[]): NewExerciseProps[] => {
    const filtered = exercises.filter((el) => el && el.name);

    const preparedArr = filtered.map((el) => {
        const result = { ...el };

        if (!el.weight) result.weight = 0;
        if (!el.approaches) result.approaches = 1;
        if (!el.replays) result.replays = 1;

        return result;
    });

    return preparedArr as NewExerciseProps[];
};

export const TRAINING_COLORS: Record<string, string> = {
    legs: Colors.ERROR,
    hands: '#13C2C2',
    strength: '#FADB14',
    back: '#FA8C16',
    chest: Colors.SUCCESS,
};

export const getTrainingColor = (
    trainingNames: TrainingInfo[],
    trainingName?: Nullable<string>,
) => {
    if (!trainingName) return 'training';

    const training = trainingNames.find((el) => el.name === trainingName);

    return training ? TRAINING_COLORS[training?.key] : 'training';
};
