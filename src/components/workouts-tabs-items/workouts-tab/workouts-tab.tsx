import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { WorkoutsTable } from '@components/workouts-table';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setWorkoutsModalIsOpen } from '@redux/workouts-slice/workouts-slice.ts';
import { Button } from 'antd';

import { WorkoutsModals } from '../../../models';

export const WorkoutsTab = () => {
    const dispatch = useAppDispatch();

    const handleBtnClick = () =>
        dispatch(
            setWorkoutsModalIsOpen({
                modal: WorkoutsModals.SIDE_PANEL,
                isOpen: true,
            }),
        );

    return (
        <React.Fragment>
            <WorkoutsTable />
            <Button
                size='large'
                type='primary'
                icon={<PlusOutlined />}
                onClick={handleBtnClick}
                data-test-id='create-new-training-button'
            >
                Новая тренировка
            </Button>
        </React.Fragment>
    );
};
