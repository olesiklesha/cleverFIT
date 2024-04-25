import { JointWorkoutsFormProps } from '../../../models';

export const isJointFormValid = (values: JointWorkoutsFormProps) => {
    const { date, exercises } = values;

    if (!date) return false;
    const filteredExercises = exercises.filter((el) => el && el.name);

    return exercises.length > 0 && filteredExercises.length === exercises.length;
};
