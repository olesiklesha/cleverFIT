import { useState } from 'react';
import { WorkoutsInviteMessageCard } from '@components/workouts-invite-message-card';
import { WorkoutInfoModal } from '@components/workouts-modals';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import Title from 'antd/es/typography/Title';

import { JoinTrainingsBlocks } from '../../../models';

import './joint-training-messages.css';

export const JointTrainingMessages = () => {
    const { jointTrainingBlocks, invites } = useAppSelector(workoutsSelector);
    const [modalParent, setModalParent] = useState(document.body);

    return (
        jointTrainingBlocks[JoinTrainingsBlocks.MESSAGES] && (
            <div className='invites-block'>
                <Title level={3}>
                    {invites.length > 1 ? 'Новые сообщения' : 'Новое сообщение'} ({invites.length})
                </Title>
                <div className='invites-container'>
                    {invites.map((invite) => (
                        <WorkoutsInviteMessageCard
                            invite={invite}
                            setParent={setModalParent}
                            key={invite._id}
                        />
                    ))}
                </div>
                <WorkoutInfoModal parent={modalParent} />
            </div>
        )
    );
};
