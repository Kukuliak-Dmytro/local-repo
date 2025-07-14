import { getBooks, getBookById, createBook } from '../service/books.js'

async function getBooksHandler(req, res){
    try{
        const books = await getBooks()
        res.json(books)
    }catch(error){
        res.status(500).json({error: 'Error fetching books'})
    }
}
async function getBookByIdHandler(req, res){
    try{
        const { id } = req.params
        const book = await getBookById(id)
        if(!book){
            res.status(404).json({error: 'Book not found'})
            return
        }
        res.json(book)
    }
    catch(error){
        res.status(500).json({error: 'Error fetching book'})
    }
}
async function createBookHandler(req, res){
    try{
        const {title, authorId, categoryId, languageId} = req.body
        const newBook = await createBook({title, authorId, categoryId, languageId})
        res.status(201).json(newBook)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}
export {getBooksHandler, getBookByIdHandler, createBookHandler}