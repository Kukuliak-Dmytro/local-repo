import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../services/moviesService.js";
import { getGenreById } from "../services/genreService.js";
import { getActorById } from "../services/actorsService.js";

export async function getMoviesOperation() {
    const movies = await getMovies();
    return movies;
}

export async function getMovieByIdOperation(id) {
    if (!id) {
        throw new Error("Id is required");
    }
    const movie = await getMovieById(id);
    if (!movie) {
        throw new Error("Movie not found");
    }
    return movie;
}

export async function createMovieOperation(title, year, director, actors, genres, rating, description) {
    if (!title) throw new Error("Title is required");
    if (!year) throw new Error("Year is required");
    if (!director) throw new Error("Director is required");
    if (!actors) throw new Error("Actors are required");
    if (!genres) throw new Error("Genres are required");
    if (!rating) throw new Error("Rating is required");
    if (!description) throw new Error("Description is required");

    for (const actorId of actors) {
        const actor = await getActorById(actorId);
        if (!actor) throw new Error("Invalid actor ID");
    }
    for (const genreId of genres) {
        const genre = await getGenreById(genreId);
        if (!genre) throw new Error("Invalid genre ID");
    }
    const movie = await createMovie({ title, year, director, actors, genres, rating, description });
    return movie;
}

export async function updateMovieOperation(id, title, year, director, actorIds, genresIds, rating, description) {
    if (!title) throw new Error("Title is required");
    if (!year) throw new Error("Year is required");
    if (!director) throw new Error("Director is required");
    if (!actorIds) throw new Error("Actor IDs are required");
    if (!genresIds) throw new Error("Genres IDs are required");
    if (!rating) throw new Error("Rating is required");
    if (!description) throw new Error("Description is required");

    for (const actorId of actorIds) {
        const actor = await getActorById(actorId);
        if (!actor) throw new Error("Invalid actor ID");
    }
    for (const genreId of genresIds) {
        const genre = await getGenreById(genreId);
        if (!genre) throw new Error("Invalid genre ID");
    }
    const movie = await updateMovie(id, { title, year, director, actorIds, genresIds, rating, description });
    return movie;
}

export async function deleteMovieOperation(id) {
    if (!id) {
        throw new Error("Id is required");
    }
    const movie = await deleteMovie(id);
    return movie;
}