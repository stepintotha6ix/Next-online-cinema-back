export declare class Parameters {
    year: number;
    duration: number;
    country: number;
}
export declare class CreateMovieDto {
    poster: string;
    bigPoster: string;
    title: string;
    description: string;
    slug: string;
    videoUrl: string;
    genres: string[];
    actors: string[];
    isSendTelegram?: boolean;
    parameters?: Parameters;
}
