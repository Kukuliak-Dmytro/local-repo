# MongoDB Export Scripts

This directory contains two scripts to export data from your MongoDB collections to JSON files.

## Scripts

1. **`export-categories.js`** - Exports all categories from the MongoDB database
2. **`export-ingredients.js`** - Exports all ingredients from the MongoDB database

## Prerequisites

- Node.js installed
- MongoDB connection string set as environment variable
- Access to the MongoDB database

## Setup

1. Make sure your `MONGODB_CONNECTION_STRING` environment variable is set:
   ```bash
   # Windows
   set MONGODB_CONNECTION_STRING=your_mongodb_connection_string
   
   # Linux/Mac
   export MONGODB_CONNECTION_STRING=your_mongodb_connection_string
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

## Usage

### Export Categories
```bash
node export-categories.js
```

This will create a file called `categories-export.json` in the current directory.

### Export Ingredients
```bash
node export-ingredients.js
```

This will create a file called `ingredients-export.json` in the current directory.

**Note**: These scripts use ES modules. Make sure your `package.json` has `"type": "module"` or run the scripts with the `.mjs` extension.

## Output Format

Both scripts create JSON files with the following structure:

```json
{
  "exportDate": "2024-01-01T12:00:00.000Z",
  "totalCount": 5,
  "categories": [
    {
      "_id": "...",
      "name": "Category Name",
      "description": "Category Description"
    }
  ]
}
```

For ingredients:
```json
{
  "exportDate": "2024-01-01T12:00:00.000Z",
  "totalCount": 10,
  "ingredients": [
    {
      "_id": "...",
      "name": "Ingredient Name",
      "price": 5.99,
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## Error Handling

- If the `MONGODB_CONNECTION_STRING` environment variable is not set, the script will exit with an error
- If there's a connection error, the script will display the error and exit
- The database connection is properly closed after each export

## Notes

- The scripts use `.lean()` to get plain JavaScript objects instead of Mongoose documents for better JSON serialization
- Timestamps are included in the export for ingredients (createdAt, updatedAt)
- The export date is recorded in the output file for reference 