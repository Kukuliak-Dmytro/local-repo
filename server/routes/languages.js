import express from 'express'

import {getLanguagesHandler, getLanguageByIdHandler} from '../conrollers/languages.js'

const router = express.Router()

router.get('/', getLanguagesHandler)
router.get('/:id', getLanguageByIdHandler)

export default router