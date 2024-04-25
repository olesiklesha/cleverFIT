import { getNonEmptyTitleExercises } from '@components/calendar-side-panels/helpers';

import {
    JointWorkoutsFormProps,
    Nullable,
    PartnerProps,
    PeriodType,
    PostTrainingBodyWithParameters,
} from '../../../../models';

export const getPreparedTrainingBodyToSetInvite = (
    formValues: JointWorkoutsFormProps,
    partner: Nullable<PartnerProps>,
): PostTrainingBodyWithParameters => {
    if (!partner) return {} as PostTrainingBodyWithParameters;

    const { trainingType } = partner;
    const { date, exercises, repeat, period } = formValues;

    const preparedExercises = getNonEmptyTitleExercises(exercises).map((el) => ({
        ...el,
        isImplementation: false,
    }));

    const result = {
        name: trainingType,
        date: date?.toISOString(),
        isImplementation: false,
        exercises: preparedExercises,
    } as PostTrainingBodyWithParameters;

    return repeat
        ? ({
              ...result,
              parameters: {
                  repeat,
                  period: period as PeriodType,
              },
          } as PostTrainingBodyWithParameters)
        : result;
};
