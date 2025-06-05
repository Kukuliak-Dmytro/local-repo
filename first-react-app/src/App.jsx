import { createContext, use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/ui/Button/Button'
import { List } from './components/ui/List/List'
import Modal from './components/layout/Modal/Modal'
import ModalText from './components/layout/Modal/ModalText'
import ModalConfirm from './components/layout/Modal/ModalConfirm'
import Semafor from './components/traffic/Sepafor/Semafor'
import Input from './components/ui/Input/Input'
export const SemafoforLightContext = createContext(null)
export const ObjectListContext = createContext(null);

function App() {
  const [objectList, setObjectList] = useState([
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
  ]);
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    buttonName: ""
  });

  const [theme, setTheme] = useState('light')
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

  const handleSubmit = (e) => {
    console.log("Form submitted with data:", formData);
    e.preventDefault();
    setFormData({
      name: "",
      description: "",
      buttonName: ""
    })
    // Don't mutate state directly! Instead, create a new array.
    setObjectList(prevList => [
      ...prevList,
      {
        title: formData.name,
        description: formData.description,
        buttonText: formData.buttonName,
        id: prevList.length + 1
      }
    ]);
  }
  const toggleTheme = () => {
    console.log("Theme toggled!");
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.body.className = theme === 'light' ? 'dark' : 'light';
  }
  return (
    <ObjectListContext.Provider value={[objectList, setObjectList]}>
      <SemafoforLightContext.Provider value={{
        red: 0,
        yellow: 0,
        green: 0
      }}>
        {/* Apply the theme class to a wrapper div */}
        <div className={`app-container ${theme}`}>
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
              <Button onClick={() => { increment(1) }}>+1</Button>
              <Button onClick={() => { increment(5) }}>+5</Button>
            </div>
            <Button onClick={toggleModal}>Open Modal</Button>
            <form onSubmit={handleSubmit}>
              <Input
                label={"Enter item name"}
                placeholder={"Name..."}
                id={"name"}
                value={formData.name}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                }))}></Input>
              <Input
                label={"Enter item description"}
                placeholder={"Description..."}
                id={"description"}
                value={formData.description}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  description: e.target.value
                }))
                }
              ></Input>
              <Input
                label={"Enter button name"}
                placeholder={"Button name..."}
                id={"button-name"}
                value={formData.buttonName}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  buttonName: e.target.value
                }))
                }
              ></Input>
              <Button type='submit'>Save</Button>
            </form>
            <List></List>
          </div>
          <Modal opened={isOpen} toggleModal={toggleModal}>
            <ModalConfirm yes={confirm} decline={decline}></ModalConfirm>
            {/* <ModalText></ModalText> */}
          </Modal>
          <Semafor></Semafor>
          <Button onClick={toggleTheme}>Change current theme</Button>
        </div>
      </SemafoforLightContext.Provider>
    </ObjectListContext.Provider>
  )
}

export default App
