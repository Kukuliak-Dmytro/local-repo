import { createContext } from 'react'
import { useState } from 'react'
export const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  return (
    <ModalContext.Provider value={[isOpen, setIsOpen, currentPost, setCurrentPost]}>
      {children}
    </ModalContext.Provider>
  )
}   