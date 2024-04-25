import { Nullable } from '.';

export type FeedbackObj = {
    id: string;
    fullName: Nullable<string>;
    imageSrc: Nullable<string>;
    message: Nullable<string>;
    rating: RatingType;
    createdAt: string;
};

export type NewFeedbackObj = Omit<FeedbackObj, 'fullName' | 'imageSrc' | 'createdAt' | 'id'>;

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5;
