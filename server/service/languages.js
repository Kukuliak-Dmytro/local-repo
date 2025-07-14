import fs from 'fs/promises'


export default async function getLanguagesData(){
    try {
        const languagesData = await fs.readFile('books.json', 'utf-8')
        // console.log(JSON.parse(languagesData).languages)
        return JSON.parse(languagesData).languages
    } catch (error) {
        console.error('Error reading languages data:', error)
        return []
    }
}