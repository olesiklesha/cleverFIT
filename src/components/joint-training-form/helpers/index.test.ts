/* eslint-disable import/no-extraneous-dependencies */
import { isJointFormValid } from '@components/joint-training-form/helpers/index.ts';
import { describe, expect, it } from '@jest/globals';
import * as moment from 'moment';

import { JointWorkoutsFormProps } from '../../../models';

describe('is form valid', () => {
    it('no date', () => {
        const values: JointWorkoutsFormProps = {
            repeat: false,
            period: undefined,
            date: undefined,
            exercises: [
                {
                    name: 'Присяд',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
            ],
        };

        expect(isJointFormValid(values)).toBe(false);
    });

    it('no empty title', () => {
        const values: JointWorkoutsFormProps = {
            repeat: false,
            period: undefined,
            date: moment(),
            exercises: [
                {
                    name: 'Присяд',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
                {
                    name: '',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
            ],
        };

        expect(isJointFormValid(values)).toBe(false);
    });

    it('positive case', () => {
        const values: JointWorkoutsFormProps = {
            repeat: false,
            period: undefined,
            date: moment(),
            exercises: [
                {
                    name: 'Присяд',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
                {
                    name: 'Упражнение',
                    replays: 3,
                    approaches: 3,
                    weight: 10,
                },
            ],
        };

        expect(isJointFormValid(values)).toBe(true);
    });
});
