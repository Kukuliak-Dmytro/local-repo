import { useState } from 'react'
import './PostsPage.css'
import { getAllPosts, createPost } from '../../services/postsServices'
import { useEffect } from 'react'
import { useContext } from 'react'
import { PostContext } from '../../providers/PostProvider'
import PostsList from '../../components/layout/PostsList/PostsList'
import Button from '../../components/ui/Button/Button'
function App() {
  const [posts, setPosts] = useContext(PostContext)

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const getPosts = async () => {
    const postsData = await getAllPosts()
    postsData.reverse()
    console.log(postsData)
    setPosts(postsData)
  }
  const hadnleSubmit = async (e) => {
    e.preventDefault()
    await createPost({ ...formData, created_at: new Date() })
    // setPosts([...posts, formData])
    await getPosts()
    setFormData({
      title: '',
      content: ''
    })  

  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className='app-wrapper'>
      <h1>Posts</h1>
      <form className='create-post' onSubmit={hadnleSubmit}>
        <input required type="text" name="title" id="title" placeholder='Title' value={formData.title} onChange={(e) => {
          setFormData({ ...formData, title: e.target.value })
        }} />
        <input required type="text" name="content" id="content" placeholder='Content' value={formData.content} onChange={(e) => {
          setFormData({ ...formData, content: e.target.value })
        }} />
        <Button type='submit'>Create Post</Button>
      </form>
      <PostsList />
    </div>
  )
}

export default App
