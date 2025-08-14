export interface RatingValue {
    value: number;
};

export interface RatingResponse {
    id: number;
    user_id: number;
    movie_id: number;
    value: number;
    timestamp: string;
};