import { createReduxHistoryContext } from 'redux-first-history';
import achievementsSlice from '@redux/achievements-slice/achievements-slice.ts';
import authSlice from '@redux/auth-slice/auth-slice.ts';
import feedbackSlice from '@redux/feedback-slice/feedback-slice.ts';
import profileSlice from '@redux/profile-slice/profile-slice.ts';
import tariffSlice from '@redux/tariff-slice/tariff-slice.ts';
import trainingSlice from '@redux/training-slice/training-slice.ts';
import workoutsSlice from '@redux/workouts-slice/workouts-slice.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

const rootReducer = combineReducers({
    auth: authSlice,
    feedback: feedbackSlice,
    router: routerReducer,
    training: trainingSlice,
    profile: profileSlice,
    tariff: tariffSlice,
    workouts: workoutsSlice,
    achievements: achievementsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
