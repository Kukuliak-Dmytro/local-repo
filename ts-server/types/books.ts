import Genre from "./genres";
import { ObjectId } from "mongodb";
export interface Book {
    _id: ObjectId;
    title: string;
    author: string;
    publishedYear: number;
    pages: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "reading" | "completed";
    isFavorite: boolean;
}