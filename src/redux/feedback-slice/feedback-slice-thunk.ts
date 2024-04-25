import { Endpoints, ErrorStatuses, Paths } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { signOut } from '@redux/auth-slice/auth-slice-thunk.ts';
import { AppDispatch, history, RootState } from '@redux/configure-store.ts';
import { toggleCreatorModal } from '@redux/feedback-slice/feedback-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FeedbackObj, NewFeedbackObj } from '../../models';
import { api } from '../../services';

export const getFeedback = createAsyncThunk<
    FeedbackObj[],
    string,
    {
        rejectValue: number;
        dispatch: AppDispatch;
    }
>('feedback/getFeedback', async (payload: string, { dispatch, rejectWithValue }) => {
    history.push(Paths.FEEDBACK);
    dispatch(toggleLoading());
    try {
        const response = await api.get(Endpoints.FEEDBACK, {
            headers: {
                Authorization: `Bearer ${payload}`,
            },
        });

        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            if (status === ErrorStatuses.FORBIDDEN) {
                dispatch(signOut());
            }

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const postFeedback = createAsyncThunk<
    Record<string, never>,
    NewFeedbackObj,
    {
        rejectValue: NewFeedbackObj;
        dispatch: AppDispatch;
        state: RootState;
    }
>('feedback/postFeedback', async (body, { dispatch, rejectWithValue, getState }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const { token } = state.auth;
        const response = await api.post(Endpoints.FEEDBACK, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(toggleLoading());

        if (token) {
            dispatch(getFeedback(token));
        }

        dispatch(toggleCreatorModal());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            dispatch(toggleLoading());

            return rejectWithValue(body);
        }
    }

    return undefined;
});
