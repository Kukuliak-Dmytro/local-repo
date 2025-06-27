import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PostsPage from './pages/Posts/PostsPage.jsx'
import { PostProvider } from './providers/PostProvider.jsx'
import { ModalProvider } from './providers/ModalProvider.jsx'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import ModalWrapper from './components/Modal/ModalWrapper/ModalWrapper.jsx'
import PostById from './pages/PostById/PostById.jsx'
import EditPostForm from './components/Modal/EditPostForm/EditPostForm.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/posts' element={<PostsPage />}></Route>
            <Route path='/posts/:id' element={<PostById />}></Route>
          </Routes>
          <ModalWrapper>
            <EditPostForm />
          </ModalWrapper>
        </BrowserRouter>
      </ModalProvider>
    </PostProvider>
  </StrictMode>,
)
