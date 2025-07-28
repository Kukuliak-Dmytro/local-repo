import { MongoClient, Collection, Document } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGODB_CONNECTION_STRING!;
const cl = new MongoClient(URL);

const dbName = 'home_lib'

const client = cl.db(dbName);

// Helper function to get typed collections with number IDs
export function getCollection<T extends Document>(name: string): Collection<T> {
    return client.collection<T>(name);
}

export default client;