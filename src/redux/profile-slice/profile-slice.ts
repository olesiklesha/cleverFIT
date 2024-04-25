import { getUserInfo, putUserInfo } from '@redux/profile-slice/profile-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, Undefinable } from '../../models';
import { ProfileModals, ProfileModalsState, UserResponse } from '../../models/user-models.ts';

type SliceState = {
    userInfo: Nullable<UserResponse>;
    imageSrc: Undefinable<string>;
    modalsState: ProfileModalsState;
};

const initialState: SliceState = {
    userInfo: null,
    imageSrc: undefined,
    modalsState: {
        [ProfileModals.SAVE_ERROR]: false,
        [ProfileModals.SIZE_ERROR]: false,
        [ProfileModals.SUCCESS]: false,
    },
};

type SetProfileModal = {
    modal: keyof ProfileModalsState;
    isOpen: boolean;
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setModalIsOpen(state, { payload }: PayloadAction<SetProfileModal>) {
            state.modalsState[payload.modal] = payload.isOpen;
        },
        setImageSrc(state, { payload }: PayloadAction<string>) {
            state.imageSrc = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
            state.userInfo = payload;
        });
        builder.addCase(putUserInfo.fulfilled, (state, { payload }) => {
            state.userInfo = payload;
            state.imageSrc = payload.imgSrc;
        });
        builder.addCase(putUserInfo.rejected, (state) => {
            state.modalsState[ProfileModals.SAVE_ERROR] = true;
            state.imageSrc = undefined;
        });
    },
});

export const { setImageSrc, setModalIsOpen } = profileSlice.actions;
export default profileSlice.reducer;
