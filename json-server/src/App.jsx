import { useState } from 'react'
import './App.css'
import { getAllPosts, createPost } from './services/postsServices'
import { useEffect } from 'react'
import { useContext } from 'react'
import { PostContext } from './providers/PostProvider'
import PostsList from './components/layout/PostsList/PostsList'
import Button from './components/ui/Button/Button'
function App() {
  const [count, setCount] = useState(0)
  const [posts, setPosts] = useContext(PostContext)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const getPosts = async () => {
    const postsData = await getAllPosts()
    console.log(postsData)
    setPosts(postsData)
  }
  const hadnleSubmit =(e)=>{
    e.preventDefault()
    createPost(formData)
  setPosts([...posts, formData])
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
        <input type="text" name="title" id="title" placeholder='Title' value={formData.title} onChange={(e)=>{
          setFormData({...formData, title: e.target.value})
        }} />
        <input type="text" name="content" id="content" placeholder='Content' value={formData.content} onChange={(e)=>{
          setFormData({...formData, content: e.target.value})
        }} />
        <Button type='submit'>Create Post</Button>
      </form>
      <PostsList />
    </div>
  )
}

export default App
