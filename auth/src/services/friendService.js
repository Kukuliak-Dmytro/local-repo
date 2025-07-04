import { http } from "../utils/http";

export default async function getFriends(){
    try{
        const response = await http.get('private/friends')
        return response.data
    }
    catch(error){
        console.log(error)
    }
}