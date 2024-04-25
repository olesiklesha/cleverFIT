import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { getCurTraining } from '@components/training-modals/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import { setCurTraining, setEditTrainingModal } from '@redux/training-slice/training-slice.ts';
import { Badge, Button } from 'antd';

import { TrainingProps } from '../../../models';

import './modal-training-list.css';

type Props = {
    currTrainings: TrainingProps[];
};
export const ModalTrainingList: React.FC<Props> = ({ currTrainings }) => {
    const { trainingNames, trainings } = useAppSelector(trainingSelector);
    const { date } = useAppSelector(trainingSelector).relativeModalProps;
    const dispatch = useAppDispatch();

    const handleEditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.dataset.trainingName) return;

        const { trainingName } = e.currentTarget.dataset;
        const curTraining = getCurTraining(trainingName, date, trainings);

        dispatch(setCurTraining(curTraining));
        dispatch(setEditTrainingModal(true));
    };

    return (
        <div className='trainings-container'>
            {currTrainings.map((training, index) => (
                <div className='trainings-container__item' key={training._id}>
                    <Badge
                        color={getTrainingColor(trainingNames, training.name)}
                        text={training.name}
                        style={{
                            color: training.isImplementation ? Colors.LIGHT_GRAY : '#000000',
                        }}
                    />
                    <Button
                        icon={
                            <EditOutlined
                                style={{
                                    color: training.isImplementation
                                        ? Colors.LIGHT_GRAY
                                        : Colors.PRIMARY,
                                }}
                            />
                        }
                        style={{ border: 'none', background: 'transparent' }}
                        size='small'
                        data-test-id={`modal-update-training-edit-button${index}`}
                        data-training-name={training.name}
                        onClick={handleEditBtn}
                        disabled={training.isImplementation}
                    />
                </div>
            ))}
        </div>
    );
};
