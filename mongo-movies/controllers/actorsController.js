import { getActorsOperation, getActorByIdOperation, createActorOperation, updateActorOperation, deleteActorOperation } from "../operations/actorsOperations.js"




const actorsController ={
    getActors: async (req, res) => {
        try {
            const actors = await getActorsOperation()
            res.status(200).json(actors)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getActorById: async (req, res) => {
        try{
            const {id}=req.params
            const actor=await getActorByIdOperation(id)
            res.status(200).json(actor)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    createActor:async(req,res)=>{
        try{
            const {name}=req.body
            const actor=await createActorOperation(name)
            res.status(201).json(actor)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    updateActor:async(req,res)=>{
        try{
            const {id}=req.params
            const {name}=req.body
            const actor=await updateActorOperation(id,name)
            res.status(200).json(actor)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    deleteActor:async(req,res)=>{
        try{
            const {id}=req.params
            const actor=await deleteActorOperation(id)
            res.status(200).json(actor)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

export default actorsController;