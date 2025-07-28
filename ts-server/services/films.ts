import { getCollection } from "../utils/client";
import { Film } from "../types/films";

export async function getFilms(): Promise<Film[]> {
    try {
        console.log("[FilmsService] Attempting to fetch all films from database");
        const collection = getCollection<Film>("movies");
        const films = await collection.find({}).toArray();
        
        if (films.length === 0) {
            console.log("[FilmsService] No films found in database");
            throw new Error("No films found");
        }
        
        console.log(`[FilmsService] Successfully fetched ${films.length} films from database`);
        return films;
    } catch (error) {
        console.error("[FilmsService] Database error while fetching films:", error);
        if (error instanceof Error && error.message === "No films found") {
            throw error;
        }
        throw new Error(`Failed to fetch films: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function getFilmById(id: number): Promise<Film> {
    try {
        console.log(`[FilmsService] Attempting to fetch film with ID: ${id}`);
        const collection = getCollection<Film>("movies");
        const film = await collection.findOne({ _id: id });
        
        if (!film) {
            console.log(`[FilmsService] Film with ID ${id} not found in database`);
            throw new Error(`Film with id ${id} not found`);
        }
        
        console.log(`[FilmsService] Successfully fetched film: ${film.title} (ID: ${film._id})`);
        return film;
    } catch (error) {
        console.error(`[FilmsService] Database error while fetching film with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to fetch film with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function createFilm(film: Film): Promise<Film> {
    try {
        console.log(`[FilmsService] Attempting to create film: ${film.title}`);
        
        // Validate required fields
        if (!film.title || !film.director || !film.releaseYear || !film.genre || film.rating === undefined || !film.status || film.isFavorite === undefined) {
            console.error("[FilmsService] Validation failed: Missing required fields", { film });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof film.releaseYear !== 'number' || film.releaseYear < 1888 || film.releaseYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid release year: ${film.releaseYear}. Must be between 1888 and ${new Date().getFullYear() + 1}`);
        }
        
        if (!Array.isArray(film.genre) || film.genre.length === 0) {
            throw new Error("Film must have at least one genre");
        }
        
        if (typeof film.rating !== 'number' || film.rating < 0 || film.rating > 10) {
            throw new Error(`Invalid rating: ${film.rating}. Must be between 0 and 10`);
        }
        
        if (!['planned', 'watching', 'completed'].includes(film.status)) {
            throw new Error(`Invalid status: ${film.status}. Must be one of: planned, watching, completed`);
        }
        
        const collection = getCollection<Film>("movies");
        const result = await collection.insertOne(film);
        
        const createdFilm = { ...film, _id: result.insertedId as number };
        console.log(`[FilmsService] Successfully created film with ID: ${createdFilm._id}`);
        return createdFilm;
    } catch (error) {
        console.error("[FilmsService] Database error while creating film:", error);
        if (error instanceof Error && error.message === "All fields are required") {
            throw error;
        }
        throw new Error(`Failed to create film: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function updateFilm(id: number, film: Film): Promise<Film> {
    try {
        console.log(`[FilmsService] Attempting to update film with ID: ${id}`);
        
        // Validate required fields
        if (!film.title || !film.director || !film.releaseYear || !film.genre || film.rating === undefined || !film.status || film.isFavorite === undefined) {
            console.error("[FilmsService] Validation failed: Missing required fields", { film });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof film.releaseYear !== 'number' || film.releaseYear < 1888 || film.releaseYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid release year: ${film.releaseYear}. Must be between 1888 and ${new Date().getFullYear() + 1}`);
        }
        
        if (!Array.isArray(film.genre) || film.genre.length === 0) {
            throw new Error("Film must have at least one genre");
        }
        
        if (typeof film.rating !== 'number' || film.rating < 0 || film.rating > 10) {
            throw new Error(`Invalid rating: ${film.rating}. Must be between 0 and 10`);
        }
        
        if (!['planned', 'watching', 'completed'].includes(film.status)) {
            throw new Error(`Invalid status: ${film.status}. Must be one of: planned, watching, completed`);
        }
        
        const collection = getCollection<Film>("movies");
        const result = await collection.updateOne({ _id: id }, { $set: film });
        
        if (result.matchedCount === 0) {
            console.log(`[FilmsService] Film with ID ${id} not found for update`);
            throw new Error(`Film with id ${id} not found`);
        }
        
        const updatedFilm = { ...film, _id: id };
        console.log(`[FilmsService] Successfully updated film: ${updatedFilm.title} (ID: ${updatedFilm._id})`);
        return updatedFilm;
    } catch (error) {
        console.error(`[FilmsService] Database error while updating film with ID ${id}:`, error);
        if (error instanceof Error && (error.message === "All fields are required" || error.message.includes("not found"))) {
            throw error;
        }
        throw new Error(`Failed to update film with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function deleteFilm(id: number): Promise<void> {
    try {
        console.log(`[FilmsService] Attempting to delete film with ID: ${id}`);
        const collection = getCollection<Film>("movies");
        const result = await collection.deleteOne({ _id: id });
        
        if (result.deletedCount === 0) {
            console.log(`[FilmsService] Film with ID ${id} not found for deletion`);
            throw new Error(`Film with id ${id} not found`);
        }
        
        console.log(`[FilmsService] Successfully deleted film with ID: ${id}`);
    } catch (error) {
        console.error(`[FilmsService] Database error while deleting film with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to delete film with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
} 