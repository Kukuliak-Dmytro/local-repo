import { getCollection } from "../utils/client";
import Genre from "../types/genres";

export async function getGenres(): Promise<Genre[]> {
    try {
        console.log("[GenresService] Attempting to fetch all genres from database");
        const collection = getCollection<Genre>("genres");
        const genres = await collection.find({}).toArray();
        
        if (genres.length === 0) {
            console.log("[GenresService] No genres found in database");
            throw new Error("No genres found");
        }
        
        console.log(`[GenresService] Successfully fetched ${genres.length} genres from database`);
        return genres;
    } catch (error) {
        console.error("[GenresService] Database error while fetching genres:", error);
        if (error instanceof Error && error.message === "No genres found") {
            throw error;
        }
        throw new Error(`Failed to fetch genres: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function getGenreById(id: string): Promise<Genre> {
    try {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw new Error(`Invalid genre ID format: ${id}. Must be a number.`);
        }
        
        console.log(`[GenresService] Attempting to fetch genre with ID: ${numericId}`);
        const collection = getCollection<Genre>("genres");
        const foundGenre = await collection.findOne({ _id: numericId });
        
        if (!foundGenre) {
            console.log(`[GenresService] Genre with ID ${numericId} not found in database`);
            throw new Error(`Genre with id ${id} not found`);
        }
        
        console.log(`[GenresService] Successfully fetched genre: ${foundGenre.name} (ID: ${foundGenre._id})`);
        return foundGenre;
    } catch (error) {
        console.error(`[GenresService] Database error while fetching genre with ID ${id}:`, error);
        if (error instanceof Error && (error.message.includes("not found") || error.message.includes("Invalid genre ID format"))) {
            throw error;
        }
        throw new Error(`Failed to fetch genre with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function createGenre(genre: Genre): Promise<Genre> {
    try {
        console.log(`[GenresService] Attempting to create genre: ${genre.name}`);
        
        // Validate required fields
        if (!genre.name || !genre.description) {
            console.error("[GenresService] Validation failed: Missing required fields", { genre });
            throw new Error("Name and description are required");
        }
        
        // Additional validation
        if (typeof genre.name !== 'string' || genre.name.trim().length === 0) {
            throw new Error("Genre name must be a non-empty string");
        }
        
        if (typeof genre.description !== 'string' || genre.description.trim().length === 0) {
            throw new Error("Genre description must be a non-empty string");
        }
        
        if (genre.name.length > 100) {
            throw new Error("Genre name is too long. Maximum 100 characters allowed.");
        }
        
        if (genre.description.length > 500) {
            throw new Error("Genre description is too long. Maximum 500 characters allowed.");
        }
        
        const collection = getCollection<Genre>("genres");
        const result = await collection.insertOne(genre);
        
        const createdGenre = { ...genre, _id: result.insertedId as number };
        console.log(`[GenresService] Successfully created genre with ID: ${createdGenre._id}`);
        return createdGenre;
    } catch (error) {
        console.error("[GenresService] Database error while creating genre:", error);
        if (error instanceof Error && error.message === "Name and description are required") {
            throw error;
        }
        throw new Error(`Failed to create genre: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function updateGenre(id: string, genre: Genre): Promise<Genre> {
    try {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw new Error(`Invalid genre ID format: ${id}. Must be a number.`);
        }
        
        console.log(`[GenresService] Attempting to update genre with ID: ${numericId}`);
        
        // Validate required fields
        if (!genre.name || !genre.description) {
            console.error("[GenresService] Validation failed: Missing required fields", { genre });
            throw new Error("Name and description are required");
        }
        
        // Additional validation
        if (typeof genre.name !== 'string' || genre.name.trim().length === 0) {
            throw new Error("Genre name must be a non-empty string");
        }
        
        if (typeof genre.description !== 'string' || genre.description.trim().length === 0) {
            throw new Error("Genre description must be a non-empty string");
        }
        
        if (genre.name.length > 100) {
            throw new Error("Genre name is too long. Maximum 100 characters allowed.");
        }
        
        if (genre.description.length > 500) {
            throw new Error("Genre description is too long. Maximum 500 characters allowed.");
        }
        
        const collection = getCollection<Genre>("genres");
        const result = await collection.updateOne({ _id: numericId }, { $set: genre });
        
        if (result.matchedCount === 0) {
            console.log(`[GenresService] Genre with ID ${numericId} not found for update`);
            throw new Error(`Genre with id ${id} not found`);
        }
        
        const updatedGenre = { ...genre, _id: numericId };
        console.log(`[GenresService] Successfully updated genre: ${updatedGenre.name} (ID: ${updatedGenre._id})`);
        return updatedGenre;
    } catch (error) {
        console.error(`[GenresService] Database error while updating genre with ID ${id}:`, error);
        if (error instanceof Error && (error.message === "Name and description are required" || error.message.includes("not found") || error.message.includes("Invalid genre ID format"))) {
            throw error;
        }
        throw new Error(`Failed to update genre with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function deleteGenre(id: string): Promise<void> {
    try {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw new Error(`Invalid genre ID format: ${id}. Must be a number.`);
        }
        
        console.log(`[GenresService] Attempting to delete genre with ID: ${numericId}`);
        const collection = getCollection<Genre>("genres");
        const result = await collection.deleteOne({ _id: numericId });
        
        if (result.deletedCount === 0) {
            console.log(`[GenresService] Genre with ID ${numericId} not found for deletion`);
            throw new Error(`Genre with id ${id} not found`);
        }
        
        console.log(`[GenresService] Successfully deleted genre with ID: ${numericId}`);
    } catch (error) {
        console.error(`[GenresService] Database error while deleting genre with ID ${id}:`, error);
        if (error instanceof Error && (error.message.includes("not found") || error.message.includes("Invalid genre ID format"))) {
            throw error;
        }
        throw new Error(`Failed to delete genre with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}