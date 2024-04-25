/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals';
import {
    getExpirationDate,
    getFavoriteTrainingType,
    getFormattedPostTrainingBody,
    getFormattedTrainingBodyFromForm,
    getName,
    getSortedPartners,
    getTrainingsForCurrentDate,
    isTopLeftPos,
} from '@utils/helpers.ts';
import * as moment from 'moment';

import {
    InviteStatuses,
    NewTrainingProps,
    PartnerProps,
    PostTrainingBody,
    PostTrainingBodyWithParameters,
    TrainingProps,
    WorkoutsFormProps,
} from '../models';

const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);
const fourDaysLater = new Date().setDate(new Date().getDate() + 4);

const userTraining = [
    {
        _id: '1',
        name: 'Ноги',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
                isImplementation: false,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: today,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '2',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '3',
        name: 'Ноги',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '4',
        name: 'Руки',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '5',
        name: 'Силовая',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '6',
        name: 'Спина',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '7',
        name: 'Грудь',
        date: twoDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '8',
        name: 'Ноги',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 50,
                approaches: 10,
                isImplementation: false,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 70,
                approaches: 10,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '9',
        name: 'Спина',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '10',
        name: 'Силовая',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '11',
        name: 'Грудь',
        date: threeDaysLater,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
    {
        _id: '12',
        name: 'Руки',
        date: dayBeforeToday,
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: '2',
                name: 'Упражнение',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    },
] as TrainingProps[];

const jointTrainingListForMyTraining = [
    {
        id: '65fafa2677536b7e4569a98e',
        name: 'Рудак Максим',
        trainingType: 'Ноги',
        avgWeightInWeek: 6,
        imageSrc: '/media/avatar/65fafa2677536b7e4569a98e.png',
        inviteId: null,
        status: null,
    },
    {
        id: '65fb234f77536b7e4569acfe',
        name: 'Шунто Дмитрий',
        trainingType: 'Ноги',
        avgWeightInWeek: 2,
        imageSrc:
            'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
        inviteId: null,
        status: null,
    },
    {
        id: '65fb309e77536b7e4569b465',
        name: 'Бокша Вероника',
        trainingType: 'Ноги',
        avgWeightInWeek: 2,
        imageSrc: 'https://training-api.clevertec.ru/media/avatar/65fb309e77536b7e4569b465.png',
        inviteId: null,
        status: null,
    },
    {
        id: '65ffbe0668b4b7f6e62e9323',
        name: 'Каракулько Дмитрий',
        trainingType: 'Ноги',
        avgWeightInWeek: 0,
        imageSrc: 'https://training-api.clevertec.ru/media/avatar/65ffbe0668b4b7f6e62e9323.png',
        inviteId: null,
        status: null,
    },
];

const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strenght' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

describe('get training body with params', () => {
    const formValues: WorkoutsFormProps = {
        date: moment(),
        trainingName: 'Ноги',
        repeat: false,
        period: undefined,
        exercises: [
            {
                name: 'Присяд',
                replays: 3,
                approaches: 3,
                weight: 10,
            },
        ],
    };

    const formValuesWithRepeat: WorkoutsFormProps = {
        date: moment(),
        trainingName: 'Ноги',
        repeat: true,
        period: 2,
        exercises: [
            {
                name: 'Присяд',
                replays: 3,
                approaches: 3,
                weight: 10,
            },
        ],
    };

    it('post trainings', () => {
        const expected: PostTrainingBodyWithParameters = {
            date: formValues.date!.toISOString(),
            name: 'Ноги',
            isImplementation: false,
            exercises: [
                {
                    isImplementation: false,
                    name: 'Присяд',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
            ],
        };

        expect(getFormattedTrainingBodyFromForm(formValues)).toEqual(expected);
    });
    it('post trainings with params', () => {
        const expected: PostTrainingBodyWithParameters = {
            date: formValuesWithRepeat.date!.toISOString(),
            name: 'Ноги',
            isImplementation: false,
            parameters: {
                repeat: true,
                period: 2,
            },
            exercises: [
                {
                    isImplementation: false,
                    name: 'Присяд',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
            ],
        };

        expect(getFormattedTrainingBodyFromForm(formValuesWithRepeat)).toEqual(expected);
    });
});

describe('get formatted post training body', () => {
    const newTraining: NewTrainingProps = {
        name: 'Ноги',
        date: today,
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                approaches: 3,
                weight: 10,
            },
        ],
    };
    const expected: PostTrainingBody = {
        name: 'Ноги',
        date: new Date(today).toISOString(),
        isImplementation: false,
        exercises: [
            {
                isImplementation: false,
                name: 'Присяд',
                replays: 3,
                approaches: 3,
                weight: 10,
            },
        ],
    };

    it('test', () => {
        const result = getFormattedPostTrainingBody(newTraining);

        expect(result).toEqual(expected);
    });
});

describe('partners sort', () => {
    it('alphabetically sort', () => {
        const expected = [
            {
                id: '65fb309e77536b7e4569b465',
                name: 'Бокша Вероника',
                trainingType: 'Ноги',
                avgWeightInWeek: 2,
                imageSrc:
                    'https://training-api.clevertec.ru/media/avatar/65fb309e77536b7e4569b465.png',
                inviteId: null,
                status: null,
            },
            {
                id: '65ffbe0668b4b7f6e62e9323',
                name: 'Каракулько Дмитрий',
                trainingType: 'Ноги',
                avgWeightInWeek: 0,
                imageSrc:
                    'https://training-api.clevertec.ru/media/avatar/65ffbe0668b4b7f6e62e9323.png',
                inviteId: null,
                status: null,
            },
            {
                id: '65fafa2677536b7e4569a98e',
                name: 'Рудак Максим',
                trainingType: 'Ноги',
                avgWeightInWeek: 6,
                imageSrc: '/media/avatar/65fafa2677536b7e4569a98e.png',
                inviteId: null,
                status: null,
            },
            {
                id: '65fb234f77536b7e4569acfe',
                name: 'Шунто Дмитрий',
                trainingType: 'Ноги',
                avgWeightInWeek: 2,
                imageSrc:
                    'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
                inviteId: null,
                status: null,
            },
        ];

        expect(getSortedPartners(jointTrainingListForMyTraining)).toEqual(expected);
    });

    it('sort with accepted status', () => {
        const partnersWithStatus = [...jointTrainingListForMyTraining] as PartnerProps[];

        partnersWithStatus[1].status = InviteStatuses.ACCEPTED;

        const res = getSortedPartners(partnersWithStatus);

        const expected = {
            id: '65fb234f77536b7e4569acfe',
            name: 'Шунто Дмитрий',
            trainingType: 'Ноги',
            avgWeightInWeek: 2,
            imageSrc:
                'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
            inviteId: null,
            status: 'accepted',
        };

        expect(res[0]).toEqual(expected);
    });

    it('sort with reject status', () => {
        const partnersWithStatus = [...jointTrainingListForMyTraining] as PartnerProps[];

        partnersWithStatus[2].status = InviteStatuses.REJECTED;

        const res = getSortedPartners(partnersWithStatus);
        const expected = {
            id: '65fb309e77536b7e4569b465',
            name: 'Бокша Вероника',
            trainingType: 'Ноги',
            avgWeightInWeek: 2,
            imageSrc: 'https://training-api.clevertec.ru/media/avatar/65fb309e77536b7e4569b465.png',
            inviteId: null,
            status: 'rejected',
        };

        expect(res[res.length - 1]).toEqual(expected);
    });

    it('empty array', () => {
        expect(getSortedPartners([])).toEqual([]);
    });
});

describe('get training for current date', () => {
    it('test today date', () => {
        const todayMoment = moment();

        const result = getTrainingsForCurrentDate(todayMoment, userTraining);

        expect(result.length).toBe(2);
    });
    it('test no trainings for current date', () => {
        const date = moment().add(20, 'days');

        const result = getTrainingsForCurrentDate(date, userTraining);

        expect(result.length).toBe(0);
    });
    it('test no trainings for two days later', () => {
        const date = moment().add(2, 'days');

        const result = getTrainingsForCurrentDate(date, userTraining);

        expect(result.length).toBe(5);
    });
    it('test no trainings for three days later', () => {
        const date = moment().add(3, 'days');

        const result = getTrainingsForCurrentDate(date, userTraining);

        expect(result.length).toBe(4);
    });
    it('test no trainings for past day', () => {
        const date = moment().add(-1, 'days');

        const result = getTrainingsForCurrentDate(date, userTraining);

        expect(result.length).toBe(1);
    });
});

describe('test getName', () => {
    it('no name', () => {
        const expected = 'Пользователь';

        expect(getName(null, null)).toBe(expected);
    });
    it('only first name', () => {
        const expected = 'Alex';

        expect(getName('Alex', null)).toBe(expected);
    });
    it('only last name', () => {
        const expected = 'Clevertec';

        expect(getName(null, 'Clevertec')).toBe(expected);
    });
    it('positive', () => {
        const expected = 'Alex Clevertec';

        expect(getName('Alex', 'Clevertec')).toBe(expected);
    });
});

describe('is top left position', () => {
    const gap = 10;
    const modalWidth = 264;
    const maxModalHeight = 262;
    const viewportX = 768;
    const viewportY = 900;

    it('top left', () => {
        expect(
            isTopLeftPos(
                viewportX - modalWidth,
                viewportY - maxModalHeight,
                viewportX + gap,
                viewportY + gap,
            ),
        ).toBe(true);
    });
    it('bottom right', () => {
        expect(
            isTopLeftPos(viewportX - modalWidth, viewportY - maxModalHeight, viewportX, viewportY),
        ).toBe(false);
    });
});

describe('get favorite training type', () => {
    it('empty trainings', () => {
        expect(getFavoriteTrainingType([], trainingList)).toBe('random');
    });
    it('empty trainings list', () => {
        expect(getFavoriteTrainingType(userTraining, [])).toBe('random');
    });
    it('positive res', () => {
        expect(getFavoriteTrainingType(userTraining, trainingList)).toBe('legs');
    });
});

describe('expiration date fn', () => {
    it('today', () => {
        const date = new Date(today).toISOString();
        const expected = moment().format('DD.MM');

        expect(getExpirationDate(date)).toEqual(expected);
    });
    it('tomorrow', () => {
        const date = new Date(dayAfterTomorrow).toISOString();
        const expected = moment().add(1, 'days').format('DD.MM');

        expect(getExpirationDate(date)).toEqual(expected);
    });
    it('after four days', () => {
        const date = new Date(fourDaysLater).toISOString();
        const expected = moment().add(4, 'days').format('DD.MM');

        expect(getExpirationDate(date)).toEqual(expected);
    });
});
