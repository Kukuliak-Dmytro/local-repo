import getCategoriesData from "../service/categories.js";

export async function getCategoriesHandler(req,res){
    try{
        const categories = await getCategoriesData()
        res.json(categories)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
export async function getCategoryByIdHandler(req,res){
    try{
        const {id} = req.params
        const allCategories = await getCategoriesData()
        const category = allCategories.find(category => category.id === parseInt(id))
        if(!category){
            res.status(404).json({error: 'Category not found'})
            return
        }
        res.json(category)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}