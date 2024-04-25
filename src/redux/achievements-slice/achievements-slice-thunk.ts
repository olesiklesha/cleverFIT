import { Endpoints, Paths } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, history, RootState } from '@redux/configure-store.ts';
import { setFetchErrorModalOpened } from '@redux/feedback-slice/feedback-slice.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { TrainingInfo, TrainingProps, WorkoutsModals } from '../../models';
import { api } from '../../services';

export const getTrainings = createAsyncThunk<
    TrainingProps[],
    void,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('training/getTrainings', async (_, { dispatch, rejectWithValue, getState }) => {
    dispatch(toggleLoading());

    try {
        const state = getState();
        const response = await api.get(Endpoints.TRAINING, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        history.push(Paths.ACHIEVEMENTS);
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            history.push(Paths.MAIN);
            dispatch(
                setWorkoutsModalIsOpen({
                    modal: WorkoutsModals.FETCH_ERROR,
                    isOpen: true,
                }),
            );
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const getTrainingList = createAsyncThunk<
    TrainingInfo[],
    void,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('training/getTrainingList', async (_, { dispatch, rejectWithValue, getState }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const response = await api.get(Endpoints.TRAINING_LIST, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(setFetchErrorModalOpened(true));
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});
