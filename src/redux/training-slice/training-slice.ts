import { CUSTOM_FORM_NEW_FIELD_PROPS } from '@constants/index.ts';
import {
    editTraining,
    getTrainingList,
    getTrainings,
    postTraining,
} from '@redux/training-slice/training-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ChangeExercisePayload,
    FormExerciseProps,
    FormProps,
    ModalProps,
    NewTrainingProps,
    Nullable,
    TrainingInfo,
    TrainingModals,
    TrainingModalsState,
    TrainingProps,
} from '../../models';

const sidePanelInitFormValues: FormExerciseProps = {
    name: undefined,
    weight: undefined,
    replays: undefined,
    approaches: undefined,
    _id: 'ex0',
};

type TrainingState = {
    trainingNames: TrainingInfo[];
    trainings: TrainingProps[];
    relativeModalProps: ModalProps;
    sidePanel: {
        isOpen: boolean;
        trainingName: Nullable<string>;
        formInitialProps: FormProps;
    };
    inputsToDelete: number[];
    isEditSidePanelOpen: boolean;
    newTraining: Nullable<NewTrainingProps>;
    curTraining: Nullable<TrainingProps>;
    trainingModals: TrainingModalsState;
};

const initialState: TrainingState = {
    trainingNames: [],
    trainings: [],
    newTraining: null,
    curTraining: null,
    isEditSidePanelOpen: false,
    relativeModalProps: {
        date: null,
        offset: 0,
        isTopLeft: true,
    },
    sidePanel: {
        isOpen: false,
        trainingName: null,
        formInitialProps: {
            exercises: [sidePanelInitFormValues],
        },
    },
    inputsToDelete: [],
    trainingModals: {
        [TrainingModals.CREATE_EXERCISE]: false,
        [TrainingModals.CREATE_TRAINING]: false,
        [TrainingModals.FETCH_ERROR]: false,
        [TrainingModals.SAVE_ERROR]: false,
        [TrainingModals.TRAINING_FETCH_ERROR]: false,
    },
};

type SetTrainingModal = {
    modal: keyof TrainingModalsState;
    isOpen: boolean;
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setModalIsOpen: (state, { payload }: PayloadAction<SetTrainingModal>) => {
            state.trainingModals[payload.modal] = payload.isOpen;
        },
        setModalProps: (state, { payload }: PayloadAction<ModalProps>) => {
            state.relativeModalProps = Object.assign(state.relativeModalProps, payload);
            state.trainingModals[TrainingModals.CREATE_TRAINING] = true;
            state.sidePanel.formInitialProps = {
                exercises: [sidePanelInitFormValues],
            };
        },
        openSidePanel: (state, { payload }: PayloadAction<string>) => {
            state.sidePanel.isOpen = true;
            state.sidePanel.trainingName = payload;
        },
        closeSidePanel: (state) => {
            state.sidePanel.isOpen = false;
        },
        addExercise: (state) => {
            state.sidePanel.formInitialProps.exercises.push({
                ...CUSTOM_FORM_NEW_FIELD_PROPS,
                _id: `ex_${state.sidePanel.formInitialProps.exercises.length}`,
            });
        },
        changeExercise: (state, { payload }: PayloadAction<ChangeExercisePayload>) => {
            const exercise = state.sidePanel.formInitialProps.exercises[payload.index];

            state.sidePanel.formInitialProps.exercises[payload.index] = Object.assign(
                exercise,
                payload.exercise,
            );
        },
        removeExercises: (state) => {
            const { exercises } = state.sidePanel.formInitialProps;
            const { inputsToDelete } = state;

            state.sidePanel.formInitialProps.exercises = exercises.filter(
                (_, i) => !inputsToDelete.includes(i),
            );
            state.inputsToDelete = [];
        },
        setInputToDelete: (state, { payload }: PayloadAction<number>) => {
            state.inputsToDelete = state.inputsToDelete.includes(payload)
                ? state.inputsToDelete.filter((el) => el !== payload)
                : [...state.inputsToDelete, payload];
        },
        setNewTraining: (state, { payload }: PayloadAction<NewTrainingProps>) => {
            state.newTraining = payload;
            state.sidePanel.formInitialProps = {
                exercises: payload.exercises.map((el) => el),
            };
        },
        updateFormInitialProps: (state) => {
            if (state.newTraining) {
                state.sidePanel.formInitialProps = {
                    exercises: [...state.newTraining.exercises.map((el) => el)],
                };
            }
        },
        setIsEditSidePanelOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isEditSidePanelOpen = payload;
        },
        setEditTrainingModal: (state, { payload }: PayloadAction<boolean>) => {
            state.trainingModals[TrainingModals.CREATE_EXERCISE] = payload;
            state.trainingModals[TrainingModals.CREATE_TRAINING] = false;

            if (!payload) {
                state.curTraining = null;
                state.newTraining = null;
            }
        },
        setCurTraining: (state, { payload }: PayloadAction<Nullable<TrainingProps>>) => {
            state.curTraining = payload;

            if (payload) {
                const exercises = payload.exercises.map((el) => ({
                    name: el.name,
                    replays: el.replays,
                    weight: el.weight,
                    approaches: el.approaches,
                    _id: el._id,
                }));

                state.sidePanel.trainingName = payload.name;
                state.newTraining = {
                    name: payload.name,
                    date: payload.date,
                    exercises,
                };
            }
        },
        setDefaultPropsAfterFetch: (state) => {
            state.sidePanel.formInitialProps = {
                exercises: [sidePanelInitFormValues],
            };
            state.newTraining = null;
            state.curTraining = null;
            state.trainingModals[TrainingModals.CREATE_EXERCISE] = false;
        },
        setDefaultTrainingsModals: (state) => {
            state.trainingModals = initialState.trainingModals;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTrainings.fulfilled, (state, { payload }) => {
            state.trainings = [...payload];
            state.trainingModals[TrainingModals.FETCH_ERROR] = false;
        });
        builder.addCase(getTrainings.rejected, (state) => {
            state.trainingModals[TrainingModals.FETCH_ERROR] = true;
        });
        builder.addCase(getTrainingList.fulfilled, (state, { payload }) => {
            state.trainingNames = [...payload];
        });
        builder.addCase(getTrainingList.rejected, (state) => {
            state.trainingModals[TrainingModals.TRAINING_FETCH_ERROR] = true;
        });
        builder.addCase(postTraining.fulfilled, (state, { payload }) => {
            state.trainings = [...state.trainings, payload];
            state.trainingModals[TrainingModals.CREATE_TRAINING] = true;
        });
        builder.addCase(postTraining.rejected, (state) => {
            state.trainingModals[TrainingModals.SAVE_ERROR] = true;
        });
        builder.addCase(editTraining.fulfilled, (state, { payload }) => {
            state.trainings = [...payload];
            state.trainingModals[TrainingModals.CREATE_TRAINING] = true;
        });
        builder.addCase(editTraining.rejected, (state) => {
            state.trainingModals[TrainingModals.SAVE_ERROR] = true;
        });
    },
});

export const {
    setModalProps,
    setModalIsOpen,
    openSidePanel,
    closeSidePanel,
    setNewTraining,
    setIsEditSidePanelOpen,
    setEditTrainingModal,
    setCurTraining,
    updateFormInitialProps,
    setDefaultPropsAfterFetch,
    addExercise,
    changeExercise,
    removeExercises,
    setInputToDelete,
    setDefaultTrainingsModals,
} = trainingSlice.actions;
export default trainingSlice.reducer;
