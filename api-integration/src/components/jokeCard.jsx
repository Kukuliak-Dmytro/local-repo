import { useState } from "react"
import getJoke from "../services/getJoke"
export default function JokeCard({ }) {
    const [joke, setJoke] = useState('Click to get a new joke!')
    const [isJokeLoading, setIsJokeLoading] = useState(false)
    const handleGetJoke = async () => {
        try {
            setIsJokeLoading(true)
            const JokeData = await getJoke()
            setJoke(JokeData.setup + ' ' + JokeData.punchline)
            setIsJokeLoading(false)
        } catch (error) {
            console.error('Error fetching joke:', error)
            setIsJokeLoading(false)
        }
    }
    return (
        <div className="card">
            <h3>Joke Generator</h3>
            {isJokeLoading ? <p className='loading-spinner'></p> : <p>{joke}</p>}
            <button onClick={handleGetJoke}>Get a new Joke</button>
        </div>
    )
}