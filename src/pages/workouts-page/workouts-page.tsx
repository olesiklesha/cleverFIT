import React, { useEffect } from 'react';
import { Header } from '@components/header';
import {
    WorkoutsListError,
    WorkoutsSaveError,
    WorkoutsSaveSuccess,
    WorkoutsSidePanel,
} from '@components/workouts-modals';
import { WorkoutsTabs } from '@components/workouts-tabs';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setDefaultJointTrainingsBlockState } from '@redux/workouts-slice/workouts-slice.ts';
import { getWorkoutsList } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Content } from 'antd/es/layout/layout';

import './workouts-page.css';

export const WorkoutsPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWorkoutsList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setDefaultJointTrainingsBlockState());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Header />
            <Content className='page-content workouts-content'>
                <WorkoutsTabs />
                <WorkoutsSaveSuccess />
            </Content>
            <WorkoutsListError />
            <WorkoutsSidePanel />
            <WorkoutsSaveError />
        </React.Fragment>
    );
};
