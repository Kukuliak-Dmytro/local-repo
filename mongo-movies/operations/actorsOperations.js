import { getActors, getActorById, createActor, updateActor, deleteActor } from "../services/actorsService.js";

export async function getActorsOperation(){
    const actors = await getActors();
    return actors;

}

export async function getActorByIdOperation(id){
    if(!id){
        throw new Error("Id is required");
    }
    const actor = await getActorById(id);
    if(!actor){
        throw new Error("Actor not found");
    }
    return actor;
}

export async function createActorOperation(name, birthYear,nationality,famousFor){
    if(!name){
        throw new Error("Name is required");
    }
    if(!birthYear){
        throw new Error("Birth year is required");
    }
    if(!nationality){
        throw new Error("Nationality is required");
    }
    if(!famousFor){
        throw new Error("Famous for is required");
    }
    const actor = await createActor({name, birthYear,nationality,famousFor});
    return actor;
}
export async function updateActorOperation(id, name, birthYear,nationality,famousFor){
    if(!id){
        throw new Error("Id is required");
    }
    if(!name){
        throw new Error("Name is required");
    }
    if(!birthYear){
        throw new Error("Birth year is required");
    }
    if(!nationality){
        throw new Error("Nationality is required");
    }
    if(!famousFor){
        throw new Error("Famous for is required");
    }
    const actor = await updateActor(id, {name, birthYear,nationality,famousFor});
    return actor;
}

export async function deleteActorOperation(id){
    if(!id){
        throw new Error("Id is required");
    }

    const genre = await deleteGenre(id);
    return genre;
}
