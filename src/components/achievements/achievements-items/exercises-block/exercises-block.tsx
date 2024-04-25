import { Pie } from '@ant-design/charts';
import { ListByDay } from '@components/achievements/achievements-items';
import {
    ExercisesChart,
    getFavoriteExerciseByDay,
    getFavoriteExercisesData,
} from '@components/achievements/helpers';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import './exercises-block.css';

export const ExercisesBlock = () => {
    const { filteredTrainings } = useAppSelector(achievementsSelector);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const config = {
        data: getFavoriteExercisesData(filteredTrainings),
        angleField: 'value',
        colorField: 'exercise',
        radius: isDesktop ? 0.325 : 0.47,
        innerRadius: isDesktop ? 0.23 : 0.32,
        margin: 0,
        padding: 0,
        autoFit: true,
        legend: false,
        label: {
            text: (item: ExercisesChart) => `${item.exercise}`,
            position: 'outside',
            connector: false,
            lineHeight: 1,
            fontSize: isDesktop ? 14 : 12,
            textBaseline: 'hanging',
            fontFamily: 'Inter, sans-serif',
            fill: '#000',
            fillOpacity: 1,
        },
        tooltip: (d: ExercisesChart) => ({
            name: d.exercise,
            value: d.value,
        }),
    };

    return (
        <div className='exercises-block-container'>
            <div className='loads-chart_narrow exercises-chart'>
                <Pie {...config} />
            </div>
            <ListByDay isExercises={true} data={getFavoriteExerciseByDay(filteredTrainings)} />
        </div>
    );
};
