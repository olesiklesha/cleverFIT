/* eslint-disable import/no-extraneous-dependencies */
import { Moment } from 'moment';

import { FormExerciseProps, TrainingProps } from './training-models.ts';
import { Nullable, Undefinable } from './utility-models.ts';

export enum WorkoutsModals {
    FETCH_ERROR,
    TRAINING_LIST_ERROR,
    SIDE_PANEL,
    SAVE_ERROR,
    SAVE_SUCCESS,
    EXERCISE_MODAL,
    JOINT_TRAINING_SIDE_PANEL,
    WORKOUT_INFO,
    PARTNER_INFO,
}

export enum JoinTrainingsBlocks {
    INFO,
    MESSAGES,
    MY_PARTNERS,
    PARTNERS_LIST,
}

export type JoinTrainingsBlocksState = { [key in JoinTrainingsBlocks]: boolean };

export type PeriodType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type WorkoutsModalsState = { [key in WorkoutsModals]: boolean };

export type ExerciseFormProps = Omit<FormExerciseProps, '_id'>;

export enum InviteStatuses {
    ACCEPTED = 'accepted',
    PENDING = 'pending',
    REJECTED = 'rejected',
}

export type StatusType = 'accepted' | 'pending' | 'rejected';

export type WorkoutsFormProps = {
    trainingName: Undefinable<string>;
    date: Undefinable<Moment>;
    repeat: boolean;
    period: Undefinable<PeriodType>;
    exercises: ExerciseFormProps[];
};

export type JointWorkoutsFormProps = Omit<WorkoutsFormProps, 'trainingName'>;

export type PartnerProps = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: Nullable<string>;
    avgWeightInWeek: number;
    status: Nullable<StatusType>;
    inviteId: Nullable<string>;
};

export type InviteProps = {
    _id: string;
    from: {
        _id: string;
        firstName: Nullable<string>;
        lastName: Nullable<string>;
        imageSrc: Nullable<string>;
    };
    training: TrainingProps;
    status: string;
    createdAt: string;
};

export type WorkoutsFormData = {
    name: string;
    date: string;
    id: string;
    period: Undefinable<PeriodType>;
    isImplementation: boolean;
};
