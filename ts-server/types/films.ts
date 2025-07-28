import Genre from "./genres";

export interface Film {
    _id: number;
    title: string;
    director: string;
    releaseYear: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "watching" | "completed";
    isFavorite: boolean;
}