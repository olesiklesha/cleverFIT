import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Colors, Texts } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setFilter } from '@redux/achievements-slice/achievements-slice.ts';
import { achievementsSelector } from '@redux/selectors.ts';
import CheckableTag from 'antd/es/tag/CheckableTag';

import './trainings-filter.css';

export const TrainingsFilter = () => {
    const { trainingList } = useAppSelector(achievementsSelector);
    const [selectedTag, setSelectedTag] = useState<string[]>([Texts.ALL]);
    const dispatch = useAppDispatch();

    const handleCheck = (tag: string) => {
        const next = selectedTag[0] === tag ? [Texts.ALL] : [tag];

        dispatch(setFilter(next[0] === Texts.ALL ? null : next[0]));
        setSelectedTag(next);
    };

    return (
        <div className='filters-container'>
            <span className='filters-container__title'>Тип тренировки:</span>
            <div className='tags-container'>
                <CheckableTag
                    checked={selectedTag.includes(Texts.ALL)}
                    onChange={() => handleCheck(Texts.ALL)}
                >
                    Все{' '}
                    {selectedTag.includes(Texts.ALL) ? (
                        <CloseOutlined style={{ color: Colors.LIGHT_GRAY, fontSize: 12 }} />
                    ) : (
                        ''
                    )}
                </CheckableTag>
                {trainingList.map((el) => (
                    <CheckableTag
                        checked={selectedTag.includes(el.name)}
                        key={el.name}
                        onChange={() => handleCheck(el.name)}
                    >
                        {el.name}{' '}
                        {selectedTag.includes(el.name) ? (
                            <CloseOutlined style={{ color: Colors.LIGHT_GRAY, fontSize: 12 }} />
                        ) : (
                            ''
                        )}
                    </CheckableTag>
                ))}
            </div>
        </div>
    );
};
