import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection string from environment variable
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_CONNECTION_STRING) {
    console.error('Error: MONGODB_CONNECTION_STRING environment variable is required');
    process.exit(1);
}

// Define the Category schema and model (since we're in a .js file)
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Category = mongoose.model("Category", categorySchema);

async function exportCategories() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log('Connected to MongoDB successfully');

        // Fetch all categories
        console.log('Fetching categories...');
        const categories = await Category.find({}).lean();
        console.log(`Found ${categories.length} categories`);

        // Convert to JSON format
        const categoriesData = {
            exportDate: new Date().toISOString(),
            totalCount: categories.length,
            categories: categories
        };

        // Write to JSON file
        const outputPath = path.join(__dirname, 'categories-export.json');
        await fs.writeFile(outputPath, JSON.stringify(categoriesData, null, 2), 'utf8');
        
        console.log(`Categories exported successfully to: ${outputPath}`);
        console.log(`Total categories exported: ${categories.length}`);

    } catch (error) {
        console.error('Error exporting categories:', error);
        process.exit(1);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the export function
exportCategories(); 