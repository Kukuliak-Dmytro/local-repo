import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/ui/Button/Button'
import { List } from './components/ui/List/List'
import Modal from './components/layout/Modal/Modal'
import ModalText from './components/layout/Modal/ModalText'
import ModalConfirm from './components/layout/Modal/ModalConfirm'
function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  let objectList = [
    {
      id: 1,
      title: "Item 1",
      description: "This is the first item",
      buttonText: "Click Me 1!"
    },
    {
      id: 2,
      title: "Item 2",
      description: "This is the second item",
      buttonText: "Click Me 2!"
    },
    {
      id: 3,
      title: "Item 3",
      description: "This is the third item",
      buttonText: "Click Me 3!"
    }
  ]


  const decrement = (amount) => {
    setCount((count) => { return count - amount })
  }
  const reset = () => {
    setCount(0);
  }
  const increment = (amount) => {
    setCount((count) => count + amount);

  }
  const confirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
  }
  const decline = () => {
    console.log("Declined!");
    setIsOpen(false);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="counter">
          <Button onClick={() => { decrement(1) }}>-1</Button>
          <Button onClick={() => { decrement(5) }}>-5</Button>
          <p onClick={reset} >{count}</p>
          <Button onClick={() => { increment(5) }}>+1</Button>
          <Button onClick={() => { increment(5) }}>+5</Button>

        </div>
        <Button onClick={toggleModal}>Open Modal</Button>

        <List objectList={objectList}></List>
      </div>
      <Modal opened={isOpen} toggleModal={toggleModal}>
        <ModalConfirm yes={confirm} decline={decline}></ModalConfirm>
      {/* <ModalText></ModalText> */}
      </Modal>
    </>
  )
}

export default App
