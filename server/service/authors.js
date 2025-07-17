import fs from 'fs/promises'

import { readJsonFile, writeJsonFile } from '../utils/json.js'


export async function getAuthorsData(){
    try {
        const authorsData = await fs.readFile('books.json', 'utf-8')
        // console.log(JSON.parse(authorsData).authors)
        return JSON.parse(authorsData).authors
    } catch (error) {
        console.error('Error reading authors data:', error)
        return []
    }
}
export async function getAuthorById(id){
    const authors = await getAuthorsData()
    const author = authors.find(author => author.id === parseInt(id))
    if(!author){
        throw new Error('Author not found')
    }
    return author
}
export async function createAuthor(name){
    const allData = await readJsonFile('books.json')
    const author = {
        id: allData.authors.length + 1,
        name
    }
    if(!name){
        throw new Error('Name is required')
    }
    allData.authors.push(author)
    await writeJsonFile('books.json', allData)
    return author
}
export async function updateAuthor(ID, name){
    const id = parseInt(ID)
    const allData= await readJsonFile('books.json')
    const author = await getAuthorById(id)
    if(!author){
        throw new Error('Author not found')
    }
    if(!name){
        throw new Error('Name is required')
    }

    const index=allData.authors.findIndex(author => author.id === parseInt(id))
    if(index !== -1){
        allData.authors[index] = {id, name}
        await writeJsonFile('books.json', allData)
        return allData.authors[index]
    }
    throw new Error('Author not found')

}
export async function deleteAuthor(ID){
    const id = parseInt(ID)
    const allData= await readJsonFile('books.json')
    const author = await getAuthorById(id)
    if(!author){
        throw new Error('Author not found')
    }
    const remaninigBooks = allData.books.filter(book => book.authorId !== parseInt(id))
    allData.books=remaninigBooks
    allData.authors=allData.authors.filter(author => author.id !== parseInt(id))
    await writeJsonFile('books.json', allData)
    return author
}

