/* eslint-disable import/no-extraneous-dependencies */
import { getPreparedTrainingBodyToSetInvite } from '@components/workouts-modals/joint-training-side-panel/helpers/index.ts';
import { describe, expect, it } from '@jest/globals';
import * as moment from 'moment';

import {
    JointWorkoutsFormProps,
    PartnerProps,
    PostTrainingBodyWithParameters,
} from '../../../../models';

describe('get prepared training body to set invite', () => {
    const partner: PartnerProps = {
        id: '65fb234f77536b7e4569acfe',
        name: 'Шунто Дмитрий',
        trainingType: 'Ноги',
        avgWeightInWeek: 2,
        imageSrc:
            'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
        inviteId: '6603fd9268b4b7f6e631d0bb',
        status: 'accepted',
    };

    it('no partner', () => {
        const values: JointWorkoutsFormProps = {
            repeat: false,
            period: 1,
            date: moment(),
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 0,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        expect(getPreparedTrainingBodyToSetInvite(values, null)).toEqual({});
    });

    it('with params', () => {
        const values: JointWorkoutsFormProps = {
            repeat: true,
            period: 2,
            date: moment(),
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 0,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        const expected: PostTrainingBodyWithParameters = {
            date: values.date!.toISOString(),
            isImplementation: false,
            name: partner.trainingType,
            parameters: {
                repeat: true,
                period: 2,
            },
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 0,
                    replays: 1,
                    approaches: 1,
                    isImplementation: false,
                },
            ],
        };

        expect(getPreparedTrainingBodyToSetInvite(values, partner)).toEqual(expected);
    });
    it('without params', () => {
        const values: JointWorkoutsFormProps = {
            repeat: false,
            period: undefined,
            date: moment(),
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 0,
                    replays: 1,
                    approaches: 1,
                },
            ],
        };

        const expected: PostTrainingBodyWithParameters = {
            date: values.date!.toISOString(),
            isImplementation: false,
            name: partner.trainingType,
            exercises: [
                {
                    name: 'Упражнение',
                    weight: 0,
                    replays: 1,
                    approaches: 1,
                    isImplementation: false,
                },
            ],
        };

        expect(getPreparedTrainingBodyToSetInvite(values, partner)).toEqual(expected);
    });
});
