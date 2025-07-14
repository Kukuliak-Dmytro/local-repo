import express from 'express'

import {getBooksHandler, getBookByIdHandler, createBookHandler} from '../conrollers/books.js'

const router = express.Router()

    router.get('/', getBooksHandler)
    router.get('/:id', getBookByIdHandler)
    router.post('/', createBookHandler)
export default router