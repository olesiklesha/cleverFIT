/* eslint-disable import/no-extraneous-dependencies */
import {
    compare,
    getFormattedTableData,
    getPeriodStr,
} from '@components/workouts-table/helpers/index.ts';
import { PERIODS } from '@constants/index.ts';
import { describe, expect, it } from '@jest/globals';

import { TrainingProps, WorkoutsFormData } from '../../../models';

const today = new Date().setDate(new Date().getDate());

describe('get formatted table data', () => {
    const trainings: TrainingProps[] = [
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
    ];

    it('test', () => {
        const expected = [
            {
                name: 'Ноги',
                date: today,
                period: 6,
                isImplementation: false,
                id: '1',
            },
        ];

        expect(getFormattedTableData(trainings)).toEqual(expected);
    });
});

describe('get period string', () => {
    it('undefined period', () => {
        expect(getPeriodStr(undefined)).toBe(undefined);
    });
    it('period 1', () => {
        expect(getPeriodStr(1)).toBe(PERIODS[0]);
    });
    it('period 2', () => {
        expect(getPeriodStr(2)).toBe(PERIODS[1]);
    });
    it('period 3', () => {
        expect(getPeriodStr(3)).toBe(PERIODS[2]);
    });
    it('period 4', () => {
        expect(getPeriodStr(4)).toBe(PERIODS[3]);
    });
    it('period 5', () => {
        expect(getPeriodStr(5)).toBe(PERIODS[4]);
    });
    it('period 6', () => {
        expect(getPeriodStr(6)).toBe(PERIODS[5]);
    });
    it('period 7', () => {
        expect(getPeriodStr(7)).toBe(PERIODS[6]);
    });
});

describe('compare fn', () => {
    const data: WorkoutsFormData[] = [
        {
            name: 'Ноги',
            date: new Date(today).toISOString(),
            period: 1,
            isImplementation: false,
            id: '1',
        },
        {
            name: 'Руки',
            date: new Date(today).toISOString(),
            period: 2,
            isImplementation: false,
            id: '2',
        },
        {
            name: 'Силовая',
            date: new Date(today).toISOString(),
            period: undefined,
            isImplementation: false,
            id: '3',
        },
    ];

    it('test', () => {
        const expected = [
            {
                name: 'Силовая',
                date: new Date(today).toISOString(),
                period: undefined,
                isImplementation: false,
                id: '3',
            },
            {
                name: 'Руки',
                date: new Date(today).toISOString(),
                period: 2,
                isImplementation: false,
                id: '2',
            },
            {
                name: 'Ноги',
                date: new Date(today).toISOString(),
                period: 1,
                isImplementation: false,
                id: '1',
            },
        ];

        expect(data.sort(compare)).toEqual(expected);
    });
});
