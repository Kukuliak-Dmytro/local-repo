import { Request, Response } from "express";
import { getFilms, getFilmById, createFilm, updateFilm, deleteFilm } from "../services/films";
import { Film } from "../types/films";

const filmsController = {
    getFilmsHandler: async (req: Request, res: Response) => {
        try {
            console.log("[FilmsController] Fetching all films");
            const films = await getFilms();
            console.log(`[FilmsController] Successfully fetched ${films.length} films`);
            res.status(200).json(films);
        } catch (error) {
            console.error("[FilmsController] Error fetching films:", error);
            if (error instanceof Error) {
                if (error.message === "No films found") {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    getFilmByIdHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Film id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid film ID format. Must be a number." });
            }
            
            console.log(`[FilmsController] Fetching film with ID: ${numericId}`);
            const film = await getFilmById(numericId);
            console.log(`[FilmsController] Successfully fetched film: ${film.title}`);
            res.status(200).json(film);
        } catch (error) {
            console.error(`[FilmsController] Error fetching film with ID ${id}:`, error);
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
    
    createFilmHandler: async (req: Request, res: Response) => {
        const { title, director, releaseYear, genre, rating, status, isFavorite } = req.body;
        try {
            if (!title || !director || !releaseYear || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "All fields are required", 
                    required: ["title", "director", "releaseYear", "genre", "rating", "status", "isFavorite"],
                    received: { title, director, releaseYear, genre, rating, status, isFavorite }
                });
            }
            
            if (typeof title !== 'string' || typeof director !== 'string') {
                return res.status(400).json({ 
                    message: "Title and director must be strings",
                    received: { title: typeof title, director: typeof director }
                });
            }
            
            if (typeof releaseYear !== 'number') {
                return res.status(400).json({ 
                    message: "Release year must be a number",
                    received: { releaseYear: typeof releaseYear }
                });
            }
            
            if (!Array.isArray(genre) || genre.length === 0) {
                return res.status(400).json({ 
                    message: "Genre must be a non-empty array"
                });
            }
            
            if (typeof rating !== 'number') {
                return res.status(400).json({ 
                    message: "Rating must be a number",
                    received: { rating: typeof rating }
                });
            }
            
            if (!['planned', 'watching', 'completed'].includes(status)) {
                return res.status(400).json({ 
                    message: "Status must be one of: planned, watching, completed",
                    received: { status }
                });
            }
            
            if (typeof isFavorite !== 'boolean') {
                return res.status(400).json({ 
                    message: "isFavorite must be a boolean",
                    received: { isFavorite: typeof isFavorite }
                });
            }
            
            console.log(`[FilmsController] Creating new film: ${title}`);
            const film = await createFilm({ title, director, releaseYear, genre, rating, status, isFavorite } as Film);
            console.log(`[FilmsController] Successfully created film with ID: ${film._id}`);
            res.status(201).json(film);
        } catch (error) {
            console.error("[FilmsController] Error creating film:", error);
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    updateFilmHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, director, releaseYear, genre, rating, status, isFavorite } = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid film ID format. Must be a number." });
            }
            
            if (!title || !director || !releaseYear || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "All fields are required", 
                    required: ["title", "director", "releaseYear", "genre", "rating", "status", "isFavorite"],
                    received: { title, director, releaseYear, genre, rating, status, isFavorite }
                });
            }
            
            if (typeof title !== 'string' || typeof director !== 'string') {
                return res.status(400).json({ 
                    message: "Title and director must be strings",
                    received: { title: typeof title, director: typeof director }
                });
            }
            
            if (typeof releaseYear !== 'number') {
                return res.status(400).json({ 
                    message: "Release year must be a number",
                    received: { releaseYear: typeof releaseYear }
                });
            }
            
            if (!Array.isArray(genre) || genre.length === 0) {
                return res.status(400).json({ 
                    message: "Genre must be a non-empty array"
                });
            }
            
            if (typeof rating !== 'number') {
                return res.status(400).json({ 
                    message: "Rating must be a number",
                    received: { rating: typeof rating }
                });
            }
            
            if (!['planned', 'watching', 'completed'].includes(status)) {
                return res.status(400).json({ 
                    message: "Status must be one of: planned, watching, completed",
                    received: { status }
                });
            }
            
            if (typeof isFavorite !== 'boolean') {
                return res.status(400).json({ 
                    message: "isFavorite must be a boolean",
                    received: { isFavorite: typeof isFavorite }
                });
            }
            
            console.log(`[FilmsController] Updating film with ID: ${numericId}`);
            const film = await updateFilm(numericId, { title, director, releaseYear, genre, rating, status, isFavorite } as Film);
            console.log(`[FilmsController] Successfully updated film: ${film.title}`);
            res.status(200).json(film);
        } catch (error) {
            console.error(`[FilmsController] Error updating film with ID ${id}:`, error);
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
    
    deleteFilmHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid film ID format. Must be a number." });
            }
            
            console.log(`[FilmsController] Deleting film with ID: ${numericId}`);
            await deleteFilm(numericId);
            console.log(`[FilmsController] Successfully deleted film with ID: ${numericId}`);
            res.status(204).send();
        } catch (error) {
            console.error(`[FilmsController] Error deleting film with ID ${id}:`, error);
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

export default filmsController; 