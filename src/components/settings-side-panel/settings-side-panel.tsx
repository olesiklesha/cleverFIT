import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TariffComparisonList } from '@components/tariff-comparison-list';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileSelector, tariffSelector } from '@redux/selectors.ts';
import { setIsDrawerOpen } from '@redux/tariff-slice/tariff-slice.ts';
import { postTariff } from '@redux/tariff-slice/tariff-slice-thunk.ts';
import { Button, Drawer, Radio, RadioChangeEvent } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Title from 'antd/es/typography/Title';

import { Nullable } from '../../models';

import './settings-side-panel.css';

export const SettingsSidePanel = () => {
    const { isDrawerOpen, tariffList } = useAppSelector(tariffSelector);
    const { userInfo } = useAppSelector(profileSelector);
    const [isDisabled, setIsDisabled] = useState(true);
    const [currTariff, setCurrTariff] = useState<Nullable<number>>(null);
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setIsDrawerOpen(false));
        setIsDisabled(true);
        setCurrTariff(null);
    };

    const handleChange = (e: RadioChangeEvent) => {
        setCurrTariff(e.target.value);
        if (!isDisabled) return;
        setIsDisabled(false);
    };

    const handleClick = () => {
        if (!currTariff) return;

        dispatch(
            postTariff({
                days: currTariff,
                tariffId: tariffList[0]._id,
            }),
        );
    };

    return (
        isDrawerOpen && (
            <Drawer
                title='Сравнить тарифы'
                headerStyle={{ padding: isDesktop ? '24px 32px 16px' : '24px 16px 16px' }}
                placement={isDesktop ? 'right' : 'bottom'}
                open={isDrawerOpen}
                onClose={handleClose}
                width={isDesktop ? 408 : '100%'}
                height={isDesktop ? '100vh' : 555}
                className='drawer'
                bodyStyle={{ padding: isDesktop ? '0 24px 32px 32px' : '24px 16px' }}
                maskStyle={{ background: 'transparent' }}
                destroyOnClose={true}
                data-test-id='tariff-sider'
                closeIcon={
                    <CloseOutlined
                        style={{ color: Colors.LIGHT_GRAY }}
                        data-test-id='modal-drawer-right-button-close'
                    />
                }
                footer={
                    Boolean(!userInfo?.tariff) && (
                        <Button
                            type='primary'
                            size='large'
                            block={true}
                            disabled={isDisabled}
                            onClick={handleClick}
                            data-test-id='tariff-submit'
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <TariffComparisonList />
                {Boolean(!userInfo?.tariff) && (
                    <React.Fragment>
                        <Title level={3} className='tariff-radio-title'>
                            Стоимость тарифа
                        </Title>
                        <Radio.Group
                            name='tariff'
                            className='tariff-radio-group'
                            data-test-id='tariff-cost'
                            onChange={handleChange}
                        >
                            {tariffList[0].periods.map((el) => (
                                <Radio
                                    key={el.text}
                                    value={el.days}
                                    data-test-id={`tariff-${el.cost}`}
                                >
                                    <span className='tariff-text'>{el.text}</span>
                                    <span className='tariff-cost'>
                                        {String(el.cost).replace('.', ',')}$
                                    </span>
                                </Radio>
                            ))}
                        </Radio.Group>
                    </React.Fragment>
                )}
            </Drawer>
        )
    );
};
