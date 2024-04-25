/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode, useEffect, useState } from 'react';
import { CalendarSidePanel, EditCalendarSidePanel } from '@components/calendar-side-panels';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { Header } from '@components/header';
import {
    CreateExerciseModal,
    SaveTrainingErrorModal,
    TrainingListErrorModal,
    TrainingModal,
} from '@components/training-modals';
import { Colors, DateFormats } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import {
    setDefaultTrainingsModals,
    setEditTrainingModal,
    setModalIsOpen,
    setModalProps,
} from '@redux/training-slice/training-slice.ts';
import { getTrainingList } from '@redux/training-slice/training-slice-thunk.ts';
import { getTrainingsForCurrentDate, isTopLeftPos } from '@utils/helpers.ts';
import { Badge, Calendar, ConfigProvider } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Content } from 'antd/es/layout/layout';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import type { Moment } from 'moment';
import moment from 'moment';

import { TrainingModals } from '../../models';

import './calendar-page.css';

import 'moment/locale/ru.js';

moment.locale('ru', {
    week: {
        dow: 1,
    },
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

type DateCellRender = (date: Moment) => ReactNode;

export const CalendarPage = () => {
    const { trainingNames, trainings } = useAppSelector(trainingSelector);
    const [modalParent, setModalParent] = useState(document.body);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();

    const handleClick = (e: React.MouseEvent<HTMLElement>, date: Moment) => {
        const isCurMonth = date.month() === new Date().getMonth();

        if (!isDesktop && !isCurMonth) {
            dispatch(
                setModalIsOpen({
                    modal: TrainingModals.CREATE_TRAINING,
                    isOpen: false,
                }),
            );

            return;
        }

        e.stopPropagation();

        const currentCell = e.currentTarget.closest('.ant-picker-cell') as HTMLElement;

        currentCell.classList.add('filled-cell');

        const parent = isDesktop
            ? currentCell
            : (document.querySelector('.ant-picker-body') as HTMLElement);

        setModalParent(parent);
        let offset = 0;

        if (!isDesktop) {
            const parentBottom = (
                document.querySelector('.ant-picker-body') as HTMLElement
            ).getBoundingClientRect().bottom;
            const childBottom = e.currentTarget.getBoundingClientRect().bottom;

            offset = parentBottom - childBottom - 10;
        }

        const isTopLeft = isTopLeftPos(e.clientX, e.clientY, window.innerWidth, window.innerHeight);

        dispatch(setEditTrainingModal(false));
        dispatch(
            setModalProps({
                date: date.toISOString(),
                isTopLeft,
                offset,
            }),
        );
    };

    const dateCellRender: DateCellRender = (date) => {
        const title = date.format(DateFormats.TD_TITLE);
        const filteredTrainings = getTrainingsForCurrentDate(date, trainings);

        const curCell = document.querySelector(`[title='${title}']`);

        if (filteredTrainings.length > 0) {
            curCell?.classList.add('filled-cell');
        } else {
            curCell?.classList.remove('filled-cell');
        }

        return (
            <button
                type='button'
                className={
                    filteredTrainings.length > 0 ? 'cell-body cell-body_filled' : 'cell-body'
                }
                onClick={(e) => handleClick(e, date)}
            >
                <div className='badges-container'>
                    {filteredTrainings.length > 0 &&
                        filteredTrainings.map((training) => (
                            <Badge
                                color={getTrainingColor(trainingNames, training.name)}
                                text={training.name}
                                key={training._id}
                                style={{
                                    color: training.isImplementation
                                        ? Colors.LIGHT_GRAY
                                        : '#000000',
                                }}
                            />
                        ))}
                </div>
            </button>
        );
    };

    useEffect(() => {
        dispatch(getTrainingList());

        return () => {
            dispatch(setDefaultTrainingsModals());
        };
    }, [dispatch]);

    return (
        <React.Fragment>
            <Header />
            <Content className='calendar-content'>
                <ConfigProvider locale={ru_RU}>
                    {trainingNames.length ? (
                        <Calendar fullscreen={isDesktop} dateCellRender={dateCellRender} />
                    ) : (
                        <Calendar fullscreen={isDesktop} />
                    )}
                </ConfigProvider>
            </Content>
            <TrainingListErrorModal />
            <TrainingModal parent={modalParent} />
            <CreateExerciseModal parent={modalParent} />
            <CalendarSidePanel />
            <EditCalendarSidePanel />
            <SaveTrainingErrorModal />
        </React.Fragment>
    );
};
