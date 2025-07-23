import { ObjectId } from "mongodb";

export default interface Genre {
    _id: ObjectId;
    name: string;
    description: string;

}
