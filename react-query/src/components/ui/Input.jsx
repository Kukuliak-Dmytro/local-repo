import React from "react";

export default function Input({ type = "text", name, id, placeholder, value, onChange, className }) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`p-2 rounded-md bg-white pl-4 ${className}`}
        />
    );
} 