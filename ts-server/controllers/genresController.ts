import { Request, Response } from "express";
import { getGenres, getGenreById, createGenre, updateGenre, deleteGenre } from "../services/genres";
import Genre from "../types/genres";

const genresController = {
    getGenresHandler: async (req: Request, res: Response) => {
        try {
            console.log("[GenresController] Fetching all genres");
            const genres = await getGenres();
            console.log(`[GenresController] Successfully fetched ${genres.length} genres`);
            res.status(200).json(genres);
        } catch (error) {
            console.error("[GenresController] Error fetching genres:", error);
            if (error instanceof Error) {
                if (error.message === "No genres found") {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    getGenreByIdHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Genre id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid genre ID format. Must be a number." });
            }
            
            console.log(`[GenresController] Fetching genre with ID: ${numericId}`);
            const genre = await getGenreById(id);
            console.log(`[GenresController] Successfully fetched genre: ${genre.name}`);
            res.status(200).json(genre);
        } catch (error) {
            console.error(`[GenresController] Error fetching genre with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    createGenreHandler: async (req: Request, res: Response) => {
        const { name, description } = req.body;
        try {
            if (!name || !description) {
                return res.status(400).json({ 
                    message: "Name and description are required", 
                    required: ["name", "description"],
                    received: { name, description }
                });
            }
            
            if (typeof name !== 'string' || typeof description !== 'string') {
                return res.status(400).json({ 
                    message: "Name and description must be strings",
                    received: { name: typeof name, description: typeof description }
                });
            }
            
            if (name.trim().length === 0 || description.trim().length === 0) {
                return res.status(400).json({ 
                    message: "Name and description cannot be empty strings"
                });
            }
            
            console.log(`[GenresController] Creating new genre: ${name}`);
            const genre = await createGenre({ name, description } as Genre);
            console.log(`[GenresController] Successfully created genre with ID: ${genre._id}`);
            res.status(201).json(genre);
        } catch (error) {
            console.error("[GenresController] Error creating genre:", error);
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    updateGenreHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid genre ID format. Must be a number." });
            }
            
            if (!name || !description) {
                return res.status(400).json({ 
                    message: "Name and description are required", 
                    required: ["name", "description"],
                    received: { name, description }
                });
            }
            
            if (typeof name !== 'string' || typeof description !== 'string') {
                return res.status(400).json({ 
                    message: "Name and description must be strings",
                    received: { name: typeof name, description: typeof description }
                });
            }
            
            if (name.trim().length === 0 || description.trim().length === 0) {
                return res.status(400).json({ 
                    message: "Name and description cannot be empty strings"
                });
            }
            
            console.log(`[GenresController] Updating genre with ID: ${numericId}`);
            const genre = await updateGenre(id, { name, description } as Genre);
            console.log(`[GenresController] Successfully updated genre: ${genre.name}`);
            res.status(200).json(genre);
        } catch (error) {
            console.error(`[GenresController] Error updating genre with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    deleteGenreHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid genre ID format. Must be a number." });
            }
            
            console.log(`[GenresController] Deleting genre with ID: ${numericId}`);
            await deleteGenre(id);
            console.log(`[GenresController] Successfully deleted genre with ID: ${numericId}`);
            res.status(204).send();
        } catch (error) {
            console.error(`[GenresController] Error deleting genre with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    }
}

export default genresController;