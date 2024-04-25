/* eslint-disable import/no-extraneous-dependencies */
import {
    getCurTraining,
    getEditTrainingBody,
    getFormattedStr,
    getTrainingsForDate,
    isPast,
} from '@components/training-modals/helpers/index.ts';
import { DateFormats } from '@constants/index.ts';
import { describe, expect, it } from '@jest/globals';
import * as moment from 'moment';

import { NewTrainingProps, TrainingProps } from '../../../models';

const today = new Date().setDate(new Date().getDate());
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);

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

describe('get formatted str', () => {
    it('null date', () => {
        expect(getFormattedStr(null)).toBe('date');
    });

    it('date str', () => {
        const date = new Date().toISOString();

        expect(getFormattedStr(date)).toBe(moment(date).format(DateFormats.DATE_PICKER));
    });

    it('timestamp', () => {
        const date = Date.now();

        expect(getFormattedStr(date)).toBe(moment(date).format(DateFormats.DATE_PICKER));
    });
});

describe('is past', () => {
    const today = new Date().setDate(new Date().getDate());
    const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
    const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);

    it('past', () => {
        expect(isPast(new Date(dayBeforeToday).toISOString())).toEqual(true);
    });
    it('current', () => {
        expect(isPast(new Date(today).toISOString())).toEqual(true);
    });
    it('future', () => {
        expect(isPast(new Date(dayAfterTomorrow).toISOString())).toEqual(false);
    });
    it('date null', () => {
        expect(isPast(null)).toEqual(true);
    });
});

describe('get trainings for date', () => {
    it('no date', () => {
        expect(getTrainingsForDate(null, userTraining)).toEqual([]);
    });

    it('positive case', () => {
        const date = new Date(today).toISOString();

        const expected = [
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
        ];

        expect(getTrainingsForDate(date, userTraining)).toEqual(expected);
    });
});

describe('get current training', () => {
    it('null result', () => {
        const date = new Date(today).toISOString();

        expect(getCurTraining('Силовая', date, userTraining)).toBe(null);
    });
    it('test', () => {
        const date = new Date(today).toISOString();

        const expected = {
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
        };

        expect(getCurTraining('Ноги', date, userTraining)).toEqual(expected);
    });
});

describe('get edit training body', () => {
    it('change in future', () => {
        const training = userTraining[0];

        const changed: NewTrainingProps = {
            name: 'Ноги',
            date: today,
            exercises: [
                {
                    _id: '1',
                    name: 'Присяд',
                    replays: 3,
                    weight: 50,
                    approaches: 10,
                },
            ],
        };

        const expected = {
            _id: '1',
            name: 'Ноги',
            date: new Date(today).toISOString(),
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
            ],
        };

        expect(getEditTrainingBody(training, changed, false)).toEqual(expected);
    });
    it('change in past', () => {
        const training = userTraining[0];

        const changed: NewTrainingProps = {
            name: 'Ноги',
            date: today,
            exercises: [
                {
                    _id: '1',
                    name: 'Присяд',
                    replays: 3,
                    weight: 50,
                    approaches: 10,
                },
            ],
        };

        const expected = {
            _id: '1',
            name: 'Ноги',
            date: new Date(today).toISOString(),
            isImplementation: true,
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
            ],
        };

        expect(getEditTrainingBody(training, changed, true)).toEqual(expected);
    });
});
