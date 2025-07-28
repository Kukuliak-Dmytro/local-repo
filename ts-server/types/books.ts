import Genre from "./genres";

export interface Book {
    _id: number;
    title: string;
    author: string;
    publishedYear: number;
    pages: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "reading" | "completed";
    isFavorite: boolean;
}