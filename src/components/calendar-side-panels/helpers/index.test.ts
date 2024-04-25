/* eslint-disable import/no-extraneous-dependencies */
import {
    getNonEmptyTitle,
    getNonEmptyTitleExercises,
    getTrainingColor,
    TRAINING_COLORS,
} from '@components/calendar-side-panels/helpers/index.ts';
import { describe, expect, it } from '@jest/globals';

import { FormExerciseProps } from '../../../models';

const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strength' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

describe('get training color', () => {
    it('legs color', () => {
        expect(getTrainingColor(trainingList, 'Ноги')).toBe(TRAINING_COLORS.legs);
    });
    it('hands color', () => {
        expect(getTrainingColor(trainingList, 'Руки')).toBe(TRAINING_COLORS.hands);
    });
    it('strength color', () => {
        expect(getTrainingColor(trainingList, 'Силовая')).toBe(TRAINING_COLORS.strength);
    });
    it('back color', () => {
        expect(getTrainingColor(trainingList, 'Спина')).toBe(TRAINING_COLORS.back);
    });
    it('chest color', () => {
        expect(getTrainingColor(trainingList, 'Грудь')).toBe(TRAINING_COLORS.chest);
    });
});

describe('get non empty title', () => {
    it('empty', () => {
        expect(getNonEmptyTitle([])).toEqual([]);
    });
    it('default exercises params', () => {
        const values: FormExerciseProps[] = [
            {
                _id: '1',
                name: 'test',
                approaches: undefined,
                replays: undefined,
                weight: undefined,
            },
        ];
        const result = [
            {
                name: 'test',
                approaches: 1,
                replays: 1,
                weight: 0,
            },
        ];

        expect(getNonEmptyTitleExercises(values)).toEqual(result);
    });
    it('empty name', () => {
        const values: FormExerciseProps[] = [
            {
                _id: '1',
                name: 'test',
                approaches: undefined,
                replays: undefined,
                weight: undefined,
            },
            {
                _id: '2',
                name: '',
                approaches: undefined,
                replays: undefined,
                weight: undefined,
            },
        ];
        const result = [
            {
                name: 'test',
                approaches: 1,
                replays: 1,
                weight: 0,
            },
        ];

        expect(getNonEmptyTitleExercises(values)).toEqual(result);
    });
    it('positive case', () => {
        const values: FormExerciseProps[] = [
            {
                _id: '1',
                name: 'test',
                approaches: 1,
                replays: 1,
                weight: 1,
            },
            {
                _id: '2',
                name: 'test2',
                approaches: 1,
                replays: 1,
                weight: 1,
            },
        ];
        const result = [
            {
                name: 'test',
                approaches: 1,
                replays: 1,
                weight: 1,
            },
            {
                name: 'test2',
                approaches: 1,
                replays: 1,
                weight: 1,
            },
        ];

        expect(getNonEmptyTitleExercises(values)).toEqual(result);
    });
});
