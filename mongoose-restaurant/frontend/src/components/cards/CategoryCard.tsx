import type Category from "../../types/categories";
import Input from "../ui/Input";
import useFormState from "src/hooks/useFormState";
import { useState } from "react";
export default function CategoryCard({ Category }: { Category: Category }) {
    const [category, setCategory, handleChange] = useFormState<Category>(Category);
    const [isEditing, setIsEditing] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sent data: ", category);
        setIsEditing(false);
    }
    return (
        <form onSubmit={handleSubmit } className="flex gap-2 items-center justify-between bg-gray-200 p-2 rounded-md">
            <span className="flex gap-2 items-center justify-between">
                <Input label="Name" placeholder="Category name" className="font-semibold text-lg" id="name" onChange={handleChange} value={category.name} isEditing={isEditing} ></Input>
                <Input  width="w-[500px]"label="Description" placeholder="Category description" className="max-w-[600px]" id="description" onChange={handleChange} value={category.description} isEditing={isEditing} ></Input>
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