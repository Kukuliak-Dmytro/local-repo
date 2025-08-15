import React from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
    // Don't render if only one page
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        
        // Always show first page
        pages.push(1);
        
        // Calculate range around current page
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);
        
        // Add left ellipsis if needed
        if (startPage > 2) {
            pages.push('...');
        }
        
        // Add middle pages (including current page)
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        // Add right ellipsis if needed
        if (endPage < totalPages - 1) {
            pages.push('...');
        }
        
        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600 hover:scale-105"
                }`}
                aria-label="Previous page"
            >
                Previous
            </button>

            {pageNumbers.map((page, index) => (
                <button
                    key={`${page}-${index}`}
                    onClick={() => handlePageClick(page)}
                    disabled={page === '...'}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 min-w-[40px] ${
                        page === currentPage
                            ? "bg-amber-500 text-white scale-105"
                            : page === '...'
                            ? "text-gray-500 cursor-default border-gray-300"
                            : "border border-amber-500 text-amber-500 hover:bg-amber-50 hover:scale-105"
                    }`}
                    aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600 hover:scale-105"
                }`}
                aria-label="Next page"
            >
                Next
            </button>
        </div>
    );
}
