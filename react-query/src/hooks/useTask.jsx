import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { queryClient } from "../main";
export default function useTask(Todo, tasks, setTasks, setFormData) {
    const { mutate: createTaskMutation } = useMutation({
        mutationKey: ['createTask', Todo.id],
        mutationFn: async (content) => {
            try {
                if (!Todo.id || !content) {
                    throw new Error("Todo ID and content are required")
                }
                const response = await http.post(`/todos/${Todo.id}/tasks`, { content })
                console.log("Task created successfully")
                console.log(response.data)
                return response.data
            }
            catch (e) {
                console.error(e.message)
            }

        },
        onSuccess: (data) => {
            setTasks([...tasks, data])
            setFormData({ content: "" })
        },
        onError: (error) => {
            console.error(error.message)
        }
    })
    const { mutate: toggleTaskMutation } = useMutation({
        mutationKey: ['toggleTask', Todo.id],
        mutationFn: async ({ taskId, completed }) => {
                try {
                    setTasks(tasks.map((task)=>task.id === taskId ? {...task, completed: !task.completed} : task))
                    if (!taskId) {
                        throw new Error("Task ID is required")
                    }
                    const response = await http.patch(`/tasks/${taskId}`, { completed })
                    console.log("Task toggled successfully")
                    console.log(response.data)
                    return response.data
                }
                catch (e) {
                    console.error(e.message)
                }
        },
       
        onError: (error) => {
            console.error(error.message)
            toggleTaskMutation.reset()
        }
    })

    const {mutate:updateTaskMutation} = useMutation({
        mutationKey: ['updateTask', Todo.id],
        mutationFn: async (taskId, content) => {
            try{
                setTasks(tasks.map((task)=>task.id === taskId ? {...task, content} : task))
                const response = await http.patch(`/tasks/${taskId}`, { content })
                console.log("Task updated successfully")
                console.log(response.data)
                return response.data
            }
            catch(e){
                console.error(e.message)
            }
        }
    })

    const {mutate:deleteTaskMutation} = useMutation({
        mutationKey: ['deleteTask', Todo.id],
        mutationFn: async (taskId) => {
            setTasks(tasks.filter(task => task.id !== taskId));
            try{
                const response = await http.delete(`/tasks/${taskId}`)
                console.log("Task deleted successfully")
                console.log(response.data)
                return response.data
            }
            catch(e){
                console.error(e.message)
            }
        },
        onSuccess: (data, taskId) => {
            queryClient.invalidateQueries({queryKey:['getTodos']});
        },
        onError: (error) => {
            console.error(error.message)
        }
    })
    return { createTaskMutation, toggleTaskMutation, deleteTaskMutation, updateTaskMutation }
}

