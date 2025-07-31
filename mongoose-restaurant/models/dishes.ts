import mongoose from "mongoose";
import { Schema } from "mongoose";

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    categories:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        required: true,
    },
    ingredients: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        }],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;