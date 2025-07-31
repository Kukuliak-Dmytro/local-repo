import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;