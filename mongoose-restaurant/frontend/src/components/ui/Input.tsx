import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isEditing?: boolean;
    label?: string;
}

export default function Input({isEditing,label, className, ...props}:InputProps){
    const isEditingClasses="border-1 ring-1 ring-amber-500 focus outline-0 placeholder:text-black"
        return (
            <div className={`rounded-md flex flex-col justify-start`}>
                <label htmlFor={props.id} className="text-xs pl-2">{label}</label>
                <input className={`${isEditing ? isEditingClasses : ""} ${className} outline-0 disabled rounded-md flex justify-center items-center w-full h-full p-2`} 
                {...props} />
            </div>
        )
    
    
}