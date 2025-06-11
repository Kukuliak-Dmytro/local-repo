import axios from 'axios'
export default async function getChuckNorrisFact(){
    try{
        const response = await axios.get('https://api.chucknorris.io/jokes/random')
        console.log(response.data)
        return response.data

    }catch(error){
        console.error('Error fetching Chuck Norris fact:', error)
        throw error
    }
}