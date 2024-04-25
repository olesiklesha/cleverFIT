import React from 'react';
import { WorkoutsTab } from '@components/workouts-tabs-items';
import { EmptyWorkouts } from '@components/workouts-tabs-items/empty-workouts';

import { TrainingProps } from '../../../models';

import './workouts.css';

export const Workouts: React.FC<{ trainings: TrainingProps[] }> = ({ trainings }) =>
    trainings.length ? <WorkoutsTab /> : <EmptyWorkouts />;
