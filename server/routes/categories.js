import express from 'express'
import {getCategoriesHandler, getCategoryByIdHandler} from '../conrollers/categories.js'

const router = express.Router()

router.get('/', getCategoriesHandler)
router.get('/:id', getCategoryByIdHandler)


export default router