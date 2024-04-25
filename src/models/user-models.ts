/* eslint-disable import/no-extraneous-dependencies */
import { RcFile } from 'antd/es/upload';
import { Moment } from 'moment';

import { Undefinable } from './utility-models.ts';

export type UserResponse = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: {
        tariffId: string;
        expired: string;
    };
};

export type PutUserFields = Omit<UserResponse, 'tariff'> & {
    password: string;
};

export type PutUserBody = Partial<PutUserFields>;

export type ImageFieldProp = {
    file: RcFile;
    fileList: RcFile[];
};

export type ProfileFormProps = {
    email: Undefinable<string>;
    firstName: Undefinable<string>;
    lastName: Undefinable<string>;
    birthday: Undefinable<Moment>;
    password: Undefinable<string>;
    confirm: Undefinable<string>;
    image: Undefinable<ImageFieldProp>;
};

export enum ProfileModals {
    SIZE_ERROR,
    SUCCESS,
    SAVE_ERROR,
}

export type ProfileModalsState = { [key in ProfileModals]: boolean };

export enum SwitchName {
    NOTIFICATION = 'sendNotification',
    TRAINING = 'readyForJointTraining',
    DARK_MODE = 'darkMode',
}
