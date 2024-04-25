import Title from 'antd/es/typography/Title';

import './marathon-plug.css';

export const MarathonPlug = () => (
    <div className='marathon-plug-container'>
        <div className='marathon-plug-info'>
            <Title>
                В данный период <br /> ни один марафон не проводится
            </Title>
            <p>
                Заглядывайте сюда почаще <br /> и ваш первый марафон скоро начнётся
            </p>
        </div>
    </div>
);
