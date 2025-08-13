import type Ingredient from "src/types/ingredients";
import Input from "../ui/Input";
import { useState } from "react";
import { useEditIngredient } from "../../hooks/useIngredients";
import useFormState from "../../hooks/useFormState";
export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData, handleChange] = useFormState<Ingredient>(ingredient);
    const {mutate:editIngredient} = useEditIngredient();
    const handleSave=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsEditing(false);
        console.log("Sent data: ",formData);
        editIngredient({...formData, _id:ingredient._id, updatedAt:ingredient.updatedAt} as Ingredient);
    }
    return (
        <form onSubmit={handleSave} className='flex justify-between items-center gap-2 w-full p-2 rounded-md shadow-md bg-foreground text-text' key={ingredient._id}>
            <span className="flex justify-between gap-2">
                <Input id='name' label="Name" className="font-semibold text-lg" isEditing={isEditing} value={formData.name} type="text" onChange={handleChange} />
                <Input id='price' label="Price" className='max-w-[100px]' isEditing={isEditing}  value={formData.price} type="number" onChange={handleChange} />
                <Input id='stock'  label="Stock" className='max-w-[100px]' isEditing={isEditing}  value={formData.stock} type="number" onChange={handleChange} />
            </span>
            <span className="flex gap-2 items-center justify-center">
                {isEditing ? <span className="flex gap-2"> 
                    <button type='submit' className="cursor-pointer bg-green-400 text-white px-4 py-1 rounded-md">Save</button>
                    <button className="cursor-pointer bg-red-400 text-white px-4 py-1 rounded-md" onClick={() => setIsEditing(false)}>Cancel</button>

                </span> :
                <button className="cursor-pointer bg-blue-400 text-white px-4 py-1 rounded-md" onClick={() => setIsEditing(true)}>Edit</button>}
            </span>
        </form>
    )
}