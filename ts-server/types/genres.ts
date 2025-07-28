import { ObjectId } from "mongodb";

export default interface Genre {
    _id: number;
    name: string;
    description: string;
}
