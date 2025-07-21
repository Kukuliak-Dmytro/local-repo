import { getGenres, getGenreById, createGenre, updateGenre, deleteGenre } from "../services/genreService.js";

export async function getGenresOperation(){
    const genres = await getGenres();
    return genres;

}

export async function getGenreByIdOperation(id){
    if(!id){
        throw new Error("Id is required");
    }
    const genre = await getGenreById(id);
    if(!genre){
        throw new Error("Genre not found");
    }
    return genre;
}

export async function createGenreOperation(name, description){
    if(!name){
        throw new Error("Name is required");
    }
    if(!description){
        throw new Error("Description is required");
    }
    const genre = await createGenre({name, description});
    return genre;
}
export async function updateGenreOperation(id, name, description){
    if(!id){
        throw new Error("Id is required");
    }
    if(!name){
        throw new Error("Name is required");
    }
    if(!description){
        throw new Error("Description is required");
    }

    const genre = await updateGenre(id, {name, description});
    return genre;
}

export async function deleteGenreOperation(id){
    if(!id){
        throw new Error("Id is required");
    }

    const genre = await deleteGenre(id);
    return genre;
}
