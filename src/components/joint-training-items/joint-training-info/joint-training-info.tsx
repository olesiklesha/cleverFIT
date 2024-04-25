import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { getPartners } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';

import { JoinTrainingsBlocks } from '../../../models';

import './joint-training-info.css';

export const JointTrainingInfo = () => {
    const { jointTrainingBlocks } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();

    const handleBtnRandomChoice = () => dispatch(getPartners(false));

    const handleBtnFavoriteTraining = () => dispatch(getPartners(true));

    return (
        jointTrainingBlocks[JoinTrainingsBlocks.INFO] && (
            <div className='joint-training-info-container'>
                <div className='joint-training-info-container__text'>
                    <Title level={3}>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп? Можешь найти
                        друга для совместных тренировок среди других пользователей.
                    </Title>
                    <p>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </p>
                </div>
                <div className='joint-training-info-container__btns'>
                    <Button
                        size='large'
                        type='text'
                        style={{ color: Colors.PRIMARY }}
                        onClick={handleBtnRandomChoice}
                    >
                        Случайный выбор
                    </Button>
                    <Button size='large' type='text' onClick={handleBtnFavoriteTraining}>
                        Выбор друга по моим тренировкам
                    </Button>
                </div>
            </div>
        )
    );
};
