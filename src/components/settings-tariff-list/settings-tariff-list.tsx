import { CheckOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileSelector } from '@redux/selectors.ts';
import { setIsDrawerOpen } from '@redux/tariff-slice/tariff-slice.ts';
import { getExpirationDate } from '@utils/helpers.ts';
import { Button, Card } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Title from 'antd/es/typography/Title';

import freeTariffImg from '../../assets/images/free-tariff.jpg';
import proTariffImg from '../../assets/images/pro-tariff.jpg';
import proTariffDisableImg from '../../assets/images/pro-tariff-disable.jpg';

import './settings-tariff-list.css';

export const SettingsTariffList = () => {
    const { userInfo } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const isDesktop = breakpoint.sm;

    const handleClick = () => dispatch(setIsDrawerOpen(true));

    return (
        <div className='tariff-list-container'>
            <Title level={2}>Мой тариф</Title>
            <div className='tariff-list'>
                <Card
                    style={{ width: isDesktop ? 240 : '100%' }}
                    title='FREE tariff'
                    extra={
                        <Button type='link' onClick={handleClick}>
                            Подробнее
                        </Button>
                    }
                    cover={
                        <img
                            src={freeTariffImg}
                            alt='free-tariff'
                            style={{ aspectRatio: '16/10' }}
                        />
                    }
                >
                    <span className='active-info'>
                        активен <CheckOutlined />
                    </span>
                </Card>
                <Card
                    data-test-id='pro-tariff-card'
                    style={{ width: isDesktop ? 240 : '100%' }}
                    title='PRO tariff'
                    extra={
                        <Button type='link' onClick={handleClick}>
                            Подробнее
                        </Button>
                    }
                    cover={
                        <img
                            src={userInfo?.tariff ? proTariffImg : proTariffDisableImg}
                            alt='free-tariff'
                            style={{ aspectRatio: '16/10' }}
                        />
                    }
                >
                    {userInfo?.tariff ? (
                        <span className='active-info'>
                            активен <br /> до {getExpirationDate(userInfo.tariff.expired)}
                        </span>
                    ) : (
                        <Button type='primary' size='large' data-test-id='activate-tariff-btn'>
                            Активировать
                        </Button>
                    )}
                </Card>
            </div>
        </div>
    );
};
