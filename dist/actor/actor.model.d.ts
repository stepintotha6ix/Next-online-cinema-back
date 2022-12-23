import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class ActorModel extends TimeStamps {
    name: string;
    slug: string;
    photo: string;
}
