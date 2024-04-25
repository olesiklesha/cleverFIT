import { Endpoints } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, RootState } from '@redux/configure-store.ts';
import { setModalIsOpen } from '@redux/profile-slice/profile-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProfileModals, PutUserBody, UserResponse } from '../../models/user-models.ts';
import { api } from '../../services';

export const getUserInfo = createAsyncThunk<
    UserResponse,
    void,
    {
        state: RootState;
    }
>('profile/getUserInfo', async (_, { getState }) => {
    try {
        const { token } = getState().auth;
        const response = await api.get(Endpoints.GET_USER, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (e) {
        return undefined;
    }
});

export const putUserInfo = createAsyncThunk<
    UserResponse,
    PutUserBody,
    {
        state: RootState;
        dispatch: AppDispatch;
        rejectedValue: number;
    }
>('profile/putUserInfo', async (body, { getState, dispatch, rejectWithValue }) => {
    try {
        dispatch(toggleLoading());
        const { token } = getState().auth;
        const response = await api.put(Endpoints.PUT_USER, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(toggleLoading());

        if (Object.entries(body).length > 1) {
            dispatch(
                setModalIsOpen({
                    isOpen: true,
                    modal: ProfileModals.SUCCESS,
                }),
            );
        }

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
