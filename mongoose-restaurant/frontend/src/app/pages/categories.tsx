import { useCategories, useCreateCategory, useEditCategory } from "../../hooks/useCategories";
import CategoryCard from "src/components/cards/CategoryCard";
import Input from "src/components/ui/Input";
import useFormState from "src/hooks/useFormState";
import type Category from "src/types/categories";
import Pagination from "src/components/layouts/Pagination";
import { useState } from "react";
export default function Categories() {
    const PAGE_LIMIT=10;
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useCategories(currentPage, PAGE_LIMIT);
    const [category, setCategory, handleChange] = useFormState<Category>(
        {
            _id: "",
            name: "",
            description: ""
        });
    const {mutate:createCategory}=useCreateCategory();
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(category)
        setCategory({_id:"",name:"",description:""})
        createCategory(category)
    }


    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
      
    return (
        <div className="flex flex-col items-center justify-center gap-2 mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-between mt-16 mb-8">
                <Input className="border-1 border-amber-500" id="name" value={category.name} onChange={handleChange} placeholder="Category name"></Input>
                <Input className="border-1 border-amber-500" id="description" value={category.description} onChange={handleChange} placeholder="Category description"></Input>
                <button className="cursor-pointer bg-amber-500 text-white px-4 py-2 rounded-md" type="submit">Create</button>
            </form>
            <ul className="flex flex-col gap-2 w-[900px]">
                {data.data.map((category) => (
                    <CategoryCard key={category._id} Category={category} />
                ))}
            </ul>
            <Pagination totalPages={data.totalPages} currentPage={data.currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}