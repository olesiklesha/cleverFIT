import { ActivePartnerCard } from '@components/partner-cards';
import { WorkoutPartnerInfoModal } from '@components/workouts-modals';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import Title from 'antd/es/typography/Title';

import { JoinTrainingsBlocks } from '../../../models';

import './joint-training-active-partners.css';

export const JointTrainingActivePartners = () => {
    const { jointTrainingBlocks, trainingPals } = useAppSelector(workoutsSelector);

    return (
        jointTrainingBlocks[JoinTrainingsBlocks.MY_PARTNERS] && (
            <div className='partners-container'>
                <Title level={3}>Мои партнёры по тренировкам</Title>
                <div className='active-partners-container'>
                    {trainingPals.length ? (
                        trainingPals.map((partner, index) => (
                            <ActivePartnerCard partner={partner} index={index} key={partner.id} />
                        ))
                    ) : (
                        <span>У вас пока нет партнёров для совместных тренировок</span>
                    )}
                </div>
                <WorkoutPartnerInfoModal />
            </div>
        )
    );
};
