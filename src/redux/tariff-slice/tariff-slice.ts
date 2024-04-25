import { getTariffList, postTariff } from '@redux/tariff-slice/tariff-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Tariff } from '../../models/tariff-models.ts';

type InitState = {
    tariffList: Tariff[];
    isDrawerOpen: boolean;
    isModalOpen: boolean;
};

const initialState: InitState = {
    tariffList: [],
    isDrawerOpen: false,
    isModalOpen: false,
};

const tariffSlice = createSlice({
    name: 'tariff',
    initialState,
    reducers: {
        setIsDrawerOpen(state, { payload }: PayloadAction<boolean>) {
            state.isDrawerOpen = payload;
        },
        setIsSettingsModalOpen(state, { payload }: PayloadAction<boolean>) {
            state.isModalOpen = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTariffList.fulfilled, (state, { payload }) => {
            state.tariffList = payload;
        });
        builder.addCase(postTariff.fulfilled, (state) => {
            state.isModalOpen = true;
            state.isDrawerOpen = false;
        });
        builder.addCase(postTariff.rejected, (state) => {
            state.isDrawerOpen = false;
        });
    },
});

export const { setIsDrawerOpen, setIsSettingsModalOpen } = tariffSlice.actions;
export default tariffSlice.reducer;
