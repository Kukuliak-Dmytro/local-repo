import { useState } from "react"
import getNumberFact from "../services/nembersApi"
export default function NumberCard({ }) {
    const [numberFact, setNumberFact] = useState('Click to get a new number fact!')
    const [isNumberFactLoading, setIsNumberFactLoading] = useState(false)
    const handleGetNumberFact = async () => {
        try {
            setIsNumberFactLoading(true)
            const NumberFactData = await getNumberFact()
            setNumberFact(NumberFactData)
            setIsNumberFactLoading(false)
        } catch (error) {
            console.error('Error fetching number fact:', error)
            setIsNumberFactLoading(false)
        }
    }
    return (
        <div className="card">
            <h3>Number Fact</h3>
            {isNumberFactLoading ? <p className='loading-spinner'></p> : <p>{numberFact}</p>}
            <button onClick={handleGetNumberFact}>Get a new Number Fact</button>
        </div>
    )
}