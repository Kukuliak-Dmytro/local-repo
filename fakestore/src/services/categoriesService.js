import axiosClient from "../utils/http"

export default async function getCategories(){
    try{
        const response = await axiosClient.get('/categories')
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}