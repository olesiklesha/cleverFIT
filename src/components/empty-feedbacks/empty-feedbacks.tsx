import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { toggleCreatorModal } from '@redux/feedback-slice/feedback-slice.ts';
import { Button, Card, Layout } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Typography from 'antd/es/typography';

export const EmptyFeedbacks = () => {
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const isDesktop = screens.sm;

    const handleToggleCreatorModal = () => {
        dispatch(toggleCreatorModal());
    };

    return (
        <Layout.Content className='empty-feedback-content'>
            <Card className='empty-feedback-card'>
                <Typography.Title level={3} className='title'>
                    Оставьте свой отзыв первым
                </Typography.Title>
                <Typography.Text className='text'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </Typography.Text>
            </Card>
            <Button
                type='primary'
                size='large'
                onClick={handleToggleCreatorModal}
                block={!isDesktop}
                data-test-id='write-review'
            >
                Написать отзыв
            </Button>
        </Layout.Content>
    );
};
