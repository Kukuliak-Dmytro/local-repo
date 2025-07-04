import { useState, useEffect } from "react"
import ProtectedRoute from "../../layout/ProtectedRoute/ProtectedRoute"
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import getFriends from "../../services/friendService"
import FriendCard from "../../compoents/cards/FriendCard"
export default function Friends(){
    const [friends, setFriends] = useState([])
    useEffect(()=>{
        const fetchFriends = async ()=>{
            const friends = await getFriends()
            setFriends(friends)
        }
        fetchFriends()
    },[])
    return(
        <ProtectedRoute>
            <PageWrapper>
                <h1>Friends</h1>
                <span style={{display:"flex", gap:"10px"}}>
                    {friends.map((friend)=>(
                        <FriendCard key={friend.id} friend={friend} />
                    ))}
                </span>
            </PageWrapper>
        </ProtectedRoute>
    )
}







