import { MAX_TRAINING_PALS } from '@constants/index.ts';
import {
    deleteJointTraining,
    getInvites,
    getPartners,
    getTrainingPalsAndInvites,
    getWorkouts,
    getWorkoutsList,
    postInvite,
    postWorkout,
    putWorkout,
    responseToInvite,
} from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    InviteProps,
    JoinTrainingsBlocks,
    JoinTrainingsBlocksState,
    Nullable,
    PartnerProps,
    RelativePosModal,
    TrainingInfo,
    TrainingProps,
    WorkoutsModals,
    WorkoutsModalsState,
} from '../../models';

type InitialState = {
    trainings: TrainingProps[];
    trainingList: TrainingInfo[];
    currTraining: Nullable<TrainingProps>;
    currPartner: Nullable<PartnerProps>;
    activePartners: PartnerProps[];
    trainingPals: PartnerProps[];
    invites: InviteProps[];
    searchValue: string;
    partners: PartnerProps[];
    modals: WorkoutsModalsState;
    relativeModalProps: RelativePosModal;
    jointTrainingBlocks: JoinTrainingsBlocksState;
    isWorkoutUpdated: boolean;
    isFavorite: boolean;
};

const initialState: InitialState = {
    trainings: [],
    trainingList: [],
    invites: [],
    trainingPals: [],
    currTraining: null,
    currPartner: null,
    isWorkoutUpdated: false,
    isFavorite: false,
    searchValue: '',
    partners: [],
    activePartners: [],
    relativeModalProps: {
        offset: 0,
        isTopLeft: true,
    },
    modals: {
        [WorkoutsModals.FETCH_ERROR]: false,
        [WorkoutsModals.TRAINING_LIST_ERROR]: false,
        [WorkoutsModals.EXERCISE_MODAL]: false,
        [WorkoutsModals.SAVE_ERROR]: false,
        [WorkoutsModals.SIDE_PANEL]: false,
        [WorkoutsModals.SAVE_SUCCESS]: false,
        [WorkoutsModals.JOINT_TRAINING_SIDE_PANEL]: false,
        [WorkoutsModals.WORKOUT_INFO]: false,
        [WorkoutsModals.PARTNER_INFO]: false,
    },
    jointTrainingBlocks: {
        [JoinTrainingsBlocks.INFO]: true,
        [JoinTrainingsBlocks.MESSAGES]: false,
        [JoinTrainingsBlocks.MY_PARTNERS]: true,
        [JoinTrainingsBlocks.PARTNERS_LIST]: false,
    },
};

type SetWorkoutsModal = {
    modal: keyof WorkoutsModalsState;
    isOpen: boolean;
};

type SetWorkoutsExerciseModal = {
    training: TrainingProps;
    offset: number;
    isTopLeft: boolean;
};

type SetWorkoutInfo = Omit<SetWorkoutsExerciseModal, 'isTopLeft'>;

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        setWorkoutsModalIsOpen: (state, { payload }: PayloadAction<SetWorkoutsModal>) => {
            state.modals[payload.modal] = payload.isOpen;

            if (
                payload.modal === WorkoutsModals.EXERCISE_MODAL ||
                payload.modal === WorkoutsModals.WORKOUT_INFO ||
                payload.modal === WorkoutsModals.SIDE_PANEL
            ) {
                state.currTraining = null;
            }

            if (
                payload.modal === WorkoutsModals.JOINT_TRAINING_SIDE_PANEL ||
                payload.modal === WorkoutsModals.PARTNER_INFO
            ) {
                state.currPartner = null;
            }
        },
        openEditSidePanel: (state, { payload }: PayloadAction<TrainingProps>) => {
            state.modals[WorkoutsModals.SIDE_PANEL] = true;
            state.currTraining = payload;
        },
        setWorkoutsExerciseModal: (state, { payload }: PayloadAction<SetWorkoutsExerciseModal>) => {
            state.modals[WorkoutsModals.EXERCISE_MODAL] = true;
            const { training, offset, isTopLeft } = payload;

            state.currTraining = training;
            state.relativeModalProps = {
                offset,
                isTopLeft,
            };
        },
        setDefaultModalsState: (state) => {
            state.modals[WorkoutsModals.SIDE_PANEL] = false;
            state.modals[WorkoutsModals.EXERCISE_MODAL] = false;
            state.currTraining = null;
        },
        openPartnersList: (state) => {
            state.jointTrainingBlocks[JoinTrainingsBlocks.PARTNERS_LIST] = true;
            state.jointTrainingBlocks[JoinTrainingsBlocks.MY_PARTNERS] = false;
            state.jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] = false;
            state.jointTrainingBlocks[JoinTrainingsBlocks.INFO] = false;
        },
        setDefaultJointTrainingsBlockState: (state) => {
            state.jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] = !!state.invites.length;
            state.jointTrainingBlocks[JoinTrainingsBlocks.PARTNERS_LIST] = false;
            state.jointTrainingBlocks[JoinTrainingsBlocks.MY_PARTNERS] = true;
            state.jointTrainingBlocks[JoinTrainingsBlocks.INFO] =
                state.trainingPals.length !== MAX_TRAINING_PALS;
        },
        setSearchValue: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload;
        },
        setJointTrainingSidePanel: (state, { payload }: PayloadAction<PartnerProps>) => {
            state.currPartner = payload;
            state.modals[WorkoutsModals.JOINT_TRAINING_SIDE_PANEL] = true;
        },
        setWorkoutInfoModal: (state, { payload }: PayloadAction<SetWorkoutInfo>) => {
            state.currTraining = payload.training;
            state.relativeModalProps.offset = payload.offset;
            state.modals[WorkoutsModals.WORKOUT_INFO] = true;
        },
        setWorkoutsDefaultState: () => initialState,
        setPartnerInfoModal: (state, { payload }: PayloadAction<PartnerProps>) => {
            state.currPartner = payload;
            state.modals[WorkoutsModals.PARTNER_INFO] = true;
        },
        setIsFavorite: (state, { payload }: PayloadAction<boolean>) => {
            state.isFavorite = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWorkouts.fulfilled, (state, { payload }) => {
            state.trainings = payload;
        });
        builder.addCase(getWorkouts.rejected, (state) => {
            state.modals[WorkoutsModals.FETCH_ERROR] = true;
        });
        builder.addCase(getWorkoutsList.fulfilled, (state, { payload }) => {
            state.trainingList = payload;
        });
        builder.addCase(getWorkoutsList.rejected, (state) => {
            state.modals[WorkoutsModals.TRAINING_LIST_ERROR] = true;
        });
        builder.addCase(postWorkout.fulfilled, (state, { payload }) => {
            state.trainings = [...payload];
            state.modals[WorkoutsModals.SAVE_SUCCESS] = true;
            state.isWorkoutUpdated = false;
        });
        builder.addCase(postWorkout.rejected, (state) => {
            state.modals[WorkoutsModals.SAVE_ERROR] = true;
        });
        builder.addCase(putWorkout.fulfilled, (state, { payload }) => {
            state.trainings = [...payload];
            state.modals[WorkoutsModals.SAVE_SUCCESS] = true;
            state.isWorkoutUpdated = true;
        });
        builder.addCase(putWorkout.rejected, (state) => {
            state.modals[WorkoutsModals.SAVE_ERROR] = true;
        });
        builder.addCase(getPartners.fulfilled, (state, { payload }) => {
            state.partners = payload || [];
        });
        builder.addCase(getPartners.rejected, (state) => {
            state.modals[WorkoutsModals.TRAINING_LIST_ERROR] = true;
        });
        builder.addCase(postInvite.fulfilled, (state, { payload }) => {
            state.partners = payload || [];
        });
        builder.addCase(postInvite.rejected, (state) => {
            state.modals[WorkoutsModals.SAVE_ERROR] = true;
        });
        builder.addCase(getTrainingPalsAndInvites.fulfilled, (state, { payload }) => {
            if (payload?.trainingPals.length === 4) {
                state.jointTrainingBlocks[JoinTrainingsBlocks.PARTNERS_LIST] = false;
                state.jointTrainingBlocks[JoinTrainingsBlocks.MY_PARTNERS] = true;
                state.jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] = false;
                state.jointTrainingBlocks[JoinTrainingsBlocks.INFO] = false;
                state.invites = [];
            } else {
                state.invites = payload ? payload.invites : [];
            }
            state.trainingPals = payload ? payload.trainingPals : [];

            if (payload && payload?.invites.length > 0) {
                state.jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] = true;
            }
        });
        builder.addCase(responseToInvite.fulfilled, (state, { payload }) => {
            state.invites = payload ? payload.invites : [];
            state.trainingPals = payload ? payload.trainingPals : [];

            if (!payload?.invites.length) {
                state.jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] = false;
            }
        });
        builder.addCase(deleteJointTraining.fulfilled, (state, { payload }) => {
            state.trainingPals = payload || [];
        });
        builder.addCase(deleteJointTraining.rejected, (state) => {
            state.modals[WorkoutsModals.SAVE_ERROR] = true;
        });
        builder.addCase(getInvites.fulfilled, (state, { payload }) => {
            state.invites = payload || [];
        });
    },
});

export const {
    setWorkoutsModalIsOpen,
    openEditSidePanel,
    setWorkoutsExerciseModal,
    setDefaultModalsState,
    openPartnersList,
    setDefaultJointTrainingsBlockState,
    setSearchValue,
    setJointTrainingSidePanel,
    setWorkoutInfoModal,
    setWorkoutsDefaultState,
    setPartnerInfoModal,
    setIsFavorite,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
