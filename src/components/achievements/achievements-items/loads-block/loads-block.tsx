import { Column } from '@ant-design/charts';
import { ListByDay } from '@components/achievements/achievements-items';
import {
    getAverageDayLoadsByPeriod,
    getLoadByDay,
    LoadByDate,
} from '@components/achievements/helpers';
import { AchievementsPeriod } from '@constants/index.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import './loads-block.css';

export const LoadsBlock = () => {
    const { period, filteredTrainings } = useAppSelector(achievementsSelector);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const config = {
        data: getAverageDayLoadsByPeriod(period, filteredTrainings),
        xField: 'type',
        yField: 'value',
        height: isDesktop ? 374 : 236,
        marginLeft: isDesktop ? 24 : 16,
        appendPadding: 10,
        style: {
            fill: '#85A5FF',
            maxWidth: isDesktop ? 30 : 20,
        },
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleFontSize: isDesktop ? 14 : 8,
                titleFontFamily: 'Inter, sans-serif',
                labelFormatter: (type: string) => `${type.slice(0, 5)}`,
                tick: false,
                labelSpacing: 16,
                labelFontSize: isDesktop ? 12 : 7,
            },
            y: {
                labelFormatter: (value: LoadByDate) => `${value} кг`,
                tick: false,
                labelFontSize: isDesktop ? 12 : 7,
            },
        },
        tooltip: (d: LoadByDate) => ({
            name: 'Нагрузка',
            value: d.value,
        }),
        scrollbar: period === AchievementsPeriod.MONTHS && {
            x: {
                ratio: 0.5,
            },
        },
    };

    return (
        <div className='exercises-block-container'>
            <Column
                {...config}
                className={`loads-chart ${
                    period === AchievementsPeriod.WEEK ? 'loads-chart_narrow' : ''
                }`}
            />
            {period === AchievementsPeriod.WEEK && (
                <ListByDay isExercises={false} data={getLoadByDay(filteredTrainings)} />
            )}
        </div>
    );
};
