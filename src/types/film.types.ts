import { Timestamp } from "firebase/firestore";


export interface FilmData {
    film_id: string;
    poster?: string;
    title: string;
    date: string;
    slug: string;
    type: FilmType;
    overview?: string;
}

export type FilmType = 'movie' | 'tv';

export interface FilmBookmarkDTO extends FilmData {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
