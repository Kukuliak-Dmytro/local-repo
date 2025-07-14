import fs from 'fs/promises'


export default async function getCategoriesData(){
    try {
        const categoriesData = await fs.readFile('books.json', 'utf-8')
        // console.log(JSON.parse(categoriesData).categories)
        return JSON.parse(categoriesData).categories
    } catch (error) {
        console.error('Error reading categories data:', error)
        return []
    }
}