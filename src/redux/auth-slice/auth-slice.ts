import {
    changePassword,
    checkEmail,
    confirmEmail,
    login,
    registration,
    signOut,
} from '@redux/auth-slice/auth-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken, setToken } from '@utils/helpers.ts';

import { Nullable } from '../../models';

type AuthState = {
    token: Nullable<string>;
    loading: boolean;
    errorStatus: Nullable<number>;
    email: Nullable<string>;
    newPass: Nullable<string>;
};

const initialState: AuthState = {
    token: getToken(),
    loading: false,
    errorStatus: 0,
    email: null,
    newPass: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        toggleLoading(state) {
            state.loading = !state.loading;
        },
        setAuthToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            setToken(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (state) => {
            state.email = null;
            state.newPass = null;
            state.errorStatus = null;
        });

        builder.addCase(registration.rejected, (state, { payload }) => {
            if (payload) {
                const { email, password } = payload;

                state.email = email;
                state.newPass = password;
            }
        });

        builder.addCase(signOut.fulfilled, (state) => {
            state.token = null;
            state.email = null;
            state.newPass = null;
            state.errorStatus = null;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            const { accessToken } = action.payload;

            state.token = accessToken;
            state.newPass = null;
            state.email = null;
            state.errorStatus = null;
        });

        builder.addCase(login.rejected, (state, { payload }) => {
            state.token = null;
            state.errorStatus = payload as number;
        });

        builder.addCase(checkEmail.fulfilled, (state, { payload }) => {
            state.email = payload.email;
            state.errorStatus = null;
        });

        builder.addCase(checkEmail.rejected, (state, { payload }) => {
            state.email = payload ? payload.email : null;
        });

        builder.addCase(confirmEmail.fulfilled, (state) => {
            state.errorStatus = null;
        });

        builder.addCase(confirmEmail.rejected, (state, { payload }) => {
            state.errorStatus = payload as number;
        });

        builder.addCase(changePassword.fulfilled, (state) => {
            state.errorStatus = null;
            state.newPass = null;
            state.email = null;
        });
        builder.addCase(changePassword.rejected, (state, { payload }) => {
            if (payload) {
                state.newPass = payload;
            }
        });
    },
});

export const { setLoading, toggleLoading, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
