import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import './side-panel-header.css';

type HeaderProps = {
    isEdit: boolean;
};

export const SidePanelHeader: React.FC<HeaderProps> = ({ isEdit }) => (
        <h3 className='side-panel-header'>
            {isEdit ? (
                <React.Fragment>
                    <EditOutlined style={{ fontSize: 14 }} />
                    Редактирование
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <PlusOutlined style={{ fontSize: 14 }} />
                    Добавление упражнений
                </React.Fragment>
            )}
        </h3>
    );
