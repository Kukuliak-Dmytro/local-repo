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

// Define the Ingredient schema and model (since we're in a .js file)
const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true   // Add timestamps for better tracking
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

async function exportIngredients() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log('Connected to MongoDB successfully');

        // Fetch all ingredients
        console.log('Fetching ingredients...');
        const ingredients = await Ingredient.find({}).lean();
        console.log(`Found ${ingredients.length} ingredients`);

        // Convert to JSON format
        const ingredientsData = {
            exportDate: new Date().toISOString(),
            totalCount: ingredients.length,
            ingredients: ingredients
        };

        // Write to JSON file
        const outputPath = path.join(__dirname, 'ingredients-export.json');
        await fs.writeFile(outputPath, JSON.stringify(ingredientsData, null, 2), 'utf8');
        
        console.log(`Ingredients exported successfully to: ${outputPath}`);
        console.log(`Total ingredients exported: ${ingredients.length}`);

    } catch (error) {
        console.error('Error exporting ingredients:', error);
        process.exit(1);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the export function
exportIngredients(); 