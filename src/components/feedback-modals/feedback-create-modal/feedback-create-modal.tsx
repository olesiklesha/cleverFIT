import { useState } from 'react';
import { StarTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { toggleCreatorModal } from '@redux/feedback-slice/feedback-slice.ts';
import { postFeedback } from '@redux/feedback-slice/feedback-slice-thunk.ts';
import { feedbackSelector } from '@redux/selectors.ts';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RatingType } from '../../../models';

import './feedback-create-modal.css';

type FormProps = {
    rating: RatingType;
    text: string;
};
export const FeedbackCreateModal = () => {
    const [isDisabledBtn, setDisabledBtn] = useState(true);
    const { creatorModal } = useAppSelector(feedbackSelector);
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;
    const [form] = useForm<FormProps>();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            dispatch(
                postFeedback({
                    rating: values.rating,
                    message: values.text,
                }),
            );
        });
    };

    const handleRateChange = (value: number) => {
        if (value > 0 && isDisabledBtn) {
            setDisabledBtn(false);
        }
    };

    const handleToggleCreatorModal = () => {
        dispatch(toggleCreatorModal());
    };

    return (
        <Modal
            open={creatorModal}
            onCancel={handleToggleCreatorModal}
            bodyStyle={{ padding: isDesktop ? 24 : '24px 16px' }}
            width={isDesktop ? 540 : 328}
            centered={true}
            title='Ваш отзыв'
            maskStyle={{ background: 'rgba(121, 156, 212, 0.1)', backdropFilter: 'blur(4px)' }}
            footer={[
                <Button
                    type='primary'
                    size='large'
                    onClick={handleSubmit}
                    key='submit'
                    disabled={isDisabledBtn}
                    block={!isDesktop}
                    data-test-id='new-review-submit-button'
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Form onFinish={handleSubmit} form={form} className='feedback-form'>
                <Form.Item
                    name='rating'
                    rules={[{ required: true, message: 'Оценка обязательна' }]}
                >
                    <Rate
                        allowHalf={false}
                        style={{ fontSize: 24, lineHeight: 1 }}
                        onChange={handleRateChange}
                        character={
                            <StarTwoTone
                                color='#FAAD14'
                                twoToneColor='#FAAD14'
                                style={{ fontSize: 24 }}
                            />
                        }
                    />
                </Form.Item>
                <Form.Item name='text'>
                    <Input.TextArea
                        autoSize={true}
                        className='modal-textarea'
                        style={{ minHeight: 46, padding: '5px 12px' }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
