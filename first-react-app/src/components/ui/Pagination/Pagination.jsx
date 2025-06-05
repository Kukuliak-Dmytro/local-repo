import './Pagination.css';
import { useEffect } from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    useEffect(() => {
        console.log("Current page changed to: ", currentPage);
    }, [currentPage]);
    
    // Generate an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div className="pagination">
                  
            {/* Page number buttons */}
            {pageNumbers.map(number => (
                <button 
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={currentPage === number ? "active" : ""}
                >
                    {number}
                </button>
            ))}
            
            
        </div>
    )
}