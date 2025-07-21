import client from "../utils/mongoClient.js";
import { ObjectId } from "mongodb";

export async function getGenres(){
    const genres = await client.collection("genres").find({}).project({popularExamples:0}).toArray();
    return genres;
}

export async function getGenreById(id){
    const genre = await client.collection("genres").findOne(
        { _id: new ObjectId(String(id)) },
        { projection: { popularExamples: 0 } }
    );
    return genre;
}

export async function createGenre(genre){
    const result = await client.collection("genres").insertOne(genre);
    return result;
}

export async function updateGenre(id, genre){
    const result = await client.collection("genres").updateOne({_id: new ObjectId(String(id))}, {$set: genre});
    return result;
}

export async function deleteGenre(id){
    const result = await client.collection("genres").deleteOne({_id: new ObjectId(String(id))});
    return result;
}