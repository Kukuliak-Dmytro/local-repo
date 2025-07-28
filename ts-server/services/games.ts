import { getCollection } from "../utils/client";
import Game from "../types/games";

export async function getGames(): Promise<Game[]> {
    try {
        console.log("[GamesService] Attempting to fetch all games from database");
        const collection = getCollection<Game>("games");
        const games = await collection.find({}).toArray();
        
        if (games.length === 0) {
            console.log("[GamesService] No games found in database");
            throw new Error("No games found");
        }
        
        console.log(`[GamesService] Successfully fetched ${games.length} games from database`);
        return games;
    } catch (error) {
        console.error("[GamesService] Database error while fetching games:", error);
        if (error instanceof Error && error.message === "No games found") {
            throw error;
        }
        throw new Error(`Failed to fetch games: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function getGameById(id: number): Promise<Game> {
    try {
        console.log(`[GamesService] Attempting to fetch game with ID: ${id}`);
        const collection = getCollection<Game>("games");
        const game = await collection.findOne({ _id: id });
        
        if (!game) {
            console.log(`[GamesService] Game with ID ${id} not found in database`);
            throw new Error(`Game with id ${id} not found`);
        }
        
        console.log(`[GamesService] Successfully fetched game: ${game.title} (ID: ${game._id})`);
        return game;
    } catch (error) {
        console.error(`[GamesService] Database error while fetching game with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to fetch game with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function createGame(game: Game): Promise<Game> {
    try {
        console.log(`[GamesService] Attempting to create game: ${game.title}`);
        
        // Validate required fields
        if (!game.title || !game.developer || !game.releaseYear || !game.genre || game.rating === undefined || !game.status || game.isFavorite === undefined) {
            console.error("[GamesService] Validation failed: Missing required fields", { game });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof game.releaseYear !== 'number' || game.releaseYear < 1950 || game.releaseYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid release year: ${game.releaseYear}. Must be between 1950 and ${new Date().getFullYear() + 1}`);
        }
        
        if (!Array.isArray(game.genre) || game.genre.length === 0) {
            throw new Error("Game must have at least one genre");
        }
        
        if (typeof game.rating !== 'number' || game.rating < 0 || game.rating > 10) {
            throw new Error(`Invalid rating: ${game.rating}. Must be between 0 and 10`);
        }
        
        if (!['planned', 'playing', 'completed'].includes(game.status)) {
            throw new Error(`Invalid status: ${game.status}. Must be one of: planned, playing, completed`);
        }
        
        const collection = getCollection<Game>("games");
        const result = await collection.insertOne(game);
        
        const createdGame = { ...game, _id: result.insertedId as number };
        console.log(`[GamesService] Successfully created game with ID: ${createdGame._id}`);
        return createdGame;
    } catch (error) {
        console.error("[GamesService] Database error while creating game:", error);
        if (error instanceof Error && error.message === "All fields are required") {
            throw error;
        }
        throw new Error(`Failed to create game: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function updateGame(id: number, game: Game): Promise<Game> {
    try {
        console.log(`[GamesService] Attempting to update game with ID: ${id}`);
        
        // Validate required fields
        if (!game.title || !game.developer || !game.releaseYear || !game.genre || game.rating === undefined || !game.status || game.isFavorite === undefined) {
            console.error("[GamesService] Validation failed: Missing required fields", { game });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof game.releaseYear !== 'number' || game.releaseYear < 1950 || game.releaseYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid release year: ${game.releaseYear}. Must be between 1950 and ${new Date().getFullYear() + 1}`);
        }
        
        if (!Array.isArray(game.genre) || game.genre.length === 0) {
            throw new Error("Game must have at least one genre");
        }
        
        if (typeof game.rating !== 'number' || game.rating < 0 || game.rating > 10) {
            throw new Error(`Invalid rating: ${game.rating}. Must be between 0 and 10`);
        }
        
        if (!['planned', 'playing', 'completed'].includes(game.status)) {
            throw new Error(`Invalid status: ${game.status}. Must be one of: planned, playing, completed`);
        }
        
        const collection = getCollection<Game>("games");
        const result = await collection.updateOne({ _id: id }, { $set: game });
        
        if (result.matchedCount === 0) {
            console.log(`[GamesService] Game with ID ${id} not found for update`);
            throw new Error(`Game with id ${id} not found`);
        }
        
        const updatedGame = { ...game, _id: id };
        console.log(`[GamesService] Successfully updated game: ${updatedGame.title} (ID: ${updatedGame._id})`);
        return updatedGame;
    } catch (error) {
        console.error(`[GamesService] Database error while updating game with ID ${id}:`, error);
        if (error instanceof Error && (error.message === "All fields are required" || error.message.includes("not found"))) {
            throw error;
        }
        throw new Error(`Failed to update game with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function deleteGame(id: number): Promise<void> {
    try {
        console.log(`[GamesService] Attempting to delete game with ID: ${id}`);
        const collection = getCollection<Game>("games");
        const result = await collection.deleteOne({ _id: id });
        
        if (result.deletedCount === 0) {
            console.log(`[GamesService] Game with ID ${id} not found for deletion`);
            throw new Error(`Game with id ${id} not found`);
        }
        
        console.log(`[GamesService] Successfully deleted game with ID: ${id}`);
    } catch (error) {
        console.error(`[GamesService] Database error while deleting game with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to delete game with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
} 