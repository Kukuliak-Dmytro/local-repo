import './App.css'
import JokeCard from './components/jokeCard'
import ChuckNorrisCard from './components/chuckNorrisCar'
import NumberCard from './components/numberCard'
function App() {
  
  return (
    <div className='app-wrapper'>
      <h1>Different APIs</h1>
      <JokeCard />
      <ChuckNorrisCard />
      <NumberCard />
    </div>
  )
}

export default App
