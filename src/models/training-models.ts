import { Nullable, Undefinable } from '.';

export type ExerciseProps = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type NewExerciseProps = Omit<ExerciseProps, 'isImplementation'>;

export type FormExerciseProps = {
    name: Undefinable<string>;
    approaches: Undefinable<number>;
    replays: Undefinable<number>;
    weight: Undefinable<number>;
    _id: string;
};

export type NotFormattedExerciseProps = {
    name: string;
    approaches?: number;
    replays?: number;
    weight?: number;
};

export type TrainingParams = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type TrainingInfo = {
    name: string;
    key: string;
};

export type TrainingProps = {
    _id: string;
    name: string;
    date: string | number;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParams;
    exercises: ExerciseProps[];
};

export type NewTrainingProps = Omit<
    TrainingProps,
    '_id' | 'isImplementation' | 'exercises' | 'userId' | 'parameters'
> & {
    exercises: NewExerciseProps[];
};

export type ExercisesPropsForRequest = Omit<ExerciseProps, '_id'>;

export type PostTrainingBody = Omit<
    TrainingProps,
    '_id' | 'userId' | 'parameters' | 'exercises'
> & {
    exercises: ExercisesPropsForRequest[];
};

export type PostTrainingBodyWithParameters = PostTrainingBody & {
    parameters?: Omit<TrainingParams, 'jointTraining' | 'participants'>;
};

export type DefaultOptionType = {
    value: string;
    label: string;
};

export type RelativePosModalProps = {
    parent: HTMLElement;
};

export type RelativePosModal = {
    isTopLeft: boolean;
    offset: number;
};

export type ModalProps = RelativePosModal & {
    date: Nullable<string>;
};

export type FormProps = {
    exercises: FormExerciseProps[];
};

export enum TrainingModals {
    CREATE_TRAINING,
    CREATE_EXERCISE,
    FETCH_ERROR,
    TRAINING_FETCH_ERROR,
    SAVE_ERROR,
}

export type TrainingModalsState = { [key in TrainingModals]: boolean };

export type CustomFormProps = {
    name: Undefinable<string>;
    approaches: Undefinable<string>;
    weight: Undefinable<string>;
    replays: Undefinable<string>;
    isChecked?: Undefinable<boolean>;
};

export type ChangeExercisePayload = {
    index: number;
    exercise: FormExerciseProps;
};
