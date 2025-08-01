import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true   // Add timestamps for better tracking
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
