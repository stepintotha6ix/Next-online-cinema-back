import { MovieModel } from './../movie/movie.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    password: string;
    isAdmin: boolean;
    favorites?: Ref<MovieModel>[];
}
