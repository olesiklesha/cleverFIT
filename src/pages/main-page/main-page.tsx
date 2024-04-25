import React from 'react';
import { Navigate } from 'react-router-dom';
import { BtnCard } from '@components/btn-card';
import { CustomFooter } from '@components/custom-footer';
import { Header } from '@components/header';
import { TrainingErrorModal } from '@components/training-modals';
import { WorkoutsFetchError } from '@components/workouts-modals';
import { BtnCardType, Paths } from '@constants/index.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Card, Col, Layout, Row, Space } from 'antd';

import './main-page.css';

const { Content } = Layout;

const featureTexts = [
    'С CleverFit ты сможешь:',
    '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;',
    '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
    '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
    '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
];

export const MainPage: React.FC = () => {
    const { token } = useAppSelector((state) => state.auth);

    if (!token) return <Navigate to={Paths.AUTH} />;

    return (
        <React.Fragment>
            <Header />
            <Content className='content'>
                <Space direction='vertical' style={{ rowGap: '24px' }}>
                    <Card style={{ maxWidth: 752 }} className='features-text-card'>
                        {featureTexts.map((el) => (
                            <p key={el.length}>{el}</p>
                        ))}
                    </Card>
                    <Card style={{ maxWidth: 752 }} className='promo-text-card'>
                        <p>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </p>
                    </Card>
                    <Row gutter={[16, 8]} style={{ marginTop: -8 }}>
                        <Col md={8} sm={24} xs={24}>
                            <BtnCard type={BtnCardType.Training} />
                        </Col>
                        <Col md={8} sm={24} xs={24}>
                            <BtnCard type={BtnCardType.Calendar} />
                        </Col>
                        <Col md={8} sm={24} xs={24}>
                            <BtnCard type={BtnCardType.Profile} />
                        </Col>
                    </Row>
                </Space>
            </Content>
            <CustomFooter />
            <TrainingErrorModal />
            <WorkoutsFetchError />
        </React.Fragment>
    );
};
