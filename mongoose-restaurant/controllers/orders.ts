import { Request, Response } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../services/orders";
import { defineError } from "../utils/error";
import Dish from "../models/dishes";
import Ingredient from "../models/ingredients";
import { getDishById } from "../services/dishes";


const OrdersController = {
    getOrders: async (req: Request, res: Response)=>{
        try{
            const {min, max} = req.query;
            
            // Handle undefined or invalid parameters
            const minAmount = min ? parseInt(min as string) : 0;
            const maxAmount = max ? parseInt(max as string) : 100000;
            
            // Validate that the parsed values are valid numbers
            if (isNaN(minAmount) || isNaN(maxAmount)) {
                return res.status(400).json({message: "Invalid min or max amount"});
            }
            
            const orders = await getOrders(minAmount, maxAmount);
            res.status(200).json(orders);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    getOrderById: async (req: Request, res: Response)=>{
        try{
            const order = await getOrderById(req.params.id);
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    createOrder: async (req: Request, res: Response) => {
        try{

            if(!req.body.items){
                return res.status(400).json({message:"Items are required"});
            }

            // Extract dish IDs from the items array
            const dishIds = req.body.items.map((item: any) => item.dish);

            const dishesToOrder = await Dish.find({_id:{$in:dishIds}});
            if(dishesToOrder.length !== req.body.items.length){
                return res.status(400).json({message:"Some dishes not found"});
            }

            const totalAmount = req.body.items.reduce((acc:number, item: any) => {
                const dish = dishesToOrder.find(d => d._id.toString() === item.dish);
                return acc + (dish?.price || 0) * item.quantity;
            }, 0);
            req.body.totalAmount = totalAmount;

            // Check and update ingredient stock
            for (const dish of dishesToOrder) {
                for (const ingredientId of dish.ingredients) {
                    const ingredientToOrder = await Ingredient.findById(ingredientId);
                    if (!ingredientToOrder){
                        return res.status(400).json({message:"Some ingredients not found"});
                    }
                    if (ingredientToOrder.stock < 1){
                        return res.status(400).json({message:"Some ingredients not in stock"});
                    }
                    ingredientToOrder.stock -= 1;
                    await ingredientToOrder.save();
                }
            }

            const order = await createOrder({
                totalAmount: totalAmount,
                status: "pending",
                items: req.body.items
            });
            res.status(201).json(order);

        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    changeOrderStatus: async (req: Request, res: Response)=>{
        try{
            const status = req.body.status;
            if(status!=='pending' && status!=='completed' && status!=='cancelled'){
                return res.status(400).json({message:"Invalid status"});
            }
            const order = await updateOrder(req.params.id, {status});
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    addItemToOrder: async (req: Request, res: Response)=>{
        try{
            const {id} = req.params;
            const {dishId, quantity }= req.body;
            const dish = await getDishById(dishId);
            if(!dish){
                return res.status(404).json({message:"Dish not found"});
            }

            for (const ingredientId of dish.ingredients) {
                const ingredientToOrder = await Ingredient.findById(ingredientId);
                if (!ingredientToOrder){
                    return res.status(400).json({message:"Some ingredients not found"});
                }
                if (ingredientToOrder.stock < 1){
                    return res.status(400).json({message:"Some ingredients not in stock"});
                }
                ingredientToOrder.stock -= 1;
                await ingredientToOrder.save();
            }

            const order = await getOrderById(id);
            if(!order){
                return res.status(404).json({message:"Order not found"});
            }
            if(quantity<=0){
                return res.status(400).json({message:"Quantity must be greater than 0"});
            }
            const existingItem = order.items.find((item:any)=>item.dish.toString()===dishId);
            if(existingItem){
                existingItem.quantity += quantity;
            }else{
                order.items.push({dish: dishId, quantity});
            }
            const totalAmount = order.items.reduce((acc:number, item:any)=>acc+(dish.price||0)*item.quantity, 0);
            order.totalAmount = totalAmount;
            await order.save();
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    deleteItemFromOrder: async (req: Request, res: Response)=>{
        try{
            const {id} = req.params;
            const {dishId} = req.body;
            const order = await getOrderById(id);
            if(!order){
                return res.status(404).json({message:"Order not found"});
            }
            const itemIndex = order.items.findIndex((item:any)=>item.dish.toString()===dishId);
            if(itemIndex===-1){
                return res.status(404).json({message:"Item not found in order"});
            }
            order.items.splice(itemIndex, 1);
            const totalAmount = order.items.reduce((acc:number, item:any)=>acc+(item.dish.price||0)*item.quantity, 0);
            order.totalAmount -= totalAmount;
            await order.save();
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    },
    deleteOrder: async (req: Request, res: Response)=>{
        try{
            const order = await deleteOrder(req.params.id);
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({message:defineError(error)});
        }
    }
}
export default OrdersController;