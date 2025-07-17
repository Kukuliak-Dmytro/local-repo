import { getAuthorsData, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../service/authors.js'

async function getAuthorsHandler(req, res) {
    try {
        const authors = await getAuthorsData()
        res.json(authors)

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
async function getAuthorByIdHandler(req, res) {
    try {
        const { id } = req.params
        const author = await getAuthorById(id)
        res.json(author)

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function createAuthorHandler(req, res) {

    try {
        const { name } = req.body
        const newAuthor = await createAuthor(name)
        res.status(201).json(newAuthor)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateAuthorHandler(req,res){
    try{
        const {id} = req.params
        const {name}= req.body
        const updatedAuthor = await updateAuthor(id,name)
        res.json(updatedAuthor)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
async function deleteAuthorHandler(req,res){
    try{
        const {id} = req.params
        const deletedAuthor = await deleteAuthor(id)
        res.json(deletedAuthor)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
export {getAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler}