import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    totalAmount: { type: Number, required: true ,default: 0},
    status: { type: String, required: true, default: "pending" },
    items: [{
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
