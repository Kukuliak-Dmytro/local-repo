import { useState, useEffect } from "react"
import useFormState from "../../hooks/useFormState"
import Input from "../ui/Input"
export default function TaskCard({ item, handleToggle, updateTaskMutation, deleteTaskMutation }) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData, handleChange] = useFormState({ "content": item.content })
 
    return (
        <li key={item.id} className="flex gap-2 items-center justify-between">
            <label htmlFor={item.id} className='cursor-pointer flex gap-2 items-center justify-between bg-gray-100 w-full hover:scale-105 transition-all duration-300 p-2 rounded-md'>
                <span className="flex gap-2 items-center">
                    <input type="checkbox" name="checkbox" id={item.id} checked={item.completed} onChange={() => handleToggle(item.id, !item.completed)} />
                    <span >
                        <Input type="text" name="content" value={formData.content} onChange={handleChange} isEditing={isEditing} readOnly={!isEditing} />
                    </span>
                </span>
                <span className="flex gap-2">
                    {isEditing ? (
                        <button onClick={() => {
                            setIsEditing(false)
                            updateTaskMutation(item.id, formData.content)
                        }} className=" hover:scale-105 transition-all duration-300 cursor-pointer text-white bg-amber-300 px-2 py-1 rounded-md">Save</button>
                    ) : (
                        <button onClick={() => {
                            setIsEditing(true)
                        }} className=" hover:scale-105 transition-all duration-300 cursor-pointer text-white bg-amber-300 px-2 py-1 rounded-md">Edit</button>
                    )}
                    <button onClick={() => deleteTaskMutation(item.id)} className=" hover:scale-105 transition-all duration-300 cursor-pointer bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                </span>
            </label>
        </li>
    )
}