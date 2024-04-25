import { Endpoints, Paths } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, history, RootState } from '@redux/configure-store.ts';
import { setDefaultPropsAfterFetch } from '@redux/training-slice/training-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFormattedPostTrainingBody } from '@utils/helpers.ts';
import axios from 'axios';

import { NewTrainingProps, TrainingInfo, TrainingProps } from '../../models';
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

        history.push(Paths.CALENDAR);
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            history.push(Paths.MAIN);
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

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const postTraining = createAsyncThunk<
    TrainingProps,
    NewTrainingProps,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('training/postTraining', async (newTraining, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const body = getFormattedPostTrainingBody(newTraining);
        const response = await api.post(Endpoints.TRAINING, body, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(setDefaultPropsAfterFetch());
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(setDefaultPropsAfterFetch());
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const editTraining = createAsyncThunk<
    TrainingProps[],
    TrainingProps,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('training/editTraining', async (body, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const path = `${Endpoints.TRAINING}/${body._id}`;

        await api.put(path, body, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        const response = await api.get(Endpoints.TRAINING, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(setDefaultPropsAfterFetch());
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(setDefaultPropsAfterFetch());
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});
