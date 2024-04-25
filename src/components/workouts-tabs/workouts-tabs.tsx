import { ReactNode, useEffect } from 'react';
import { JointWorkouts, MarathonPlug, Workouts } from '@components/workouts-tabs-items';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { setDefaultJointTrainingsBlockState } from '@redux/workouts-slice/workouts-slice.ts';
import { getTrainingPalsAndInvites } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Badge, Tabs } from 'antd';

import './workouts-tabs.css';

type ItemProps = {
    label: string;
    key: string;
    children: ReactNode;
};

const items: ItemProps[] = [
    {
        key: '0',
        label: 'Мои тренировки',
        children: <div data-attr='plug' />,
    },
    {
        key: '1',
        label: 'Совместные тренировки',
        children: <JointWorkouts />,
    },
    {
        key: '2',
        label: 'Марафоны',
        children: <MarathonPlug />,
    },
];

export const WorkoutsTabs = () => {
    const dispatch = useAppDispatch();
    const { invites, trainings } = useAppSelector(workoutsSelector);

    const handleChange = (activeKey: string) => {
        const wrapper = document.querySelector('.workouts-content') as HTMLElement;

        if (+activeKey === items.length - 1) {
            wrapper.classList.add('workouts-content_with-bg');
        } else {
            wrapper.classList.remove('workouts-content_with-bg');
        }

        if (activeKey === items[1].key) {
            dispatch(getTrainingPalsAndInvites());
        } else {
            dispatch(setDefaultJointTrainingsBlockState());
        }

        if (activeKey === items[0].key) {
            wrapper.classList.add('workouts-content_mb');
        } else {
            wrapper.classList.remove('workouts-content_mb');
        }
    };

    useEffect(() => {
        const wrapper = document.querySelector('.workouts-content') as HTMLElement;

        wrapper.classList.add('workouts-content_mb');
    }, []);

    return (
        <Tabs
            defaultActiveKey='0'
            className='workout-tabs'
            items={items.map((item) => ({
                key: item.key,
                label:
                    item.key === '1' && invites.length ? (
                        <span>
                            {item.label} <Badge count={invites.length} size='small' />
                        </span>
                    ) : (
                        item.label
                    ),
                children: item.key === '0' ? <Workouts trainings={trainings} /> : item.children,
            }))}
            onChange={handleChange}
        />
    );
};
