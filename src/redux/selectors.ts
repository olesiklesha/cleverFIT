import { RootState } from '@redux/configure-store.ts';

export const authSelector = (state: RootState) => state.auth;
export const feedbackSelector = (state: RootState) => state.feedback;
export const routerSelector = (state: RootState) => state.router;
export const trainingSelector = (state: RootState) => state.training;
export const profileSelector = (state: RootState) => state.profile;
export const tariffSelector = (state: RootState) => state.tariff;
export const workoutsSelector = (state: RootState) => state.workouts;
export const achievementsSelector = (state: RootState) => state.achievements;
