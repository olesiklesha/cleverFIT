import { Endpoints, Paths } from '@constants/index.ts';
import { toggleLoading } from '@redux/auth-slice/auth-slice.ts';
import { AppDispatch, history, RootState } from '@redux/configure-store.ts';
import { setDefaultPropsAfterFetch } from '@redux/training-slice/training-slice.ts';
import {
    openPartnersList,
    setDefaultModalsState,
    setIsFavorite,
    setWorkoutsModalIsOpen,
} from '@redux/workouts-slice/workouts-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoriteTrainingType, getSortedPartners } from '@utils/helpers.ts';
import axios from 'axios';

import {
    InviteProps,
    InviteStatuses,
    Nullable,
    PartnerProps,
    PostTrainingBodyWithParameters,
    StatusType,
    TrainingInfo,
    TrainingProps,
    WorkoutsModals,
} from '../../models';
import { api } from '../../services';

export const getWorkouts = createAsyncThunk<
    TrainingProps[],
    void,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/getWorkouts', async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());

    try {
        const state = getState();
        const response = await api.get(Endpoints.TRAINING, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        history.push(Paths.WORKOUTS);
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(toggleLoading());
            history.push(Paths.MAIN);

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const getWorkoutsList = createAsyncThunk<
    TrainingInfo[],
    void,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/getWorkoutsList', async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const response = await api.get(Endpoints.TRAINING_LIST, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(toggleLoading());

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

export const postWorkout = createAsyncThunk<
    TrainingProps[],
    PostTrainingBodyWithParameters,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/postWorkout', async (body, { getState, rejectWithValue, dispatch }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();

        await api.post(Endpoints.TRAINING, body, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        const response = await api.get(Endpoints.TRAINING, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(toggleLoading());

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

export const putWorkout = createAsyncThunk<
    TrainingProps[],
    TrainingProps,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/putWorkout', async (body, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const path = `${Endpoints.TRAINING}/${body._id}`;

        await api.put(path, body, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        const response = await api.get(Endpoints.TRAINING, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`,
            },
        });

        dispatch(setDefaultPropsAfterFetch());
        dispatch(setDefaultModalsState());
        dispatch(toggleLoading());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(setDefaultPropsAfterFetch());
            dispatch(setDefaultModalsState());
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const getPartners = createAsyncThunk<
    PartnerProps[] | undefined,
    boolean,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/getPartners', async (isFavoriteTrainings, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const { token } = state.auth;
        const { trainingList, trainings } = state.workouts;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        dispatch(setIsFavorite(isFavoriteTrainings));
        let urlWithParams = '';

        if (isFavoriteTrainings) {
            urlWithParams = `${Endpoints.PARTNERS_LIST}?trainingType=${getFavoriteTrainingType(
                trainings,
                trainingList,
            )}`;
        }

        const response = await api.get(
            isFavoriteTrainings ? urlWithParams : Endpoints.PARTNERS_LIST,
            config,
        );

        const res = getSortedPartners(response.data);

        dispatch(openPartnersList());
        dispatch(toggleLoading());

        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export type PostInviteProps = {
    partner: PartnerProps;
    training: PostTrainingBodyWithParameters;
};

export const postInvite = createAsyncThunk<
    PartnerProps[] | undefined,
    PostInviteProps,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/postInvite', async (params, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const { partner, training } = params;
        const state = getState() as RootState;
        const { partners } = state.workouts;
        const { token } = state.auth;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const trainingResponse = await api.post<TrainingProps>(
            Endpoints.TRAINING,
            training,
            config,
        );

        const { _id: id } = trainingResponse.data;

        await api.post(
            Endpoints.INVITE,
            {
                to: partner.id,
                trainingId: id,
            },
            config,
        );

        const res = partners.map((el) =>
            el.id === partner.id
                ? {
                      ...el,
                      status: InviteStatuses.PENDING,
                  }
                : el,
        );

        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.JOINT_TRAINING_SIDE_PANEL,
                isOpen: false,
            }),
        );
        dispatch(toggleLoading());

        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(
                setWorkoutsModalIsOpen({
                    modal: WorkoutsModals.JOINT_TRAINING_SIDE_PANEL,
                    isOpen: false,
                }),
            );
            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const getInvites = createAsyncThunk<
    InviteProps[] | undefined,
    void,
    {
        rejectValue: number;
        state: RootState;
    }
>('workouts/getInvites', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const { token } = state.auth;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.get<InviteProps[]>(Endpoints.INVITE, config);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            return rejectWithValue(status);
        }
    }

    return undefined;
});

type TrainingPalsAndInvites = {
    trainingPals: PartnerProps[];
    invites: InviteProps[];
};

export const getTrainingPalsAndInvites = createAsyncThunk<
    TrainingPalsAndInvites | undefined,
    void,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/getTrainingPalsAndInvites', async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const { token } = state.auth;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const partnersResp = await api.get<PartnerProps[]>(Endpoints.TRAINING_PARTNERS, config);
        const invitesResp = await api.get<InviteProps[]>(Endpoints.INVITE, config);

        dispatch(toggleLoading());

        return {
            invites: invitesResp.data,
            trainingPals: partnersResp.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

type ResponseToInvite = {
    id: string;
    status: StatusType;
};
export const responseToInvite = createAsyncThunk<
    TrainingPalsAndInvites | undefined,
    ResponseToInvite,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/responseToInvite', async (body, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    try {
        const state = getState();
        const { token } = state.auth;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await api.put(Endpoints.INVITE, body, config);

        const partnersResp = await api.get<PartnerProps[]>(Endpoints.TRAINING_PARTNERS, config);
        const invitesResp = await api.get<InviteProps[]>(Endpoints.INVITE, config);

        dispatch(toggleLoading());

        return {
            invites: invitesResp.data,
            trainingPals: partnersResp.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});

export const deleteJointTraining = createAsyncThunk<
    PartnerProps[] | undefined,
    Nullable<string>,
    {
        dispatch: AppDispatch;
        rejectValue: number;
        state: RootState;
    }
>('workouts/deleteJointTraining', async (id, { dispatch, getState, rejectWithValue }) => {
    dispatch(toggleLoading());
    dispatch(
        setWorkoutsModalIsOpen({
            modal: WorkoutsModals.PARTNER_INFO,
            isOpen: false,
        }),
    );
    try {
        const state = getState() as RootState;
        const { token } = state.auth;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const url = `${Endpoints.INVITE}/${id}`;

        await api.delete(url, config);
        const response = await api.get<PartnerProps[]>(Endpoints.TRAINING_PARTNERS, config);

        //! this line only for test
        const res = response.data.filter((el) => el.inviteId !== id);

        dispatch(toggleLoading());

        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            dispatch(toggleLoading());

            return rejectWithValue(status);
        }
    }

    return undefined;
});
