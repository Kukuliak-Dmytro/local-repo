import {useIngredients} from "../../hooks/useIngredients";
import IngredientCard from "../../components/cards/IngredientCard";
import Input from "src/components/ui/Input";
import { useState } from "react";
export default function Ingredients() {
    const {data, isLoading} = useIngredients();
    const [ingredient, setIngredient]=useState("")
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    return (
        <div className="flex flex-col items-center justify-center gap-2 mx-auto">
            <h1>Ingredients</h1>
            <form className="flex gap-2">
                <Input isEditing={true} value={ingredient} onChange={(e)=>setIngredient(e.target.value)}></Input>
                <button className="cursor-pointer bg-amber-500 text-white px-4 py-2 rounded-md" type="submit">Create</button>
            </form>
            <ul className="flex flex-col gap-2 w-[900px]">
                {data.data.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </ul>
        </div>
    )
}
