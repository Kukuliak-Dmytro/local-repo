import { useContext } from 'react'
import { ModalContext } from '../../../providers/ModalProvider'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import { updatePost } from '../../../services/postsServices'
import { PostContext } from '../../../providers/PostProvider'

export default function EditPostForm(){
    const { isOpen, setIsOpen, currentPost, setCurrentPost } = useContext(ModalContext)
    const [posts, setPosts] = useContext(PostContext)

    if (!currentPost) return null;

    const handleTitleChange = (e) => {
        setCurrentPost({ ...currentPost, title: e.target.value })
    }
    const handleContentChange = (e) => {
        setCurrentPost({ ...currentPost, content: e.target.value })
    }
    const handleSave = async () => {
        await updatePost(currentPost.id, currentPost)
        setIsOpen(false)
        setPosts(posts.map((post) => post.id === currentPost.id ? currentPost : post))
    }
    return(
        <form className='edit-post-form'>
            <Input type='text' placeholder='Title'  isEditable={true} value={currentPost.title} onChange={handleTitleChange} />
            <Input type='textarea' placeholder='Content' isEditable={true} value={currentPost.content} onChange={handleContentChange} />
            <Button onClick={handleSave}>Save</Button>    
        </form>
    )
}