import { useLocation } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { CustomBreadcrumb } from '@components/custom-breadcrumb';
import { Paths } from '@constants/index.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { getTariffList } from '@redux/tariff-slice/tariff-slice-thunk.ts';
import { Button } from 'antd';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import Typography from 'antd/es/typography';

import './header.css';

const { Title } = Typography;

export const Header = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const handleSettingsClick = () => {
        dispatch(getTariffList());
        history.push(Paths.SETTINGS);
    };

    return (
        <AntdHeader
            className={
                pathname === Paths.MAIN
                    ? 'header-container header-container_main'
                    : 'header-container'
            }
        >
            {pathname === Paths.MAIN ? (
                <Title level={2} className='subtitle'>
                    Главная
                </Title>
            ) : (
                <CustomBreadcrumb />
            )}
            <div className='header-info'>
                {pathname === Paths.MAIN && (
                    <Title level={2} className='title'>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </Title>
                )}
                <Button
                    type='text'
                    icon={<SettingOutlined />}
                    onClick={handleSettingsClick}
                    data-test-id='header-settings'
                >
                    Настройки
                </Button>
            </div>
        </AntdHeader>
    );
};
