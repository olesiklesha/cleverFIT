import { useEffect, useRef, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PartnerCard } from '@components/partner-cards';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import {
    setDefaultJointTrainingsBlockState,
    setSearchValue,
} from '@redux/workouts-slice/workouts-slice.ts';
import { getSortedPartners } from '@utils/helpers.ts';
import { Button, Input, InputRef, List } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { JoinTrainingsBlocks, PartnerProps } from '../../../models';

import './joint-training-partners-list.css';

export const JointTrainingPartnersList = () => {
    const { jointTrainingBlocks, partners } = useAppSelector(workoutsSelector);
    const [data, setData] = useState<PartnerProps[] | undefined>(partners);
    const screen = useBreakpoint();
    const isDesktop = screen.lg;
    const dispatch = useAppDispatch();
    const searchRef = useRef<InputRef>(null);

    const handleBackBtnClick = () => {
        setData(partners);
        dispatch(setDefaultJointTrainingsBlockState());
    };

    const handleSearch = (value: string) => {
        const filtered = partners.filter((el) =>
            el.name.toLowerCase().includes(value.trim().toLowerCase()),
        );

        dispatch(setSearchValue(value));
        setData(getSortedPartners(filtered));
    };

    useEffect(() => {
        const value = searchRef.current?.input?.value;

        const filtered = value
            ? partners.filter((el) => el.name.toLowerCase().includes(value.trim().toLowerCase()))
            : partners;

        setData(filtered);
    }, [partners]);

    return (
        jointTrainingBlocks[JoinTrainingsBlocks.PARTNERS_LIST] && (
            <div>
                <div className='partners-list-header'>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        size='large'
                        type='text'
                        onClick={handleBackBtnClick}
                    >
                        Назад
                    </Button>
                    <Input.Search
                        style={{ width: 484 }}
                        placeholder='Поиск по имени'
                        onSearch={handleSearch}
                        data-test-id='search-input'
                        ref={searchRef}
                    />
                </div>
                <List
                    dataSource={data}
                    grid={{
                        gutter: isDesktop ? 16 : 12,
                        column: 4,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    pagination={{
                        pageSize: 12,
                    }}
                    renderItem={(item, index) => (
                        <List.Item>
                            <PartnerCard partner={item} index={index} />
                        </List.Item>
                    )}
                />
            </div>
        )
    );
};
