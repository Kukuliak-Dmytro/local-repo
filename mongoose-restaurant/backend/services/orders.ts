import Dish from "../models/dishes";
import Order from "../models/orders";

export async function getOrders(min=0, max=100000){
    try{
        const orders = await Order.find({totalAmount:{$gte:min,$lte:max}}).populate("items.dish");
        return orders;
    }catch(error){
        throw error;
    }
}
export async function getOrderById(id:string){
    try{
        const order = await Order.findById(id);
        return order;
    }catch(error){
        throw error;
    }
}
export async function createOrder(order:typeof Order.schema.obj){
    try{
        const createdOrder = await Order.create(order);
        return createdOrder;
    }catch(error){
        throw error;
    }
}
export async function updateOrder(id:string, order:typeof Order.schema.obj){
    try{
        const updatedOrder = await Order.findByIdAndUpdate(id, {...order, $inc: { __v: 1 }}, { new: true, runValidators: true });
        return updatedOrder;
    }catch(error){
        throw error;
    }
}
export async function deleteOrder(id:string){
    try{
        await Order.findByIdAndDelete(id);
        return ({message: "Order deleted successfully"});
    }catch(error){
        throw error;
    }
}