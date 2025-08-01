import { Request, Response } from "express";
import { createOrder } from "../services/orders";
import { defineError } from "../utils/error";
import Dish from "../models/dishes";
import Ingredient from "../models/ingredients";


const OrdersController = {
    createOrder: async (req: Request, res: Response) => {
        try{

            if(!req.body.items){
                return res.status(400).json({message:"Items are required"});
            }


            const dishesToOrder = await Dish.find({_id:{$in:req.body.items}});
            if(dishesToOrder.length !== req.body.items.length){
                return res.status(400).json({message:"Some dishes not found"});
            }


            const totalAmount = req.body.items.reduce((acc:number, item: any) => {
                const dish = dishesToOrder.find(d => d._id.toString() === item.dish);
                return acc + (dish?.price || 0) * item.quantity;
            }, 0);
            req.body.totalAmount = totalAmount;

            dishesToOrder.forEach(async(dish)=>{
                dish.ingredients.forEach(async(ingredient)=>{
                    const ingredientToOrder = await Ingredient.findById(ingredient);
                    if (!ingredientToOrder){
                        return res.status(400).json({message:"Some ingredients not found"});
                    }
                    if (ingredientToOrder.stock < 1){
                        return res.status(400).json({message:"Some ingredients not in stock"});
                    }
                    ingredientToOrder.stock -= 1;
                    await ingredientToOrder.save();
                });
            });
            const order = await createOrder({
                totalAmount: totalAmount,
                status: "pending",
                items: req.body.dishes
            });
            res.status(201).json(order);

        }catch(error){
            res.status(500).json({message:defineError(error as string)});
        }
    }
}
export default OrdersController;