import { Request, Response } from "express";
import { getGenres, getGenreById, createGenre, updateGenre, deleteGenre } from "../services/genres";
import Genre from "../types/genres";

const genresController = {
getGenresHandler: async (req: Request, res: Response) => {
    try{
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
},
getGenreByIdHandler: async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        if(!id){
            return res.status(400).json({ message: "Genre id is required" });
        }
        const genre = await getGenreById(id);
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
},
createGenreHandler: async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try{
        if(!name || !description){
            return res.status(400).json({ message: "Name and description are required" });
        }
        const genre = await createGenre({ name, description } as Genre);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
},
updateGenreHandler: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try{
        if(!id || !name || !description){
            return res.status(400).json({ message: "Id, name and description are required" });
        }
        const genre = await updateGenre(id, { name, description } as Genre);
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
},
deleteGenreHandler: async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        if(!id){
            return res.status(400).json({ message: "Genre id is required" });
        }
        await deleteGenre(id);
        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
}
export default genresController;