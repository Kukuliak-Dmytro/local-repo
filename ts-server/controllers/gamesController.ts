import { Request, Response } from "express";
import { getGames, getGameById, createGame, updateGame, deleteGame } from "../services/games";
import Game from "../types/games";

const gamesController = {
    getGamesHandler: async (req: Request, res: Response) => {
        try {
            console.log("[GamesController] Fetching all games");
            const games = await getGames();
            console.log(`[GamesController] Successfully fetched ${games.length} games`);
            res.status(200).json(games);
        } catch (error) {
            console.error("[GamesController] Error fetching games:", error);
            if (error instanceof Error) {
                if (error.message === "No games found") {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    getGameByIdHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Game id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid game ID format. Must be a number." });
            }
            
            console.log(`[GamesController] Fetching game with ID: ${numericId}`);
            const game = await getGameById(numericId);
            console.log(`[GamesController] Successfully fetched game: ${game.title}`);
            res.status(200).json(game);
        } catch (error) {
            console.error(`[GamesController] Error fetching game with ID ${id}:`, error);
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
    
    createGameHandler: async (req: Request, res: Response) => {
        const { title, developer, releaseYear, genre, rating, status, isFavorite } = req.body;
        try {
            if (!title || !developer || !releaseYear || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "All fields are required", 
                    required: ["title", "developer", "releaseYear", "genre", "rating", "status", "isFavorite"],
                    received: { title, developer, releaseYear, genre, rating, status, isFavorite }
                });
            }
            
            if (typeof title !== 'string' || typeof developer !== 'string') {
                return res.status(400).json({ 
                    message: "Title and developer must be strings",
                    received: { title: typeof title, developer: typeof developer }
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
            
            if (!['planned', 'playing', 'completed'].includes(status)) {
                return res.status(400).json({ 
                    message: "Status must be one of: planned, playing, completed",
                    received: { status }
                });
            }
            
            if (typeof isFavorite !== 'boolean') {
                return res.status(400).json({ 
                    message: "isFavorite must be a boolean",
                    received: { isFavorite: typeof isFavorite }
                });
            }
            
            console.log(`[GamesController] Creating new game: ${title}`);
            const game = await createGame({ title, developer, releaseYear, genre, rating, status, isFavorite } as Game);
            console.log(`[GamesController] Successfully created game with ID: ${game._id}`);
            res.status(201).json(game);
        } catch (error) {
            console.error("[GamesController] Error creating game:", error);
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    updateGameHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, developer, releaseYear, genre, rating, status, isFavorite } = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid game ID format. Must be a number." });
            }
            
            if (!title || !developer || !releaseYear || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "All fields are required", 
                    required: ["title", "developer", "releaseYear", "genre", "rating", "status", "isFavorite"],
                    received: { title, developer, releaseYear, genre, rating, status, isFavorite }
                });
            }
            
            if (typeof title !== 'string' || typeof developer !== 'string') {
                return res.status(400).json({ 
                    message: "Title and developer must be strings",
                    received: { title: typeof title, developer: typeof developer }
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
            
            if (!['planned', 'playing', 'completed'].includes(status)) {
                return res.status(400).json({ 
                    message: "Status must be one of: planned, playing, completed",
                    received: { status }
                });
            }
            
            if (typeof isFavorite !== 'boolean') {
                return res.status(400).json({ 
                    message: "isFavorite must be a boolean",
                    received: { isFavorite: typeof isFavorite }
                });
            }
            
            console.log(`[GamesController] Updating game with ID: ${numericId}`);
            const game = await updateGame(numericId, { title, developer, releaseYear, genre, rating, status, isFavorite } as Game);
            console.log(`[GamesController] Successfully updated game: ${game.title}`);
            res.status(200).json(game);
        } catch (error) {
            console.error(`[GamesController] Error updating game with ID ${id}:`, error);
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
    
    deleteGameHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid game ID format. Must be a number." });
            }
            
            console.log(`[GamesController] Deleting game with ID: ${numericId}`);
            await deleteGame(numericId);
            console.log(`[GamesController] Successfully deleted game with ID: ${numericId}`);
            res.status(204).send();
        } catch (error) {
            console.error(`[GamesController] Error deleting game with ID ${id}:`, error);
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

export default gamesController; 