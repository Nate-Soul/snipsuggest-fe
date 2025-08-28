import type { Pagination } from "./common";
import type { StoredMovie } from "~/types/movies";

export interface IsFavourited {
    is_favourited: boolean;
};

export interface FavouriteResponse {
    data: StoredMovie[];
    pagination: Pagination;
    message?: string;
};