import { Paths } from '@constants/index.ts';
import { history } from '@redux/configure-store.ts';
import { Button, Card, Result } from 'antd';

import './error-page.css';

export const ErrorPage = () => {
    const handleClick = () => {
        history.push(Paths.MAIN);
    };

    return (
        <Card className='error-page-card'>
            <Result
                status='404'
                title='Такой страницы нет'
                subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                extra={
                    <Button type='primary' size='large' onClick={handleClick}>
                        На главную
                    </Button>
                }
            />
        </Card>
    );
};
