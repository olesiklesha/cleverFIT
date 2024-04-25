import {
    JointTrainingActivePartners,
    JointTrainingInfo,
    JointTrainingMessages,
    JointTrainingPartnersList,
} from '@components/joint-training-items';
import { JointTrainingSidePanel } from '@components/workouts-modals';

import './joint-workouts.css';

export const JointWorkouts = () => (
    <div className='joint-workouts-container'>
        <JointTrainingMessages />
        <JointTrainingInfo />
        <JointTrainingActivePartners />
        <JointTrainingPartnersList />
        <JointTrainingSidePanel />
    </div>
);
