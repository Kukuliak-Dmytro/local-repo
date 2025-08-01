import Dish from "../models/dishes";
import Order from "../models/orders";

export async function createOrder(order:typeof Order.schema.obj){
    try{
        const createdOrder = await Order.create(order);
        return createdOrder;
    }catch(error){
        throw error;
    }
}