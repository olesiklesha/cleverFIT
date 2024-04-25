import { ReactNode } from 'react';
import { Achievements } from '@components/achievements';
import { AchievementsPeriod } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { setPeriod } from '@redux/achievements-slice/achievements-slice.ts';
import { Tabs } from 'antd';

type ItemProps = {
    label: string;
    key: string;
    children: ReactNode;
    disabled?: boolean;
};

const items: ItemProps[] = [
    {
        key: '0',
        label: 'За неделю',
        children: <Achievements />,
    },
    {
        key: '1',
        label: 'За месяц',
        children: <Achievements />,
    },
    {
        key: '2',
        label: 'За всё время (PRO)',
        children: <div data-attr='plug' />,
        disabled: true,
    },
];

export const AchievementsTabs = () => {
    const dispatch = useAppDispatch();
    const handleChange = (activeKey: string) => {
        dispatch(
            setPeriod(activeKey === '0' ? AchievementsPeriod.WEEK : AchievementsPeriod.MONTHS),
        );
    };

    return (
        <Tabs
            defaultActiveKey='0'
            className='workout-tabs'
            items={items.map((item) => ({
                key: item.key,
                label: item.label,
                children: item.children,
                disabled: item.disabled,
            }))}
            onChange={handleChange}
            destroyInactiveTabPane={true}
        />
    );
};
