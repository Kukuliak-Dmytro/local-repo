import http from "../utils/http"
import { useMutation, useQuery } from "@tanstack/react-query"
export default function useInvite(){
    const {mutate:inviteMutation}=useMutation({
        mutationKey:['invite'],
        mutationFn: async(email)=>{
            try{
                const response = await http.post('/invite',{invitedUserEmail:email})
                console.log("Invite sent successfully")
                console.log(response.data)
                return response.data
            }
            catch(e){
                console.error(e.message)
            }
        }
        
    })
    const {data:invites}=useQuery({
        queryKey:['invites'],
        queryFn:async()=>{
            const response = await http.get('/invites')
            console.log(response.data)
            return response.data
        }
    })
    return {inviteMutation, invites}
}