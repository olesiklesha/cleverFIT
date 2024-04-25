import { Link, useLocation } from 'react-router-dom';
import { Paths } from '@constants/index.ts';
import { Breadcrumb } from 'antd';

type CustomObj = {
    [key: string]: string;
};

const routesObj: CustomObj = {
    [Paths.R_SWITCHER]: 'Главная',
    main: 'Главная',
    feedbacks: 'Отзывы пользователей',
    calendar: 'Календарь',
    profile: 'Профиль',
    trainings: 'Тренировки',
    achievements: 'Достижения',
};

const pathsObj: CustomObj = {
    feedbacks: Paths.FEEDBACK,
    main: Paths.R_SWITCHER,
    calendar: Paths.CALENDAR,
    profile: Paths.PROFILE,
    trainings: Paths.WORKOUTS,
    achievements: Paths.ACHIEVEMENTS,
};

export const CustomBreadcrumb = () => {
    const { pathname } = useLocation();
    const pathsArr = pathname.split('/');

    return (
        <Breadcrumb>
            {pathsArr.map((el, i) => {
                if (i === 0)
                    return (
                        <Breadcrumb.Item key={el}>
                            <Link to={Paths.MAIN}>Главная</Link>
                        </Breadcrumb.Item>
                    );

                if (i === pathsArr.length - 1 && pathsArr.length > 1)
                    return <Breadcrumb.Item key={el}>{routesObj[el]}</Breadcrumb.Item>;

                return (
                    <Breadcrumb.Item key={el}>
                        <Link to={pathsObj[el]}>{routesObj[el]}</Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};
