import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ActorModel } from 'src/actor/actor.model';
import { GenreModel } from 'src/genre/genre.model';
export interface MovieModel extends Base {
}
export declare class Parameters {
    year: number;
    duration: number;
    country: string;
}
export declare class MovieModel extends TimeStamps {
    poster: string;
    bigPoster: string;
    title: string;
    slug: string;
    videoUrl: string;
    rating?: number;
    parameters?: Parameters;
    countOpened?: number;
    genres: Ref<GenreModel>[];
    actors: Ref<ActorModel>[];
    isSendTelegram?: boolean;
}
