import React, { useEffect, useState } from 'react';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
    getNonEmptyTitleExercises,
    getTrainingColor,
} from '@components/calendar-side-panels/helpers';
import { SidePanelHeader } from '@components/calendar-side-panels/side-panel-header';
import { getFormattedStr } from '@components/training-modals/helpers';
import { Colors } from '@constants/index.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingSelector } from '@redux/selectors.ts';
import { setIsEditSidePanelOpen, setNewTraining } from '@redux/training-slice/training-slice.ts';
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { NewExerciseProps } from '../../../models';

type FormProps = {
    exercises: NewExerciseProps[];
};
export const EditCalendarSidePanel = () => {
    const { trainingName, formInitialProps } = useAppSelector(trainingSelector).sidePanel;
    const { trainingNames, isEditSidePanelOpen, newTraining } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const [form] = useForm<FormProps>();
    const [inputIndexesToDelete, setInputIndexesToDelete] = useState<number[]>([]);

    const handleDeleteCheckbox = (e: CheckboxChangeEvent) => {
        if (!e.target.name) return;
        const inputNumber = +e.target.name;

        if (inputIndexesToDelete.includes(inputNumber)) {
            setInputIndexesToDelete(inputIndexesToDelete.filter((el) => el !== inputNumber));
        } else {
            setInputIndexesToDelete([...inputIndexesToDelete, inputNumber]);
        }
    };

    const handleClose = () => {
        const { exercises } = form.getFieldsValue();
        const filteredExercises = getNonEmptyTitleExercises(exercises);

        dispatch(
            setNewTraining({
                name: trainingName as string,
                date: newTraining?.date as string,
                exercises: filteredExercises,
            }),
        );
        dispatch(setIsEditSidePanelOpen(false));
    };

    useEffect(() => {
        form.setFieldsValue(formInitialProps);
    }, [form, formInitialProps]);

    return (
        <Drawer
            title={<SidePanelHeader isEdit={true} />}
            headerStyle={{ padding: isDesktop ? '24px 32px 16px' : '24px 16px 16px' }}
            placement={isDesktop ? 'right' : 'bottom'}
            open={isEditSidePanelOpen}
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
                    style={{ color: Colors.LIGHT_GRAY }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <div className='training-info'>
                <Badge color={getTrainingColor(trainingNames, trainingName)} text={trainingName} />
                <span>{newTraining && getFormattedStr(newTraining.date)}</span>
            </div>
            <Form
                form={form}
                style={{ padding: '32px 6px 0 0' }}
                className='add-exercise-form workouts-form joint-workouts-form'
                initialValues={formInitialProps}
            >
                <Form.List name='exercises'>
                    {(fields, { add, remove }) => (
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
                                            addonAfter={
                                                <Checkbox
                                                    name={String(i)}
                                                    onChange={handleDeleteCheckbox}
                                                    data-test-id={`modal-drawer-right-checkbox-exercise${i}`}
                                                />
                                            }
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
                            <div className='workouts-form-btn-container'>
                                <Button
                                    size='large'
                                    type='text'
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                    key='add-btn'
                                    style={{ color: Colors.PRIMARY, textAlign: 'left' }}
                                >
                                    Добавить ещё
                                </Button>
                                <Button
                                    size='large'
                                    type='text'
                                    icon={<MinusOutlined />}
                                    onClick={() => {
                                        remove(inputIndexesToDelete);
                                        setInputIndexesToDelete([]);
                                    }}
                                    key='delete-btn'
                                    style={{ width: '50%' }}
                                    disabled={inputIndexesToDelete.length === 0}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
