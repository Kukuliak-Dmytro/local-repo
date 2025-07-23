import Genre from "./genres";
import { ObjectId } from "mongodb";
export interface Film {
    _id: ObjectId;
    title: string;
    director: string;
    releaseYear: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "watching" | "completed";
    isFavorite: boolean;
}