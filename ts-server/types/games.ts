import Genre from "./genres";

export default interface Game {
    _id: number;
    title: string;
    developer: string;
    releaseYear: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "playing" | "completed";
    isFavorite: boolean;
}