import React from "react";

export default function Button({ children, className, type="button"}) {
    return (
        <button
            className={`hover:scale-105 bg-amber-500 cursor-pointer text-white p-2 rounded-md transition-all duration-300 ${className}`}
            type={type}
        >
            {children}
        </button>
    );
} 