import { Router } from "express"
import actorsController from "../controllers/actorsController.js"

const actorsRoutes=Router()

actorsRoutes.get("/",actorsController.getActors)
actorsRoutes.get("/:id",actorsController.getActorById)
actorsRoutes.post("/",actorsController.createActor)
actorsRoutes.put("/:id",actorsController.updateActor)
actorsRoutes.delete("/:id",actorsController.deleteActor)

export default actorsRoutes;
