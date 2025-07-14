import Input  from "../ui/Input";
import Button from "../ui/Button";
import useFormState from "../../hooks/useFormState";
import { useState } from "react";
import useTask from "../../hooks/useTask";
import TaskCard from "./TaskCard";
import useTodos from "../../hooks/useTodos";
export default function TodoCard({ Todo }) {
    const [formData, setFormData, handleChange] = useFormState({"content":""})
    const [tasks, setTasks]=useState(Todo.tasks)
    const [isEditing, setIsEditing]=useState(false)
    const {createTaskMutation, toggleTaskMutation, deleteTaskMutation, updateTaskMutation} = useTask(Todo, tasks, setTasks, setFormData)
    const {deleteTodoMutation} = useTodos()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            createTaskMutation(formData.content)
        }
        catch(e){
            console.error(e.message)
        }
    }
    const handleToggle = async(taskId, completed)=>{
        try{
            
            // Then make server call
            toggleTaskMutation({taskId, completed})
        }
        catch(e){
            // Revert optimistic update on error
            setTasks(tasks.map((task)=>task.id === taskId ? {...task, completed: !completed} : task))
            console.error(e.message)
        }
    }
    return (
        <div className="flex flex-col gap-2 items-center justify-center p-6 border-2 border-amber-300 rounded-md bg-gray-200 w-full relative">
            <h1 className="text-2xl font-bold">{Todo.title}</h1>
            <p>{Todo.description}</p>
            <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
                <Input id="content" name="content" type="text" placeholder="Add a task" className="w-full" value={formData.content} onChange={handleChange} />
                <Button type="submit" className='whitespace-nowrap'>Add Task</Button>
            </form>
            <ul className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md w-full">
                {tasks.map((item)=>(
                    <TaskCard key={item.id} item={item} handleToggle={handleToggle} updateTaskMutation={updateTaskMutation} deleteTaskMutation={deleteTaskMutation} />
                ))}
            </ul>
            <button className='absolute top-4 right-4 cursor-pointer bg-red-500 px-2 py-1 rounded-sm text-white flex items-center justify-center' onClick={()=>deleteTodoMutation(Todo.id)}>
            &#10005;
            </button>
        </div>
    )
}