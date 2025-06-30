import { http } from "../utils/http";
import { getAccessToken } from "../utils/jwt";
export default async function getProfile(){
    try{

        const response = await http.get('private/profile')
        return response.data
    }catch(error){
        console.log(error)
    }
}