const axios = require('axios');

// Function to generate random stock between 0 and 100
function getRandomStock() {
    return Math.floor(Math.random() * 101); // 0 to 100 inclusive
}

async function updateIngredientsStock() {
    console.log('Starting to update ingredients with stock values...');
    
    try {
        let allIngredients = [];
        let page = 1;
        let hasMorePages = true;
        const limit = 50; // Fetch 50 ingredients per page
        
        // Fetch all ingredients across all pages
        while (hasMorePages) {
            console.log(`Fetching page ${page}...`);
            const response = await axios.get(`http://localhost:3000/ingredients?page=${page}&limit=${limit}`);
            const data = response.data;
            
            // Handle different response structures
            const ingredients = data.data || data.ingredients || data;
            
            if (!ingredients || ingredients.length === 0) {
                hasMorePages = false;
                break;
            }
            
            allIngredients = allIngredients.concat(ingredients);
            console.log(`Fetched ${ingredients.length} ingredients from page ${page}`);
            
            // If we got fewer ingredients than the limit, we've reached the end
            if (ingredients.length < limit) {
                hasMorePages = false;
            }
            
            page++;
            
            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log(`\nTotal ingredients found: ${allIngredients.length}`);
        console.log('Starting to update ingredients with stock values...\n');
        
        // Update all ingredients with random stock values
        for (let i = 0; i < allIngredients.length; i++) {
            const ingredient = allIngredients[i];
            const randomStock = getRandomStock();
            
            try {
                const updateResponse = await axios.put(`http://localhost:3000/ingredients/${ingredient._id}`, {
                    name: ingredient.name,
                    price: ingredient.price,
                    stock: randomStock
                });
                
                console.log(`✅ Updated: ${ingredient.name} - Stock: ${randomStock} (ID: ${ingredient._id})`);
                
                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error(`❌ Failed to update ${ingredient.name}:`, error.response?.data || error.message);
            }
        }
        
        console.log(`\nFinished updating ${allIngredients.length} ingredients with stock values!`);
        
    } catch (error) {
        console.error('❌ Failed to fetch ingredients:', error.response?.data || error.message);
    }
}

// Run the update script
updateIngredientsStock().catch(console.error); 