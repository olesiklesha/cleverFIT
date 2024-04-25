import React, { useEffect } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { getNonEmptyTitle, getTrainingColor } from '@components/calendar-side-panels/helpers';
import { SidePanelHeader } from '@components/calendar-side-panels/side-panel-header';
import { getFormattedStr } from '@components/training-modals/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import { closeSidePanel, setNewTraining } from '@redux/training-slice/training-slice.ts';
import { Badge, Button, Drawer, Form, Input, InputNumber } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { NewExerciseProps } from '../../../models';

import './calendar-side-panel.css';

type FormProps = {
    exercises: NewExerciseProps[];
};
export const CalendarSidePanel = () => {
    const { isOpen, trainingName, formInitialProps } = useAppSelector(trainingSelector).sidePanel;
    const { trainingNames } = useAppSelector(trainingSelector);
    const { date } = useAppSelector(trainingSelector).relativeModalProps;
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const [form] = useForm<FormProps>();

    useEffect(() => {
        form.setFieldsValue(
            formInitialProps.exercises.length
                ? formInitialProps
                : {
                      exercises: [
                          {
                              name: undefined,
                              weight: undefined,
                              replays: undefined,
                              approaches: undefined,
                          },
                      ],
                  },
        );
    }, [form, formInitialProps]);

    const handleClose = () => {
        const { exercises } = form.getFieldsValue();
        const filteredExercises = getNonEmptyTitle(exercises);

        if (filteredExercises.length) {
            dispatch(
                setNewTraining({
                    name: trainingName as string,
                    date: date as string,
                    exercises: filteredExercises,
                }),
            );
        }

        dispatch(closeSidePanel());
        form.resetFields();
    };

    return (
        <Drawer
            title={<SidePanelHeader isEdit={false} />}
            headerStyle={{ padding: isDesktop ? '24px 32px 16px' : '24px 16px 16px' }}
            placement={isDesktop ? 'right' : 'bottom'}
            open={isOpen}
            onClose={handleClose}
            width={isDesktop ? 408 : '100%'}
            height={isDesktop ? '100vh' : 555}
            className='drawer'
            bodyStyle={{ padding: isDesktop ? '0 24px 32px 32px' : '24px 16px' }}
            maskStyle={{ background: 'transparent' }}
            destroyOnClose={true}
            data-test-id='modal-drawer-right'
            closeIcon={
                <CloseOutlined
                    style={{ color: '#8C8C8C' }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <div className='training-info'>
                <Badge color={getTrainingColor(trainingNames, trainingName)} text={trainingName} />
                <span>{getFormattedStr(date)}</span>
            </div>
            <Form
                style={{ padding: '32px 6px 0 0' }}
                className='add-exercise-form'
                form={form}
                initialValues={formInitialProps}
            >
                <Form.List name='exercises'>
                    {(fields, { add }) => (
                        <React.Fragment>
                            {fields.map((field, i) => (
                                <div key={field.key}>
                                    <Form.Item
                                        style={{ marginBottom: 8 }}
                                        name={[field.name, 'name']}
                                    >
                                        <Input
                                            placeholder='Упражнение'
                                            data-test-id={`modal-drawer-right-input-exercise${i}`}
                                        />
                                    </Form.Item>
                                    <div className='num-inputs-container'>
                                        <Form.Item
                                            label={i === 0 ? 'Подходы' : 'Подходы, раз'}
                                            colon={false}
                                            style={{ width: '35%' }}
                                            name={[field.name, 'approaches']}
                                        >
                                            <InputNumber
                                                addonBefore='+'
                                                placeholder='1'
                                                min={1}
                                                data-test-id={`modal-drawer-right-input-approach${i}`}
                                            />
                                        </Form.Item>
                                        <div className='num-inputs-container num-inputs-container_s'>
                                            <Form.Item
                                                label='Вес, кг'
                                                colon={false}
                                                name={[field.name, 'weight']}
                                            >
                                                <InputNumber
                                                    placeholder='0'
                                                    min={0}
                                                    data-test-id={`modal-drawer-right-input-weight${i}`}
                                                />
                                            </Form.Item>
                                            x
                                            <Form.Item
                                                label='Количество'
                                                colon={false}
                                                name={[field.name, 'replays']}
                                            >
                                                <InputNumber
                                                    placeholder='3'
                                                    min={1}
                                                    data-test-id={`modal-drawer-right-input-quantity${i}`}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ background: Colors.LIGHT_BG }}>
                                <Button
                                    size='large'
                                    type='text'
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                    key='add-btn'
                                    style={{ width: '50%', color: Colors.PRIMARY }}
                                >
                                    Добавить ещё
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
