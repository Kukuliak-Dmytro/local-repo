import { Request, Response } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../services/books";
import { Book } from "../types/books";

const booksController = {
    getBooksHandler: async (req: Request, res: Response) => {
        try {
            console.log("[BooksController] Fetching all books");
            const books = await getBooks();
            console.log(`[BooksController] Successfully fetched ${books.length} books`);
            res.status(200).json(books);
        } catch (error) {
            console.error("[BooksController] Error fetching books:", error);
            if (error instanceof Error) {
                if (error.message === "No books found") {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    getBookByIdHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid book ID format. Must be a number." });
            }
            
            console.log(`[BooksController] Fetching book with ID: ${numericId}`);
            const book = await getBookById(numericId);
            console.log(`[BooksController] Successfully fetched book: ${book.title}`);
            res.status(200).json(book);
        } catch (error) {
            console.error(`[BooksController] Error fetching book with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    createBookHandler: async (req: Request, res: Response) => {
        const { title, author, publishedYear, pages, genre, rating, status, isFavorite } = req.body;
        try {
            if (!title || !author || !publishedYear || !pages || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "Missing required fields", 
                    required: ["title", "author", "publishedYear", "pages", "genre", "rating", "status", "isFavorite"],
                    received: { title, author, publishedYear, pages, genre, rating, status, isFavorite }
                });
            }
            
            console.log(`[BooksController] Creating new book: ${title}`);
            const book = await createBook({ title, author, publishedYear, pages, genre, rating, status, isFavorite } as Book);
            console.log(`[BooksController] Successfully created book with ID: ${book._id}`);
            res.status(201).json(book);
        } catch (error) {
            console.error("[BooksController] Error creating book:", error);
            if (error instanceof Error) {
                if (error.message === "All fields are required") {
                    return res.status(400).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    updateBookHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, author, publishedYear, pages, genre, rating, status, isFavorite } = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid book ID format. Must be a number." });
            }
            
            if (!title || !author || !publishedYear || !pages || !genre || rating === undefined || !status || isFavorite === undefined) {
                return res.status(400).json({ 
                    message: "Missing required fields", 
                    required: ["title", "author", "publishedYear", "pages", "genre", "rating", "status", "isFavorite"],
                    received: { title, author, publishedYear, pages, genre, rating, status, isFavorite }
                });
            }
            
            console.log(`[BooksController] Updating book with ID: ${numericId}`);
            const book = await updateBook(numericId, { title, author, publishedYear, pages, genre, rating, status, isFavorite } as Book);
            console.log(`[BooksController] Successfully updated book: ${book.title}`);
            res.status(200).json(book);
        } catch (error) {
            console.error(`[BooksController] Error updating book with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
                if (error.message === "All fields are required") {
                    return res.status(400).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    },
    
    deleteBookHandler: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: "Invalid book ID format. Must be a number." });
            }
            
            console.log(`[BooksController] Deleting book with ID: ${numericId}`);
            await deleteBook(numericId);
            console.log(`[BooksController] Successfully deleted book with ID: ${numericId}`);
            res.status(204).send();
        } catch (error) {
            console.error(`[BooksController] Error deleting book with ID ${id}:`, error);
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    return res.status(404).json({ message: error.message });
                }
            }
            res.status(500).json({ 
                message: "Internal server error", 
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
            });
        }
    }
}

export default booksController;