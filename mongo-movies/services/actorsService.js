import client from "../utils/mongoClient.js";
import { ObjectId } from "mongodb";

export async function getActors(){
    const actors = await client.collection("actors").find({}).project({popularExamples:0}).toArray();
    return actors;
}

export async function getActorById(id){
    const actor = await client.collection("actors").findOne(
        { _id: new ObjectId(String(id)) },
        { projection: { popularExamples: 0 } }
    );
    return actor;
}

export async function createActor(actor){
    const result = await client.collection("actors").insertOne(actor);
    return result;
}

export async function updateActor(id, actor){
    const result = await client.collection("actors").updateOne({_id: new ObjectId(id)}, {$set: actor});
    return result;
}

export async function deleteActor(id){
    const result = await client.collection("actors").deleteOne({_id: new ObjectId(id)});
    return result;
}