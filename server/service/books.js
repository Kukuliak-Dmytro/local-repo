import fs from 'fs/promises'
import getAuthorsData from './authors.js'
import getCategoriesData from './categories.js'
import getLanguagesData from './languages.js'
import { writeJsonFile, readJsonFile } from '../utils/json.js'


export async function getBooksData(){
try{
   const booksData = await fs.readFile('books.json', 'utf-8')
   return JSON.parse(booksData).books

}catch(error){
    console.error('Error reading books data:', error)
    return []
}

}

export async function getBooks(){
try{
    const books = await getBooksData()
    const authors = await getAuthorsData()
    const categories = await getCategoriesData()
    const languages = await getLanguagesData()

    const booksWithDetails = books.map(book => ({
        ...book,
        author: authors.find(author => author.id === book.authorId),
        category: categories.find(category => category.id === book.categoryId),
        language: languages.find(language => language.id === book.languageId)
    }))
    return booksWithDetails

}
catch(error){
    console.error('Error reading books data:', error)
    return []
}
}
export async function getBookDataById(id){
    try{
        const books = await getBooksData()
        return books.find(book => parseInt(book.id) === parseInt(id))
    }
    catch(error){
        console.error('Error reading books data:', error)
        return null
    }
}

export async function getBookById(id){
    try{
        const bookData = await getBookDataById(id)
        const authors = await getAuthorsData()
        const categories = await getCategoriesData()
        const languages = await getLanguagesData()
    
        const bookWithDetails = {
            ...bookData,
            author: authors.find(author => author.id === bookData.authorId),
            category: categories.find(category => category.id === bookData.categoryId),
            language: languages.find(language => language.id === bookData.languageId)
        }
        return bookWithDetails
    }
    catch(error){
        console.error('Error reading books data:', error)
        return null
    }
}

export async function createBook(bookData){
    try{
        console.log(bookData)
        if(!bookData.title || !bookData.authorId || !bookData.categoryId || !bookData.languageId){
            throw new Error('Invalid book data')
        }
        const allData = await readJsonFile('books.json')
        
        const newBook = {
            id: allData.books.length + 1, ...bookData
        }
        allData.books.push(newBook)
        
        await writeJsonFile('books.json', allData)
        return newBook
    }
    catch(error){
        console.error('Error creating book:', error)
    }

}