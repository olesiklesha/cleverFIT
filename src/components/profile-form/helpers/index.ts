/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
    DEFAULT_PROFILE_FORM_PROPS,
    Endpoints,
    ErrorStatuses,
    FileApiUrl,
} from '@constants/index.ts';
import { AppDispatch } from '@redux/configure-store.ts';
import { setImageSrc, setModalIsOpen } from '@redux/profile-slice/profile-slice.ts';
import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import moment from 'moment';
import { UploadProgressEvent, UploadRequestOption } from 'rc-upload/lib/interface';

import { Nullable, Undefinable } from '../../../models';
import {
    ProfileFormProps,
    ProfileModals,
    PutUserBody,
    UserResponse,
} from '../../../models/user-models.ts';
import { api } from '../../../services';

export const getInitValues = (state: Nullable<UserResponse>): ProfileFormProps => {
    if (!state) return DEFAULT_PROFILE_FORM_PROPS;

    return {
        email: state.email,
        birthday: moment(state.birthday),
        firstName: state.firstName,
        lastName: state.lastName,
        image: undefined,
        password: undefined,
        confirm: undefined,
    };
};

export const getInitialFileList = (imageSrc: Undefinable<string>): UploadFile[] => {
    if (!imageSrc) return [];

    return [
        {
            url: imageSrc,
            name: 'avatar',
            uid: 'avatar',
            status: 'done',
        },
    ];
};

export const getFormattedFormFields = (
    fields: ProfileFormProps,
    fileList: UploadFile[],
): PutUserBody => {
    const filteredField = Object.entries(fields).filter((el) => el[0] !== 'image' && el[1]);

    const body = Object.fromEntries(filteredField) as PutUserBody;

    if (fields.birthday) {
        body.birthday = fields.birthday.toISOString();
    }

    return fileList.length > 0 && fileList[0].url ? { ...body, imgSrc: fileList[0].url } : body;
};

export const handleRequest = async (
    options: UploadRequestOption,
    token: Nullable<string>,
    dispatch: AppDispatch,
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const file = options.file as RcFile;
    const fmData = new FormData();

    fmData.append('file', file);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },
        onUploadProgress: (e: UploadProgressEvent) => {
            const percent = Math.floor((Number(e.loaded) / Number(e.total)) * 100);

            setFileList([
                {
                    uid: file.uid,
                    name: file.name,
                    percent,
                    status: 'uploading',
                },
            ]);
        },
    };

    try {
        const res = await api.post(Endpoints.UPLOAD, fmData, config);
        const imageSrc = FileApiUrl.URL + res.data.url;

        setFileList([
            {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: imageSrc,
            },
        ]);
        dispatch(setImageSrc(imageSrc));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;

            if (status === ErrorStatuses.CONFLICT) {
                dispatch(
                    setModalIsOpen({
                        modal: ProfileModals.SIZE_ERROR,
                        isOpen: true,
                    }),
                );
            }
        }
        setFileList([
            {
                uid: file.uid,
                name: file.name,
                status: 'error',
            },
        ]);
        setDisabled(true);
    }
};
