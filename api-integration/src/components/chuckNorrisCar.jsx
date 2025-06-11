import { useState } from "react"
import getChuckNorrisFact from "../services/chuckNorrisFact"
export default function ChuckNorrisCard({ }) {
    const [chuckNorrisFact, setChuckNorrisFact] = useState({ value: 'Click to get a new Chuck Norris fact!' })
    const [isChuckNorrisFactLoading, setIsChuckNorrisFactLoading] = useState(false)

    const handleGetChuckNorrisFact = async () => {
        try {
            setIsChuckNorrisFactLoading(true)
            const ChuckNorrisFactData = await getChuckNorrisFact()
            setChuckNorrisFact(ChuckNorrisFactData)
            setIsChuckNorrisFactLoading(false)
        } catch (error) {
            console.error('Error fetching Chuck Norris fact:', error)
            setIsChuckNorrisFactLoading(false)
        }
    }
    return (
        <div className="card">
            <h3>Chuck Norris Fact</h3>
            <img src={chuckNorrisFact.icon_url} alt="Chuck Norris Fact" />
            {isChuckNorrisFactLoading ? <p className='loading-spinner'></p> : <p>{chuckNorrisFact.value}</p>}
            <button onClick={handleGetChuckNorrisFact}>Get a new Chuck Norris fact</button>
        </div>
    )
}