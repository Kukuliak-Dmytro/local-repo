const axios = require('axios');
const fs = require('fs');

// Import the exported data
const categoriesData = JSON.parse(fs.readFileSync('./categories-export.json', 'utf8'));
const ingredientsData = JSON.parse(fs.readFileSync('./ingredients-export.json', 'utf8'));

// Helper function to find category ID by name
function findCategoryId(categoryName) {
    const category = categoriesData.categories.find(cat => cat.name === categoryName);
    return category ? category._id : null;
}

// Helper function to find ingredient IDs by names
function findIngredientIds(ingredientNames) {
    return ingredientNames.map(name => {
        const ingredient = ingredientsData.ingredients.find(ing => ing.name === name);
        return ingredient ? ingredient._id : null;
    }).filter(id => id !== null);
}

// First batch of 5 dishes
const dishes = [
    {
        name: "Борщ український",
        categories: ["Супи"],
        ingredients: ["Цибуля", "Морква", "Капуста", "Свинина", "Сметана", "Часник", "Сіль", "Перець чорний"],
        description: "Традиційний український борщ зі свіжих овочів та свинини",
        country: "Україна",
        price: 180
    },
    {
        name: "Цезар салат",
        categories: ["Салати"],
        ingredients: ["Помідори", "Огірки", "Курятина філе", "Сир твердий", "Хліб", "Олія оливкова", "Сіль", "Перець чорний"],
        description: "Класичний салат Цезар з курячим філе та пармезаном",
        country: "Італія",
        price: 220
    },
    {
        name: "Піца Маргарита",
        categories: ["Піца"],
        ingredients: ["Борошно", "Помідори", "Сир моцарела", "Базілік", "Олія оливкова", "Сіль"],
        description: "Класична італійська піца з томатами та моцарелою",
        country: "Італія",
        price: 280
    },
    {
        name: "Стейк з яловичини",
        categories: ["М'ясні страви", "Страви на грилі"],
        ingredients: ["Яловичина", "Олія оливкова", "Часник", "Розмарин", "Сіль", "Перець чорний"],
        description: "Смажений стейк з яловичини з ароматними травами",
        country: "США",
        price: 450
    },
    {
        name: "Лосось на грилі",
        categories: ["Риба та морепродукти", "Страви на грилі"],
        ingredients: ["Риба лосось", "Лимон", "Олія оливкова", "Часник", "Петрушка", "Сіль", "Перець чорний"],
        description: "Свіжий лосось, приготований на грилі з лимоном та травами",
        country: "Норвегія",
        price: 380
    },
    {
        name: "Паста Карбонара",
        categories: ["Паста та макарони"],
        ingredients: ["Макарони", "Яйця", "Сир твердий", "Свинина", "Часник", "Перець чорний", "Сіль"],
        description: "Класична італійська паста з яйцями, сиром та беконом",
        country: "Італія",
        price: 240
    },
    {
        name: "Бургер Класичний",
        categories: ["Бургери"],
        ingredients: ["Хліб", "Яловичина", "Сир твердий", "Помідори", "Огірки", "Капуста", "Майонез", "Кетчуп"],
        description: "Смачний бургер з натуральної яловичини та свіжих овочів",
        country: "США",
        price: 320
    },
    {
        name: "Суші Філадельфія",
        categories: ["Суші та роли"],
        ingredients: ["Рис", "Риба лосось", "Сир твердий", "Норі", "Васабі", "Імбир"],
        description: "Популярний рол з лососем та сиром у стилі Філадельфія",
        country: "Японія",
        price: 420
    },
    {
        name: "Тірамісу",
        categories: ["Десерти"],
        ingredients: ["Яйця", "Цукор", "Масло вершкове", "Ваніль", "Кориця", "Борошно"],
        description: "Класичний італійський десерт з кави та маскарпоне",
        country: "Італія",
        price: 180
    },
    {
        name: "Грецький салат",
        categories: ["Салати", "Вегетаріанські страви"],
        ingredients: ["Помідори", "Огірки", "Оливки", "Сир твердий", "Олія оливкова", "Орегано", "Сіль"],
        description: "Свіжий грецький салат з фетою та оливками",
        country: "Греція",
        price: 160
    }
];

async function populateDishes() {
    console.log('Starting to populate dishes...');
    
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        
        // Find category IDs
        const categoryIds = dish.categories.map(catName => findCategoryId(catName)).filter(id => id !== null);
        
        // Find ingredient IDs
        const ingredientIds = findIngredientIds(dish.ingredients);
        
        console.log(`Processing ${dish.name}:`);
        console.log(`  Categories: ${dish.categories.join(', ')} -> IDs: ${categoryIds.join(', ')}`);
        console.log(`  Ingredients: ${dish.ingredients.join(', ')} -> IDs: ${ingredientIds.join(', ')}`);
        
        if (categoryIds.length === 0) {
            console.error(`❌ No categories found for dish: ${dish.name}`);
            continue;
        }
        
        if (ingredientIds.length === 0) {
            console.error(`❌ No ingredients found for dish: ${dish.name}`);
            continue;
        }
        
        try {
            const response = await axios.post('http://localhost:3000/dishes', {
                name: dish.name,
                categories: categoryIds,
                ingredients: ingredientIds,
                description: dish.description,
                country: dish.country,
                price: dish.price
            });
            
            console.log(`✅ Added: ${dish.name} - ${dish.description} (Price: ${dish.price} грн) (ID: ${response.data._id})`);
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ Failed to add ${dish.name}:`, error.response?.data || error.message);
            if (error.response?.status) {
                console.error(`Status: ${error.response.status}`);
            }
        }
    }
    
    console.log('Finished populating dishes!');
}

// Run the population script
populateDishes().catch(console.error); 