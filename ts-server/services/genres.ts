import client from "../utils/client";
import Genre from "../types/genres";
import { ObjectId } from "mongodb";

export async function getGenres(): Promise<Genre[]> {

    const genres = await client.collection<Genre>("genres").find({}).toArray();
    if (genres.length === 0) {
        throw new Error("No genres found");
    }
    return genres;

}
export async function getGenreById(id: string): Promise<Genre> {
    const foundGenre = await client.collection<Genre>("genres").findOne({ _id: new ObjectId(id) });
    if (!foundGenre) {
        throw new Error(`Genre with id ${id} not found`);
    }
    return foundGenre;
}
export async function createGenre(genre: Genre): Promise<Genre> {
    const result = await client.collection<Genre>("genres").insertOne(genre);
    return { ...genre, _id: result.insertedId as ObjectId };
}
export async function updateGenre(id: string, genre: Genre): Promise<Genre> {
    const updatedGenre = await client.collection<Genre>("genres").updateOne({ _id: new ObjectId(id) }, { $set: genre });
    return { ...genre, _id: new ObjectId(id) };
}

export async function deleteGenre(id: string): Promise<void> {
    await client.collection<Genre>("genres").deleteOne({ _id: new ObjectId(id) });
}