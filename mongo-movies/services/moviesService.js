import client from "../utils/mongoClient.js";
import { ObjectId } from "mongodb";

export async function getMovies(){
    const movies = await client.collection("movies").find({}).toArray();
    return movies;
}

export async function getMovieById(id){
    const movie = await client.collection("movies").findOne({ _id: new ObjectId(String(id)) });
    return movie;
}

export async function createMovie(movie){
    const result = await client.collection("movies").insertOne(movie);
    return result;
}

export async function updateMovie(id, movie){
    const result = await client.collection("movies").updateOne({_id: new ObjectId(String(id))}, {$set: movie});
    return result;
}

export async function deleteMovie(id){
    const result = await client.collection("movies").deleteOne({_id: new ObjectId(String(id))});
    return result;
}

