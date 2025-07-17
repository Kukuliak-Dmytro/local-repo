import express from 'express'

import {getAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler} from '../conrollers/author.js'

const router = express.Router()

router.get('/', getAuthorsHandler)
router.get('/:id', getAuthorByIdHandler)
router.post('/', createAuthorHandler)
router.patch('/:id', updateAuthorHandler)
router.delete('/:id', deleteAuthorHandler)

export default router