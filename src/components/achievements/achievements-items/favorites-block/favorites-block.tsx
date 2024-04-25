import { FavoritesBlockItem } from '@components/achievements/achievements-items';
import { getFavoriteExercises, getFavoriteTrainingName } from '@components/achievements/helpers';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { achievementsSelector } from '@redux/selectors.ts';

export const FavoritesBlock = () => {
    const { filteredTrainings, filter } = useAppSelector(achievementsSelector);

    return (
        <div>
            {!filter && (
                <FavoritesBlockItem
                    title='Самая частая тренировка'
                    value={getFavoriteTrainingName(filteredTrainings)}
                />
            )}
            <FavoritesBlockItem
                title='Самое частое упражнение'
                value={getFavoriteExercises(filteredTrainings)[0].exercise}
            />
        </div>
    );
};
