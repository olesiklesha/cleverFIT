import { AveragesItemCard } from '@components/achievements/achievements-items/averages-item-card/averages-item-card.tsx';
import { getTrainingsAverages } from '@components/achievements/helpers';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';

const trainingAverages: Record<string, string> = {
    totalLoad: 'Общая нагрузка, кг',
    loadPerDay: 'Нагрузка в день, кг',
    approaches: 'Количество повторений, раз',
    replays: 'Подходы, раз',
};

export const AveragesBlock = () => {
    const { period, filteredTrainings } = useAppSelector(achievementsSelector);
    const averages = getTrainingsAverages(filteredTrainings, period);

    return (
        <div className='averages-card-container'>
            {Object.entries(averages).map((el) => {
                const [key, value] = el;

                return (
                    <AveragesItemCard subTitle={trainingAverages[key]} title={value} key={key} />
                );
            })}
        </div>
    );
};
