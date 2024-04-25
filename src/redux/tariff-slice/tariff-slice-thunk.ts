import { Endpoints } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, RootState } from '@redux/configure-store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PostTariffBody, Tariff } from '../../models/tariff-models.ts';
import { api } from '../../services';

export const getTariffList = createAsyncThunk<
    Tariff[],
    void,
    {
        state: RootState;
        dispatch: AppDispatch;
        rejectedValue: number;
    }
>('tariff/getTariffList', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        dispatch(toggleLoading());
        const { token } = getState().auth;
        const response = await api.get(Endpoints.TARIFF_LIST, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        dispatch(toggleLoading());
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const postTariff = createAsyncThunk<
    void,
    PostTariffBody,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>('tariff/postTariff', async (body, { dispatch, getState }) => {
    try {
        dispatch(toggleLoading());
        const { token } = getState().auth;

        await api.post(Endpoints.TARIFF, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(toggleLoading());
    } catch (error) {
        dispatch(toggleLoading());
    }
});
