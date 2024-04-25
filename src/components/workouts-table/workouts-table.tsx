import React, { useState } from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { getTrainingColor } from '@components/calendar-side-panels/helpers';
import { WorkoutsExerciseModal } from '@components/workouts-modals';
import { compare, getFormattedTableData, getPeriodStr } from '@components/workouts-table/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import {
    openEditSidePanel,
    setWorkoutsExerciseModal,
    setWorkoutsModalIsOpen,
} from '@redux/workouts-slice/workouts-slice.ts';
import { isTopLeftPos } from '@utils/helpers.ts';
import { Badge, Button, Table } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { ColumnsType } from 'antd/es/table';

import { TrainingProps, WorkoutsFormData, WorkoutsModals } from '../../models';

import './workouts-table.css';

enum BtnClass {
    EDIT = 'edit',
    EXERCISE = 'exercise',
}

export const WorkoutsTable = () => {
    const { trainings, trainingList } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();
    const [modalParent, setModalParent] = useState(document.body);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const columns: ColumnsType<WorkoutsFormData> = [
        {
            title: 'Тип тренировки',
            width: 240,
            children: [
                {
                    title: '',
                    dataIndex: '',
                    key: 'id'.concat('name'),
                    render: (el) => (
                        <Badge color={getTrainingColor(trainingList, el.name)} text='' />
                    ),
                },
                {
                    title: '',
                    dataIndex: 'name',
                    key: 'id',
                    render: (name) => (
                        <div className='training-name-container'>
                            {name}
                            <Button
                                type='text'
                                style={{ padding: 0, width: 10 }}
                                icon={<DownOutlined style={{ fontSize: 14 }} />}
                                className={BtnClass.EXERCISE}
                            />
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Периодичность',
            dataIndex: 'period',
            key: 'id',
            width: 240,
            render: (period) => getPeriodStr(period),
            sorter: (a, b) => compare(a, b),
        },
        {
            title: '',
            dataIndex: 'isImplementation',
            key: 'id',
            render: (isImplementation, _, index) => (
                <Button
                    type='text'
                    disabled={isImplementation}
                    className={BtnClass.EDIT}
                    data-test-id={`update-my-training-table-icon${index}`}
                    icon={
                        <EditOutlined
                            style={{
                                color: isImplementation ? Colors.LIGHT_GRAY : Colors.PRIMARY,
                                fontSize: 30,
                            }}
                        />
                    }
                />
            ),
        },
    ];

    const handleClick = (e: React.MouseEvent<HTMLElement>, record: WorkoutsFormData) => {
        const target = e.target as HTMLElement;

        if (!target.closest('.ant-btn'))
            return dispatch(
                setWorkoutsModalIsOpen({
                    modal: WorkoutsModals.EXERCISE_MODAL,
                    isOpen: false,
                }),
            );

        const training = trainings.find((el) => el._id === record.id) as TrainingProps;

        if (target.closest(`.${BtnClass.EDIT}`)) {
            dispatch(
                setWorkoutsModalIsOpen({
                    modal: WorkoutsModals.EXERCISE_MODAL,
                    isOpen: false,
                }),
            );

            return dispatch(openEditSidePanel(training));
        }

        if (target.closest(`.${BtnClass.EXERCISE}`)) {
            const currentCell = target.closest('.ant-table-cell') as HTMLElement;

            const parent = isDesktop
                ? currentCell
                : (document.querySelector('.ant-table-tbody') as HTMLElement);

            setModalParent(parent);
            let offset = 0;

            if (!isDesktop) {
                const parentBottom = (
                    document.querySelector('.ant-table-tbody') as HTMLElement
                ).getBoundingClientRect().bottom;
                const childBottom = e.currentTarget.getBoundingClientRect().bottom;

                offset = parentBottom - childBottom - 10;
            }

            const isTopLeft = isTopLeftPos(
                e.clientX,
                e.clientY,
                window.innerWidth,
                window.innerHeight,
            );

            return dispatch(
                setWorkoutsExerciseModal({
                    training,
                    isTopLeft,
                    offset,
                }),
            );
        }

        return undefined;
    };

    return (
        <React.Fragment>
            <Table
                className='workouts-table'
                columns={columns}
                size='small'
                dataSource={getFormattedTableData(trainings)}
                style={{ width: 579 }}
                pagination={{ position: ['bottomLeft'], pageSize: isDesktop ? 10 : 8 }}
                onRow={(record) => ({
                    onClick: (e) => handleClick(e, record),
                })}
                data-test-id='my-trainings-table'
            />
            <WorkoutsExerciseModal parent={modalParent} />
        </React.Fragment>
    );
};
