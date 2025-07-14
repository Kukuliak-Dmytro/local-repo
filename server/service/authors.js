import fs from 'fs/promises'


export default async function getAuthorsData(){
    try {
        const authorsData = await fs.readFile('books.json', 'utf-8')
        // console.log(JSON.parse(authorsData).authors)
        return JSON.parse(authorsData).authors
    } catch (error) {
        console.error('Error reading authors data:', error)
        return []
    }
}