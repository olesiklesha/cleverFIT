import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { isJointFormValid } from '@components/joint-training-form/helpers';
import {
    dateRender,
    disablePastDate,
    getInitialFormValues,
    getPeriodOptions,
} from '@components/workouts-side-panel-form/helpers';
import { Colors, DateFormats } from '@constants/index.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { workoutsSelector } from '@redux/selectors.ts';
import {
    Button,
    Checkbox,
    ConfigProvider,
    DatePicker,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import ru_RU from 'antd/lib/locale-provider/ru_RU';

import { JointWorkoutsFormProps } from '../../models';

type Props = {
    setDisabled: (isDisabled: boolean) => void;
    form: FormInstance<JointWorkoutsFormProps>;
};

export const JointTrainingForm: React.FC<Props> = ({ form, setDisabled }) => {
    const { trainings, currTraining } = useAppSelector(workoutsSelector);
    const [isPeriod, setPeriod] = useState<boolean>(form.getFieldValue('repeat'));
    const [inputIndexesToDelete, setInputIndexesToDelete] = useState<number[]>([]);

    useEffect(() => {
        const initValue = getInitialFormValues(currTraining);

        form.setFieldsValue(initValue);
        setPeriod(initValue.repeat);
    }, [currTraining, form]);

    const onChange = () => {
        const isDisabled = !isJointFormValid(form.getFieldsValue());

        setDisabled(isDisabled);
    };

    const onCheck = () => setPeriod(form.getFieldValue('repeat'));

    const handleDeleteCheckbox = (e: CheckboxChangeEvent) => {
        if (!e.target.name) return;
        const inputNumber = +e.target.name;

        if (inputIndexesToDelete.includes(inputNumber)) {
            setInputIndexesToDelete(inputIndexesToDelete.filter((el) => el !== inputNumber));
        } else {
            setInputIndexesToDelete([...inputIndexesToDelete, inputNumber]);
        }
    };

    return (
        <Form
            form={form}
            onFieldsChange={onChange}
            style={{ padding: '32px 6px 0 0' }}
            className='add-exercise-form workouts-form joint-workouts-form'
        >
            <div className='workout-info'>
                <div className='form-row'>
                    <ConfigProvider locale={ru_RU}>
                        <Form.Item name='date'>
                            <DatePicker
                                placeholder='Выберите дату'
                                style={{ width: 148 }}
                                format={DateFormats.DATE_PICKER}
                                disabledDate={currTraining ? undefined : disablePastDate}
                                dateRender={(current) => dateRender(current, trainings)}
                                data-test-id='modal-drawer-right-date-picker'
                            />
                        </Form.Item>
                    </ConfigProvider>
                    <Form.Item name='repeat' className='checkbox-wrapper' valuePropName='checked'>
                        <Checkbox
                            onChange={onCheck}
                            data-test-id='modal-drawer-right-checkbox-period'
                        >
                            С периодичностью
                        </Checkbox>
                    </Form.Item>
                </div>
                {isPeriod && (
                    <Form.Item name='period'>
                        <Select
                            placeholder='Периодичность'
                            style={{ width: 148 }}
                            options={getPeriodOptions()}
                            data-test-id='modal-drawer-right-select-period'
                        />
                    </Form.Item>
                )}
            </div>
            <Form.List name='exercises'>
                {(fields, { add, remove }) => (
                    <React.Fragment>
                        {fields.map((field, i) => (
                            <div key={field.key}>
                                <Form.Item style={{ marginBottom: 8 }} name={[field.name, 'name']}>
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
    );
};
