import Genre from "./genres";
import { ObjectId } from "mongodb";
export default interface Game {
    _id: ObjectId;
    title: string;
    developer: string;
    releaseYear: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "playing" | "completed";
    isFavorite: boolean;
}