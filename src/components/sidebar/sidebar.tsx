import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeartFilled, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled } from '@ant-design/icons';
import { CustomCalendarIcon, CustomIdCardIcon, LogOutIcon } from '@components/sidebar/icons';
import { Paths } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings as getTrainingsForStatistic } from '@redux/achievements-slice/achievements-slice-thunk.ts';
import { signOut } from '@redux/auth-slice/auth-slice-thunk.ts';
import { history } from '@redux/configure-store.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import { getTrainings } from '@redux/training-slice/training-slice-thunk.ts';
import { getWorkouts } from '@redux/workouts-slice/workouts-slice-thunk.ts';
import { Badge, Button, Menu, MenuProps } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Sider from 'antd/es/layout/Sider';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

import './sidebar.css';

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItemType[],
    type?: 'group',
): MenuItemType {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItemType;
}

const itemsArr: MenuItemType[] = [
    getItem('Календарь', Paths.CALENDAR, <CustomCalendarIcon style={{ color: '#061178' }} />),
    getItem('Тренировки', Paths.WORKOUTS, <HeartFilled style={{ color: '#061178' }} />),
    getItem('Достижения', Paths.ACHIEVEMENTS, <TrophyFilled style={{ color: '#061178' }} />),
    getItem('Профиль', Paths.PROFILE, <CustomIdCardIcon style={{ color: '#061178' }} />),
];

export const Sidebar = () => {
    const { invites } = useAppSelector(workoutsSelector);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const isTablet = screens.md;
    const location = useLocation();

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const handleLogOut = () => {
        dispatch(signOut());
        history.push(Paths.AUTH);
    };

    const handleMenuItemClick: MenuProps['onClick'] = (e) => {
        history.push(e.key);
        switch (e.key) {
            case Paths.CALENDAR:
                dispatch(getTrainings());
                break;

            case Paths.WORKOUTS:
                dispatch(getWorkouts());
                break;

            case Paths.ACHIEVEMENTS:
                dispatch(getTrainingsForStatistic());
                break;

            default:
                break;
        }
    };

    const handleLogoClick = () => history.push(Paths.MAIN);

    useEffect(() => {
        setCollapsed(!isDesktop);
    }, [isDesktop]);

    return (
        <Sider
            collapsed={collapsed}
            className={collapsed ? 'sidebar sidebar_collapsed' : 'sidebar'}
            collapsedWidth={isTablet ? 64 : 0}
            width={isTablet ? 208 : 106}
        >
            <div className='logo-container'>
                <button
                    className='logo'
                    type='button'
                    aria-label='logo'
                    onClick={handleLogoClick}
                />
            </div>
            <Menu
                mode='inline'
                theme='light'
                items={itemsArr.map((el) => ({
                    key: el.key,
                    label: el.label,
                    icon:
                        invites.length && el.key === Paths.WORKOUTS ? (
                            <Badge
                                count={invites.length}
                                size='small'
                                data-test-id='notification-about-joint-training'
                            >
                                {el.icon}
                            </Badge>
                        ) : (
                            el.icon
                        ),
                    'data-test-id': el.key === Paths.ACHIEVEMENTS ? 'sidebar-achievements' : '',
                }))}
                style={{ marginTop: isTablet ? 50 : 16 }}
                onClick={handleMenuItemClick}
                selectedKeys={[location.pathname]}
            />
            <button
                type='button'
                onClick={toggleCollapsed}
                className='btn-collapse'
                data-test-id={isTablet ? 'sider-switch' : 'sider-switch-mobile'}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className='btn-wrapper'>
                <Button
                    type='text'
                    icon={<LogOutIcon />}
                    className={collapsed ? 'exit-btn exit-btn_collapsed' : 'exit-btn'}
                    onClick={handleLogOut}
                >
                    Выход
                </Button>
            </div>
        </Sider>
    );
};
