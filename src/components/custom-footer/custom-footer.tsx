import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getFeedback } from '@redux/feedback-slice/feedback-slice-thunk.ts';
import { authSelector } from '@redux/selectors.ts';
import { Button, Card } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import './custom-footer.css';

export const CustomFooter = () => {
    const { token } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    const handleFeedbackBtnClick = () => {
        if (token) {
            dispatch(getFeedback(token));
        }
    };

    return (
        <Footer className='footer'>
            <div className='footer-container'>
                <Button type='text' onClick={handleFeedbackBtnClick} data-test-id='see-reviews'>
                    Смотреть отзывы
                </Button>
                <Card className='footer-card' bordered={false}>
                    <div className='card-info'>
                        <span>Скачать на телефон</span>
                        <span>Доступно в PRO-тарифе</span>
                    </div>
                    <div className='btn-container'>
                        <Button type='text' icon={<AndroidFilled />}>
                            Android OS
                        </Button>
                        <Button type='text' icon={<AppleFilled />}>
                            Apple iOS
                        </Button>
                    </div>
                </Card>
            </div>
        </Footer>
    );
};
