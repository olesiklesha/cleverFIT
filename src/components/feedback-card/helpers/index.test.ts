/* eslint-disable import/no-extraneous-dependencies */
import { getFormattedDateStr } from '@components/feedback-card/helpers/index.ts';
import { DateFormats } from '@constants/index.ts';
import { describe, expect, it } from '@jest/globals';
import * as moment from 'moment';

const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);

describe('format date', () => {
    it('today', () => {
        expect(getFormattedDateStr(new Date(today).toISOString())).toBe(
            moment(today).format(DateFormats.DATE_PICKER),
        );
    });
    it('dayAfterTomorrow', () => {
        expect(getFormattedDateStr(new Date(dayAfterTomorrow).toISOString())).toBe(
            moment(dayAfterTomorrow).format(DateFormats.DATE_PICKER),
        );
    });
    it('dayBeforeToday', () => {
        expect(getFormattedDateStr(new Date(dayBeforeToday).toISOString())).toBe(
            moment(dayBeforeToday).format(DateFormats.DATE_PICKER),
        );
    });
});
