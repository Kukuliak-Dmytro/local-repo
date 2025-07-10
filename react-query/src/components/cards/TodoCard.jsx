import Input  from "../ui/Input";
import Button from "../ui/Button";
import useFormState from "../../hooks/useFormState";
import { useState } from "react";
import useTask from "../../hooks/useTask";
export default function TodoCard({ Todo }) {
    const [formData, setFormData, handleChange] = useFormState({"content":""})
    const [tasks, setTasks]=useState(Todo.tasks)
    const [isEditing, setIsEditing]=useState(false)
    const {createTaskMutation, toggleTaskMutation, deleteTaskMutation, updateTaskMutation} = useTask(Todo, tasks, setTasks, setFormData)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            createTaskMutation(formData.content)
        }
        catch(e){
            console.error(e.message)
        }
    }
    const handleToggle = async( taskId, completed)=>{
        try{
            
            // Then make server call
            toggleTaskMutation(taskId, completed)
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
            <ul className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md w-full">
                {tasks.map((item)=>(
                    <li key={item.id} className="flex gap-2 items-center justify-between">
                        <label htmlFor={item.id} className='cursor-pointer flex gap-2 items-center justify-between bg-gray-100 w-full hover:scale-105 transition-all duration-300 p-2 rounded-md'>
                            <span className="flex gap-2 items-center">
                                <input type="checkbox" name="checkbox" id={item.id} checked={item.completed} onChange={()=>handleToggle(item.id, !item.completed)} />
                                <span >
                                    <Input type="text" name="content" id={item.id} value={item.content} onChange={handleChange} isEditing={isEditing} />
                                </span>
                            </span>
                            <span className="flex gap-2">
                                {isEditing ? (
                                    <button onClick={()=>{
                                        setIsEditing(false)
                                        updateTaskMutation(item.id, item.content)
                                    }} className=" hover:scale-105 transition-all duration-300 cursor-pointer text-white bg-amber-300 px-2 py-1 rounded-md">Save</button>
                                ) : (
                                    <button onClick={()=>{
                                        setIsEditing(true)
                                    }} className=" hover:scale-105 transition-all duration-300 cursor-pointer text-white bg-amber-300 px-2 py-1 rounded-md">Edit</button>
                                )}
                                <button onClick={()=>deleteTaskMutation(item.id)} className=" hover:scale-105 transition-all duration-300 cursor-pointer bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                            </span>
                        </label>
                    </li>

                ))}
            </ul>
        </div>
    )
}