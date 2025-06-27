import './PostItem.css'
import { Link } from 'react-router'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import { useState } from 'react'
import { updatePost } from '../../../services/postsServices'
import { deletePost } from '../../../services/postsServices'
import { PostContext } from '../../../providers/PostProvider'
import { useContext } from 'react'
import { ModalContext } from '../../../providers/ModalProvider'
export default function PostItem({ post }) {
    const [postData, setPostData] = useState(post)
    const [posts, setPosts] = useContext(PostContext)
    const [isOpen, setIsOpen] = useContext(ModalContext)
    const [currentPost, setCurrentPost] = useContext(ModalContext)
    const [isEditing, setIsEditing] = useState(false)
    const handleEdit = () => {
        setIsEditing(true)
        setIsOpen(true)
        setCurrentPost(post)
    }
    const handleDelete = async () => {
        await deletePost(postData.id)
        setPosts(posts.filter((post) => post.id !== postData.id))
    }
    return (

        <li className='post-item'>
            <Link to={'/posts/' + post.id} rel="prefetch" >
                View
            </Link>
            <span className='post-item-title'>
                <Input type='text' value={post.title} isEditable={isEditing} />
                <span className='post-item-buttons'>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </span>
            </span>
            <span className="post-item-content">
                <Input type='textarea' value={post.content} isEditable={isEditing}  />
            </span>

        </li>

    )
}