/* eslint-disable import/no-extraneous-dependencies */
import {
    getTrainingNameOptions,
    isFormValid,
} from '@components/workouts-side-panel-form/helpers/index.ts';
import { describe, expect, it } from '@jest/globals';
import * as moment from 'moment';

import { WorkoutsFormProps } from '../../../models';

const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strength' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

describe('get trainings name options', () => {
    it('test', () => {
        const expected = [
            { value: 'Ноги', label: 'Ноги' },
            { value: 'Руки', label: 'Руки' },
            { value: 'Силовая', label: 'Силовая' },
            { value: 'Спина', label: 'Спина' },
            { value: 'Грудь', label: 'Грудь' },
        ];

        expect(getTrainingNameOptions(trainingList)).toEqual(expected);
    });
});

describe('is form valid', () => {
    it('no date', () => {
        const values: WorkoutsFormProps = {
            date: undefined,
            period: undefined,
            repeat: false,
            trainingName: 'ноги',
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 1,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        expect(isFormValid(values)).toBe(false);
    });
    it('no training name', () => {
        const values: WorkoutsFormProps = {
            date: moment(),
            period: undefined,
            repeat: false,
            trainingName: undefined,
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 1,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        expect(isFormValid(values)).toBe(false);
    });
    it('no exercises', () => {
        const values: WorkoutsFormProps = {
            date: moment(),
            period: undefined,
            repeat: false,
            trainingName: 'ноги',
            exercises: [
                {
                    name: '',
                    weight: 1,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        expect(isFormValid(values)).toBe(false);
    });
    it('positive case', () => {
        const values: WorkoutsFormProps = {
            date: moment(),
            period: undefined,
            repeat: false,
            trainingName: 'ноги',
            exercises: [
                {
                    name: 'test',
                    weight: 1,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        expect(isFormValid(values)).toBe(true);
    });
});
