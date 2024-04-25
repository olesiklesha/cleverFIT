import { ErrorStatuses } from '@constants/index.ts';
import { getFeedback, postFeedback } from '@redux/feedback-slice/feedback-slice-thunk.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FeedbackObj, NewFeedbackObj, Nullable } from '../../models';

type FeedbackState = {
    feedbacks: FeedbackObj[];
    newFeedback: Nullable<NewFeedbackObj>;
    isFetchErrorModalOpened: boolean;
    resultModal: boolean;
    creatorModal: boolean;
    isSuccess: boolean;
};

const initialState: FeedbackState = {
    feedbacks: [],
    newFeedback: null,
    isFetchErrorModalOpened: false,
    creatorModal: false,
    resultModal: false,
    isSuccess: false,
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setFetchErrorModalOpened: (state, action: PayloadAction<boolean>) => {
            state.isFetchErrorModalOpened = action.payload;
        },
        toggleCreatorModal: (state) => {
            state.creatorModal = !state.creatorModal;
        },
        toggleResultModal: (state) => {
            state.resultModal = !state.resultModal;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedback.fulfilled, (state, { payload }) => {
            state.feedbacks = [...payload];
            state.isFetchErrorModalOpened = false;
        });
        builder.addCase(getFeedback.rejected, (state, { payload }) => {
            if (payload && payload !== ErrorStatuses.FORBIDDEN) {
                state.isFetchErrorModalOpened = true;
            }
        });
        builder.addCase(postFeedback.fulfilled, (state) => {
            state.resultModal = true;
            state.isSuccess = true;
            state.newFeedback = null;
        });
        builder.addCase(postFeedback.rejected, (state, { payload }) => {
            state.resultModal = true;
            state.isSuccess = false;
            state.newFeedback = payload || null;
        });
    },
});

export const { setFetchErrorModalOpened, toggleResultModal, toggleCreatorModal } =
    feedbackSlice.actions;
export default feedbackSlice.reducer;
