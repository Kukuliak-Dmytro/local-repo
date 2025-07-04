import http from "../utils/http";

export async function createTask(todoId, content){
    try{
        if(!todoId || !content){
            throw new Error("Todo ID and content are required")
        }
        const response = await http.post(`/todos/${todoId}/tasks`,{content})
        console.log("Task created successfully")
        console.log(response.data)
        return response.data
    }
    catch(e){
        console.error(e.message)
    }

}
export async function toggleTask(taskId, completed){
    try{
        if(!taskId){
            throw new Error("Task ID is required")
        }
        const response = await http.patch(`/tasks/${taskId}`,{completed})
        console.log("Task toggled successfully")
        console.log(response.data)
        return response.data
    }
    catch(e){
        console.error(e.message)
    }
}