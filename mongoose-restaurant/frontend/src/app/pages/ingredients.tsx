import {useIngredients} from "../../hooks/useIngredients";
import IngredientCard from "../../components/cards/IngredientCard";
import Input from "src/components/ui/Input";
import type Ingredient from "../../types/ingredients";
import { useCreateIngredient } from "../../hooks/useIngredients";
import useFormState from "src/hooks/useFormState";
import Pagination from "src/components/layouts/Pagination";
import { useState } from "react";
export default function Ingredients() {
    const PAGE_LIMIT=10;
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useIngredients(currentPage, PAGE_LIMIT);
    const [ingredient, setIngredient, handleChange]=useFormState<Ingredient>({_id:"", name:"", price:1, stock:1, updatedAt:new Date()});
    const {mutate:createIngredient}=useCreateIngredient();
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(ingredient);
        createIngredient(ingredient);
    }
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="flex flex-col items-center justify-center gap-2 mx-auto">
            <h1>Ingredients</h1>
            <form className="flex gap-2 items-end justify-between" onSubmit={handleSubmit}>
                <Input placeholder="Name"id="name"  label="Ingredient Name" className="border-1 border-amber-500" onChange={handleChange} value={ingredient.name} type="text" required></Input>
                <Input placeholder="Price"id="price" label="Price" className="border-1 border-amber-500" onChange={handleChange} value={ingredient.price} type="number" min={1} max={9999} required></Input>
                <Input placeholder="Stock"id="stock"  label="Stock"className="border-1 border-amber-500" onChange={handleChange} value={ingredient.stock} type="number" min={1} max={999} required></Input>
                <button className="cursor-pointer bg-amber-500 text-white px-4 py-2 rounded-md" type="submit">Create</button>
            </form>
            <ul className="flex flex-col gap-2 w-[900px]">
                {data.data.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </ul>
            <Pagination totalPages={data.totalPages} currentPage={data.currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}
