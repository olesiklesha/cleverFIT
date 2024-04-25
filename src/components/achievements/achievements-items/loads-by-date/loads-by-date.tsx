/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { LoadByDate } from '@components/achievements/helpers';
import { Badge, Collapse } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const { Panel } = Collapse;

export const LoadsByDate: React.FC<{ data: LoadByDate[] }> = ({ data }) => {
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const firstDate = data[0].type.slice(0, 5);
    const lastDate = data[data.length - 1].type.slice(0, 5);
    const title = `Неделя ${firstDate}-${lastDate}`;

    return isDesktop ? (
        <div className='list-container'>
            <h3>{title}</h3>
            <div className='list loads-list'>
                {data.map((entry, i) => {
                    const { type, value } = entry;

                    return (
                        <div className='list__item' key={type}>
                            <Badge
                                count={i + 1}
                                size='small'
                                className={value ? 'active-list-badge' : ''}
                            >
                                <span />
                            </Badge>
                            <span className='dayName'>{type}</span>

                            <span className='item__value'>{value === 0 ? '' : `${value} кг`}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <Collapse
            defaultActiveKey={['1']}
            ghost={true}
            expandIconPosition='end'
            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? -90 : 90} />}
        >
            <Panel header={title} key='1' className='loads-list'>
                {data.map((entry, index) => {
                    const { type, value } = entry;

                    return (
                        <div className='list__item' key={type}>
                            <Badge
                                count={index + 1}
                                size='small'
                                className={value ? 'active-list-badge' : ''}
                            >
                                <span />
                            </Badge>
                            <span className='dayName'>{type}</span>

                            <span className='item__value'>{value === 0 ? '' : `${value} кг`}</span>
                        </div>
                    );
                })}
            </Panel>
        </Collapse>
    );
};
