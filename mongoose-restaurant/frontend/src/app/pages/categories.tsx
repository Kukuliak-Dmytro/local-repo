import { useCategories, useCreateCategory, useEditCategory } from "../../hooks/useCategories";
import CategoryCard from "src/components/cards/CategoryCard";
export default function Categories(){
    const {data, isLoading}=useCategories();
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    return (
        <div className="flex flex-col items-center justify-center gap-2 mx-auto">
           <ul className="flex flex-col gap-2 w-[900px]">
                {data.data.map((category) => (
                    <CategoryCard key={category._id} Category={category} />
                ))}
            </ul>
        </div>
    )
}