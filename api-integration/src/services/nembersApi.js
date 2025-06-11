import axios from 'axios'
export default async function getNumberFact() {
    try {
        const random = Math.floor(Math.random() * 100) + 1
        const response = await axios.get(`http://numbersapi.com/${random}`)
        console.log(response.data)
        return response.data
    }
    catch (error) {
        console.error('Error fetching members:', error)
        throw error
    }
}