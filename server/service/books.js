import fs from 'fs/promises'
import {getAuthorsData} from './authors.js'
import getCategoriesData from './categories.js'
import getLanguagesData from './languages.js'
import { writeJsonFile, readJsonFile } from '../utils/json.js'


export async function getBooksData() {
    const booksData = await fs.readFile('books.json', 'utf-8')
    return JSON.parse(booksData).books


}

export async function getBooks() {

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


export async function getBookDataById(id) {
    const books = await getBooksData()
    return books.find(book => parseInt(book.id) === parseInt(id))

}

export async function getBookById(id) {

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



export async function createBook(bookData) {

    console.log(bookData)
    if (!bookData.title || !bookData.authorId || !bookData.categoryId || !bookData.languageId) {
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

export async function updateBook(ID, bookData) {
    const id = parseInt(ID)
    const book = await getBookDataById(id)

    const authors = await getAuthorsData()
    const categories = await getCategoriesData()
    const languages = await getLanguagesData()

    if (!authors.some(author => author.id === bookData.authorId)) {
        throw new Error('Invalid author')
    }
    if (!categories.some(category => category.id === bookData.categoryId)) {
        throw new Error('Invalid category')
    }
    if (!languages.some(language => language.id === bookData.languageId)) {
        throw new Error('Invalid language')
    }


    if (!book) {
        throw new Error('Book not found')
    }
    const allData = await readJsonFile('books.json')
    const index = allData.books.findIndex(book => book.id === id)
    if (index !== -1) {
        allData.books[index] = { id, ...bookData }
        await writeJsonFile('books.json', allData)
        return allData.books[index]
    }
    throw new Error('Book not found')


}

export async function deleteBook(id) {
    const allData = await readJsonFile('books.json')
    const book = await getBookDataById(id)
    if (!book) {
        throw new Error('Book not found')
    }
    const index = allData.books.findIndex(book => book.id === parseInt(id))

    if (index !== -1) {
        allData.books.splice(index, 1)
        await writeJsonFile('books.json', allData)
        return book
    }
    throw new Error('Book not found')


}