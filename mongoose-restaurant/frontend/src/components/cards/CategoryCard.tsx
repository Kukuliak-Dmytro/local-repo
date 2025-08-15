import type Category from "../../types/categories";
import Input from "../ui/Input";
import useFormState from "src/hooks/useFormState";
import { useState } from "react";
import { CiEdit, CiSaveDown2, CiTrash } from "react-icons/ci";
import { useEditCategory, useDeleteCategory } from "../../hooks/useCategories";
import { MdCancelPresentation } from "react-icons/md";

export default function CategoryCard({ Category }: { Category: Category }) {
    const {mutate:editCategory}=useEditCategory();
    const {mutate:deleteCategory}=useDeleteCategory();
    const [category, setCategory, handleChange] = useFormState<Category>(Category);
    const [isEditing, setIsEditing] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sent data: ", category);
        setIsEditing(false);
        editCategory(category);
    }
    return (
        <form onSubmit={handleSubmit } className="flex gap-2 items-end justify-between bg-gray-200 p-2 rounded-md">
            <span className="flex gap-2 items-end justify-between">
                <Input label="Name" placeholder="Category name" className="font-semibold w-[250px]" id="name" onChange={handleChange}  value={category.name} isEditing={isEditing} ></Input>
                <Input  width="w-[500px]"label="Description" placeholder="Category description" className="max-w-[600px]" id="description" onChange={handleChange} value={category.description} isEditing={isEditing} ></Input>
            </span>
            <span className="flex gap-2 items-center justify-center">
                {isEditing ? <span className="flex gap-2">
                    <button  className="h-[40px] cursor-pointer bg-green-400 text-white px-2 py-1 rounded-md" title="Save" type="submit"><CiSaveDown2 size={24} className="font-bold" /></button>
                    <button className="h-[40px] cursor-pointer bg-red-400 text-white px-2 py-1 rounded-md" onClick={() => setIsEditing(false)} type="button"><MdCancelPresentation size={24} className="font-bold" /></button>

                </span> :
                    <button className="h-[40px] cursor-pointer bg-blue-400 text-white px-2 py-1 rounded-md" onClick={() => setIsEditing(true)} type="button"><CiEdit size={24} className="font-bold" /></button>}
                <button  className="h-[40px] cursor-pointer bg-red-400 text-white px-2 py-1 rounded-md" onClick={() => deleteCategory(Category._id)} type="button"><CiTrash size={24} className="font-bold" /></button>
         
            </span>
            

        </form>
    )
}