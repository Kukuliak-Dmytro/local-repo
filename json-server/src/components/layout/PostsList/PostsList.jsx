import './PostsList.css'
import PostItem from '../../cards/PostItem/PostItem'
import { PostContext } from '../../../providers/PostProvider'
import { useContext } from 'react'
import { useState } from 'react'
import Pagination from '../Pagination/Pagination'
export default function PostsList(){
    const [posts, setPosts] = useContext(PostContext)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5
    const firstPostIndex = (currentPage - 1) * postsPerPage
    const lastPostIndex = firstPostIndex + postsPerPage
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex)
    return (
        <ul className='posts-list'>
            {
                currentPosts.map((post)=>{
                    return <PostItem key={post.id} post={post} />
                })
            }
            <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={posts.length} />    
        </ul>
    )
}