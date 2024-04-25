import { LoadsByDate } from '@components/achievements/achievements-items';
import { getLoadsByWeek } from '@components/achievements/helpers';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';

import './loads-by-week.css';

export const LoadsByWeek = () => {
    const { filteredTrainings, period } = useAppSelector(achievementsSelector);

    const data = getLoadsByWeek(period, filteredTrainings);

    return (
        <div className='week-loads-container'>
            {data.map((weekData) => (
                <LoadsByDate data={weekData} key={weekData[0].type} />
            ))}
        </div>
    );
};
