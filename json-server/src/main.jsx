import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PostsPage from './pages/Posts/PostsPage.jsx'
import { PostProvider } from './providers/PostProvider.jsx'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import PostById from './pages/PostById/PostById.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <BrowserRouter>
      <Routes>
         <Route path='/posts' element={<PostsPage/>}></Route>
         <Route path='/posts/:id' element={<PostById/>}></Route>
      </Routes>
      </BrowserRouter>
    </PostProvider>
  </StrictMode>,
)
