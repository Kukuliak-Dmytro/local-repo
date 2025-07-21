import { getGenresOperation, getGenreByIdOperation, createGenreOperation, updateGenreOperation, deleteGenreOperation } from "../operations/genreOperations.js"




const genresController ={
    getGenres: async (req, res) => {
        try {
            const genres = await getGenresOperation()
            res.status(200).json(genres)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getGenreById: async (req, res) => {
        try{
            const {id}=req.params
            const genre=await getGenreByIdOperation(id)
            res.status(200).json(genre)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    createGenre:async(req,res)=>{
        try{
            const {name}=req.body
            const genre=await createGenreOperation(name)
            res.status(201).json(genre)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    updateGenre:async(req,res)=>{
        try{
            const {id}=req.params
            const {name}=req.body
            const genre=await updateGenreOperation(id,name)
            res.status(200).json(genre)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    deleteGenre:async(req,res)=>{
        try{
            const {id}=req.params
            const genre=await deleteGenreOperation(id)
            res.status(200).json(genre)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

export default genresController;