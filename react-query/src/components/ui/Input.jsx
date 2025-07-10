import React from "react";

export default function Input({ type = "text", name, id, placeholder, value, onChange, className, isEditing=false }) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange} 
            className={`p-2 rounded-md bg-white pl-4 ${isEditing ? "border-2 border-amber-300" : "border-2 border-gray-300"} ${className}`}
        />
    );
} 