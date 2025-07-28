import { Book } from "../types/books";
import { getCollection } from "../utils/client";

export async function getBooks(): Promise<Book[]> {
    try {
        console.log("[BooksService] Attempting to fetch all books from database");
        const collection = getCollection<Book>("books");
        const books = await collection.find({}).toArray();
        
        if (books.length === 0) {
            console.log("[BooksService] No books found in database");
            throw new Error("No books found");
        }
        
        console.log(`[BooksService] Successfully fetched ${books.length} books from database`);
        return books;
    } catch (error) {
        console.error("[BooksService] Database error while fetching books:", error);
        if (error instanceof Error && error.message === "No books found") {
            throw error;
        }
        throw new Error(`Failed to fetch books: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function getBookById(id: number): Promise<Book> {
    try {
        console.log(`[BooksService] Attempting to fetch book with ID: ${id}`);
        const collection = getCollection<Book>("books");
        const book = await collection.findOne({ _id: id });
        
        if (!book) {
            console.log(`[BooksService] Book with ID ${id} not found in database`);
            throw new Error(`Book with id ${id} not found`);
        }
        
        console.log(`[BooksService] Successfully fetched book: ${book.title} (ID: ${book._id})`);
        return book;
    } catch (error) {
        console.error(`[BooksService] Database error while fetching book with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to fetch book with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function createBook(book: Book): Promise<Book> {
    try {
        console.log(`[BooksService] Attempting to create book: ${book.title}`);
        
        // Validate required fields
        if (!book.title || !book.author || !book.publishedYear || !book.pages || !book.genre || book.rating === undefined || !book.status || book.isFavorite === undefined) {
            console.error("[BooksService] Validation failed: Missing required fields", { book });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof book.publishedYear !== 'number' || book.publishedYear < 1800 || book.publishedYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid published year: ${book.publishedYear}. Must be between 1800 and ${new Date().getFullYear() + 1}`);
        }
        
        if (typeof book.pages !== 'number' || book.pages <= 0) {
            throw new Error(`Invalid pages: ${book.pages}. Must be a positive number`);
        }
        
        if (typeof book.rating !== 'number' || book.rating < 0 || book.rating > 10) {
            throw new Error(`Invalid rating: ${book.rating}. Must be between 0 and 10`);
        }
        
        const collection = getCollection<Book>("books");
        const result = await collection.insertOne(book);
        
        const createdBook = { ...book, _id: result.insertedId as number };
        console.log(`[BooksService] Successfully created book with ID: ${createdBook._id}`);
        return createdBook;
    } catch (error) {
        console.error("[BooksService] Database error while creating book:", error);
        if (error instanceof Error && error.message === "All fields are required") {
            throw error;
        }
        throw new Error(`Failed to create book: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function updateBook(id: number, book: Book): Promise<Book> {
    try {
        console.log(`[BooksService] Attempting to update book with ID: ${id}`);
        
        // Validate required fields
        if (!book.title || !book.author || !book.publishedYear || !book.pages || !book.genre || book.rating === undefined || !book.status || book.isFavorite === undefined) {
            console.error("[BooksService] Validation failed: Missing required fields", { book });
            throw new Error("All fields are required");
        }
        
        // Additional validation
        if (typeof book.publishedYear !== 'number' || book.publishedYear < 1800 || book.publishedYear > new Date().getFullYear() + 1) {
            throw new Error(`Invalid published year: ${book.publishedYear}. Must be between 1800 and ${new Date().getFullYear() + 1}`);
        }
        
        if (typeof book.pages !== 'number' || book.pages <= 0) {
            throw new Error(`Invalid pages: ${book.pages}. Must be a positive number`);
        }
        
        if (typeof book.rating !== 'number' || book.rating < 0 || book.rating > 10) {
            throw new Error(`Invalid rating: ${book.rating}. Must be between 0 and 10`);
        }
        
        const collection = getCollection<Book>("books");
        const result = await collection.updateOne({ _id: id }, { $set: book });
        
        if (result.matchedCount === 0) {
            console.log(`[BooksService] Book with ID ${id} not found for update`);
            throw new Error(`Book with id ${id} not found`);
        }
        
        const updatedBook = { ...book, _id: id };
        console.log(`[BooksService] Successfully updated book: ${updatedBook.title} (ID: ${updatedBook._id})`);
        return updatedBook;
    } catch (error) {
        console.error(`[BooksService] Database error while updating book with ID ${id}:`, error);
        if (error instanceof Error && (error.message === "All fields are required" || error.message.includes("not found"))) {
            throw error;
        }
        throw new Error(`Failed to update book with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}

export async function deleteBook(id: number): Promise<void> {
    try {
        console.log(`[BooksService] Attempting to delete book with ID: ${id}`);
        const collection = getCollection<Book>("books");
        const result = await collection.deleteOne({ _id: id });
        
        if (result.deletedCount === 0) {
            console.log(`[BooksService] Book with ID ${id} not found for deletion`);
            throw new Error(`Book with id ${id} not found`);
        }
        
        console.log(`[BooksService] Successfully deleted book with ID: ${id}`);
    } catch (error) {
        console.error(`[BooksService] Database error while deleting book with ID ${id}:`, error);
        if (error instanceof Error && error.message.includes("not found")) {
            throw error;
        }
        throw new Error(`Failed to delete book with ID ${id}: ${error instanceof Error ? error.message : 'Unknown database error'}`);
    }
}
