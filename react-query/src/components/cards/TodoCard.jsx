import Input  from "../ui/Input";
import Button from "../ui/Button";
import { createTask } from "../../services/tasks";
import useFormState from "../../hooks/useFormState";
import { useState } from "react";
import { toggleTask } from "../../services/tasks";
export default function TodoCard({ Todo }) {
    const [formData, setFormData, handleChange] = useFormState({"content":""})
    const [tasks, setTasks]=useState(Todo.tasks)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const newTask = await createTask(Todo.id, formData.content)
            setFormData({content:""})
            setTasks([...tasks, newTask])
        }
        catch(e){
            console.error(e.message)
        }
    }
    const handleToggle = async( taskId, completed)=>{
        try{
            // Optimistically update UI first
            const optimisticTask = tasks.find(task => task.id === taskId)
            const optimisticUpdate = {...optimisticTask, completed: completed}
            setTasks(tasks.map((task)=>task.id === taskId ? optimisticUpdate : task))
            
            // Then make server call
            const updatedTask = await toggleTask(taskId, completed)
        }
        catch(e){
            // Revert optimistic update on error
            setTasks(tasks.map((task)=>task.id === taskId ? {...task, completed: !completed} : task))
            console.error(e.message)
        }
    }
    return (
        <div className="flex flex-col gap-2 items-center justify-center p-6 border-2 border-amber-300 rounded-md bg-gray-200 w-full">
            <h1 className="text-2xl font-bold">{Todo.title}</h1>
            <p>{Todo.description}</p>
            <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
                <Input id="content" name="content" type="text" placeholder="Add a task" className="w-full" value={formData.content} onChange={handleChange} />
                <Button type="submit" className='whitespace-nowrap'>Add Task</Button>
            </form>
            <ul className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md">
                {tasks.map((item)=>(
                    <li key={item.id} className="flex gap-2 items-center">
                        <input type="checkbox" name="checkbox" id={item.id} checked={item.completed} onChange={()=>handleToggle(item.id, !item.completed)} />
                        {item.content}
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                    </li>

                ))}
            </ul>
        </div>
    )
}