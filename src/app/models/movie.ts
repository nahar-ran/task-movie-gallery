import {Genre} from './genre';

export interface Movie {
    id?: string;
    title?: string;
    year?: number;
    runtime?: number;
    genres?: Genre[];
    director?: string;
    poster?: string;
}
