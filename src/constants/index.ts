import { WorkoutsFormProps } from '../models';
import { ProfileFormProps } from '../models/user-models.ts';

export enum Paths {
    R_SWITCHER = '/',
    AUTH = '/auth',
    REGISTRATION = '/auth/registration',
    CONFIRM_EMAIL = '/auth/confirm-email',
    CHANGE_PASS = '/auth/change-password',
    MAIN = '/main',
    FEEDBACK = '/feedbacks',
    CALENDAR = '/calendar',
    PROFILE = '/profile',
    SETTINGS = '/settings',
    WORKOUTS = '/trainings',
    ACHIEVEMENTS = '/achievements',
    RESULT = '/result',
    SUCCESS = '/result/success',
    SUCCESS_PASS_RECOVERY = '/result/success-change-password',
    ERROR = '/result/error',
    LOGIN_E = '/result/error-login',
    USER_EXIST_E = '/result/error-user-exist',
    EMAIL_EXIST_E = '/result/error-check-email-no-exist',
    CHECK_EMAIL_E = '/result/error-check-email',
    CHANGE_PASS_E = '/result/error-change-password',
    NOT_FOUND = '*',
}

export enum AuthTabsKey {
    AUTH,
    REGISTRATION,
}

export const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const PASS_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export enum BtnCardType {
    Training,
    Calendar,
    Profile,
}

export enum Endpoints {
    LOGIN = '/auth/login',
    REGISTRATION = '/auth/registration',
    CHECK_EMAIL = '/auth/check-email',
    CONFIRM_EMAIL = '/auth/confirm-email',
    CHANGE_PASS = '/auth/change-password',
    FEEDBACK = '/feedback',
    GOOGLE = '/auth/google',
    TRAINING = '/training',
    TRAINING_LIST = '/catalogs/training-list',
    GET_USER = '/user/me',
    PUT_USER = '/user',
    TARIFF_LIST = '/catalogs/tariff-list',
    TARIFF = '/tariff',
    UPLOAD = '/upload-image',
    TRAINING_PARTNERS = '/catalogs/training-pals',
    PARTNERS_LIST = '/catalogs/user-joint-training-list',
    INVITE = '/invite',
}

export enum ErrorStatuses {
    NOT_FOUND = 404,
    CONFLICT = 409,
    FORBIDDEN = 403,
}

export const COLLAPSED_FEEDBACK_COUNT = 4;

export const BASE_URL = 'https://marathon-api.clevertec.ru';

type PageNames = {
    [key: string]: string;
};
export const PAGE_NAMES: PageNames = Object.freeze({
    [Paths.MAIN]: 'Главная',
    [Paths.CALENDAR]: 'Календарь',
});

export const CUSTOM_FORM_NEW_FIELD_PROPS = {
    name: undefined,
    weight: undefined,
    replays: undefined,
    approaches: undefined,
};

export const DEFAULT_PROFILE_FORM_PROPS: ProfileFormProps = {
    birthday: undefined,
    image: undefined,
    password: undefined,
    lastName: undefined,
    firstName: undefined,
    email: undefined,
    confirm: undefined,
};

export enum Colors {
    PRIMARY = '#2f54eb',
    LIGHT_BG = '#F0F0F0',
    LIGHT_GRAY = '#8C8C8C',
    ERROR = '#FF4D4F',
    SUCCESS = '#52C41A',
}

export enum FileApiUrl {
    URL = 'https://training-api.clevertec.ru/',
}

export enum DateFormats {
    DATE_PICKER = 'DD.MM.YYYY',
    TD_TITLE = 'YYYY-MM-DD',
}

export const WORKOUTS_FORM_DEFAULT_VALUE: WorkoutsFormProps = {
    repeat: false,
    period: undefined,
    date: undefined,
    trainingName: undefined,
    exercises: [CUSTOM_FORM_NEW_FIELD_PROPS],
};

export const MAX_TRAINING_PALS = 4;

export const PERIODS = [
    'Через 1 день',
    'Через 2 дня',
    'Через 3 дня',
    'Через 4 дня',
    'Через 5 дней',
    'Через 6 дней',
    '1 раз в неделю',
];

export enum Texts {
    ALL = 'Все',
}

export enum AchievementsPeriod {
    WEEK = 7,
    MONTHS = 28,
}

export type AchievementsPeriodType = AchievementsPeriod.MONTHS | AchievementsPeriod.WEEK;
