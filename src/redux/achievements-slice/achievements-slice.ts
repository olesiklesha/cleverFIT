import { getTrainingsForPeriod } from '@components/achievements/helpers';
import { AchievementsPeriod } from '@constants/index.ts';
import {
    getTrainingList,
    getTrainings,
} from '@redux/achievements-slice/achievements-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, TrainingInfo, TrainingProps } from '../../models';

type InitState = {
    trainings: TrainingProps[];
    trainingList: TrainingInfo[];
    filter: Nullable<string>;
    period: AchievementsPeriod;
    filteredTrainings: TrainingProps[];
};

const initialState: InitState = {
    trainings: [],
    trainingList: [],
    filter: null,
    period: AchievementsPeriod.WEEK,
    filteredTrainings: [],
};

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        setFilter: (state, { payload }: PayloadAction<Nullable<string>>) => {
            state.filter = payload;
            const { period, filter, trainings } = state;

            state.filteredTrainings = getTrainingsForPeriod(trainings, period, filter);
        },
        setPeriod: (state, { payload }: PayloadAction<AchievementsPeriod>) => {
            state.period = payload;
            state.filter = null;
            const { period, trainings, filter } = state;

            state.filteredTrainings = getTrainingsForPeriod(trainings, period, filter);
        },
        setDefault: (state) => {
            state.period = AchievementsPeriod.WEEK;
            state.filter = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTrainings.fulfilled, (state, { payload }) => {
            state.trainings = payload;
            const { period, filter, trainings } = state;

            state.filteredTrainings = getTrainingsForPeriod(trainings, period, filter);
        });
        builder.addCase(getTrainingList.fulfilled, (state, { payload }) => {
            state.trainingList = payload;
        });
    },
});

export const { setFilter, setPeriod, setDefault } = achievementsSlice.actions;
export default achievementsSlice.reducer;
