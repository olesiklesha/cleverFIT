import { Endpoints, ErrorStatuses, Paths } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, history } from '@redux/configure-store.ts';
import { setWorkoutsDefaultState } from '@redux/workouts-slice/workouts-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeToken, setToken } from '@utils/helpers.ts';
import axios from 'axios';

import { api } from '../../services';

interface LoginBody {
    email: string;
    password: string;
    remember?: boolean;
}

interface CheckEmailBody {
    email: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (payload: LoginBody, { dispatch, rejectWithValue }) => {
        dispatch(toggleLoading());
        try {
            const { remember, password, email } = payload;
            const response = await api.post(Endpoints.LOGIN, { email, password });

            if (remember) {
                setToken(response.data.accessToken);
            }

            dispatch(toggleLoading());
            history.push(Paths.MAIN);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status } = error.response;

                history.push(Paths.LOGIN_E, { isAfterRequest: true });

                dispatch(toggleLoading());

                return rejectWithValue(status);
            }
        }

        return undefined;
    },
);

export const registration = createAsyncThunk<
    LoginBody,
    LoginBody,
    {
        rejectValue: LoginBody;
    }
>('auth/registration', async (payload: LoginBody, { dispatch, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const response = await api.post(Endpoints.REGISTRATION, payload);

        history.push(Paths.SUCCESS, { isAfterRequest: true });
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            if (status === ErrorStatuses.CONFLICT)
                history.push(Paths.USER_EXIST_E, { isAfterRequest: true });
            else history.push(Paths.ERROR, { isAfterRequest: true });

            dispatch(toggleLoading());

            return rejectWithValue(payload);
        }
    }

    return undefined;
});

export const checkEmail = createAsyncThunk<
    CheckEmailBody,
    CheckEmailBody,
    {
        rejectValue: CheckEmailBody;
    }
>('auth/checkEmail', async (body, { dispatch, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const response = await api.post<CheckEmailBody>(Endpoints.CHECK_EMAIL, body);

        history.push(Paths.CONFIRM_EMAIL, { isAfterRequest: true, email: body.email });
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data, status } = error.response;
            const { message } = data;

            if (status === ErrorStatuses.NOT_FOUND && message === 'Email не найден') {
                history.push(Paths.EMAIL_EXIST_E, { isAfterRequest: true });
            } else {
                history.push(Paths.CHECK_EMAIL_E, { isAfterRequest: true });
            }
        }
        dispatch(toggleLoading());

        return rejectWithValue(body);
    }
});

interface ConfirmEmailBody {
    email: string;
    code: string;
}

export const confirmEmail = createAsyncThunk(
    'auth/confirmEmail',
    async (body: ConfirmEmailBody, { dispatch, rejectWithValue }) => {
        dispatch(toggleLoading());
        try {
            const response = await api.post<ConfirmEmailBody>(Endpoints.CONFIRM_EMAIL, body, {
                withCredentials: true,
            });

            history.push(Paths.CHANGE_PASS, { isAfterRequest: true });
            dispatch(toggleLoading());

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                dispatch(toggleLoading());

                return rejectWithValue(ErrorStatuses.NOT_FOUND);
            }
        }

        return undefined;
    },
);

interface ChangePassBody {
    password: string;
    confirmPassword: string;
}

export const changePassword = createAsyncThunk<
    ChangePassBody,
    ChangePassBody,
    { rejectValue: string }
>('auth/changePass', async (body: ChangePassBody, { dispatch, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const response = await api.post(Endpoints.CHANGE_PASS, body, { withCredentials: true });

        history.push(Paths.SUCCESS_PASS_RECOVERY, { afterChangePass: true, isAfterRequest: true });
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            history.push(Paths.CHANGE_PASS_E, { isAfterRequest: true });
            dispatch(toggleLoading());

            return rejectWithValue(body.password);
        }
    }

    return undefined;
});

export const signOut = createAsyncThunk<
    void,
    void,
    {
        dispatch: AppDispatch;
    }
>('auth/signOut', async (_, { dispatch }) => {
    removeToken();
    dispatch(setWorkoutsDefaultState());
    history.push(Paths.AUTH);
});
