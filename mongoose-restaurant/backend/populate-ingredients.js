const axios = require('axios');

// Essential restaurant ingredients with realistic prices in Ukrainian hryvnas
const ingredients = [
    { name: "Картопля", price: 25 },
    { name: "Цибуля", price: 15 },
    { name: "Морква", price: 18 },
    { name: "Помідори", price: 45 },
    { name: "Огірки", price: 35 },
    { name: "Капуста", price: 20 },
    { name: "Перець болгарський", price: 40 },
    { name: "Часник", price: 30 },
    { name: "Петрушка", price: 25 },
    { name: "Кріп", price: 20 },
    { name: "Базілік", price: 35 },
    { name: "Розмарин", price: 50 },
    { name: "Орегано", price: 40 },
    { name: "Лавровий лист", price: 15 },
    { name: "Сіль", price: 8 },
    { name: "Перець чорний", price: 25 },
    { name: "Олія соняшникова", price: 35 },
    { name: "Олія оливкова", price: 120 },
    { name: "Борошно", price: 30 },
    { name: "Яйця", price: 45 },
    { name: "Молоко", price: 40 },
    { name: "Сир твердий", price: 180 },
    { name: "Сир моцарела", price: 200 },
    { name: "Сметана", price: 35 },
    { name: "Масло вершкове", price: 85 },
    { name: "Курятина філе", price: 120 },
    { name: "Свинина", price: 140 },
    { name: "Яловичина", price: 200 },
    { name: "Риба лосось", price: 350 },
    { name: "Креветки", price: 280 },
    { name: "Гриби печериці", price: 60 },
    { name: "Рис", price: 25 },
    { name: "Гречка", price: 35 },
    { name: "Макарони", price: 20 },
    { name: "Хліб", price: 15 },
    { name: "Лимон", price: 25 },
    { name: "Лайм", price: 30 },
    { name: "Мед", price: 150 },
    { name: "Цукор", price: 18 },
    { name: "Ваніль", price: 80 },
    { name: "Кориця", price: 45 },
    { name: "Імбир", price: 55 },
    { name: "Куркума", price: 40 },
    { name: "Паприка", price: 35 },
    { name: "Чілі перець", price: 50 },
    { name: "Кмин", price: 30 },
    { name: "Кориандр", price: 25 },
    { name: "Шафран", price: 800 },
    { name: "Трюфель", price: 2500 },
    { name: "Ікра червона", price: 1200 },
    { name: "Фуа гра", price: 1800 },
    { name: "Трюфельна олія", price: 450 },
    { name: "Бальзамічний оцет", price: 200 },
    { name: "Соя соус", price: 45 },
    { name: "Вустерширський соус", price: 85 },
    { name: "Табаско", price: 65 },
    { name: "Кетчуп", price: 25 },
    { name: "Майонез", price: 30 },
    { name: "Гірчиця", price: 35 },
    { name: "Хрін", price: 40 },
    { name: "Васабі", price: 120 },
    { name: "Норі", price: 80 },
    { name: "Місо паста", price: 95 },
    { name: "Кімчі", price: 75 },
    { name: "Квашена капуста", price: 25 },
    { name: "Оливки", price: 90 },
    { name: "Каперси", price: 110 },
    { name: "Анчоуси", price: 180 },
    { name: "Тунець", price: 220 },
    { name: "Скумбрія", price: 85 },
    { name: "Сельдь", price: 65 },
    { name: "Ікра мінтая", price: 95 },
    { name: "Краб", price: 320 },
    { name: "Мідії", price: 140 },
    { name: "Кальмари", price: 180 },
    { name: "Восьминіг", price: 450 },
    { name: "Морський гребінець", price: 380 },
    { name: "Лобстер", price: 650 },
    { name: "Устриці", price: 280 },
    { name: "Раки", price: 220 },
    { name: "Лящ", price: 95 },
    { name: "Судак", price: 160 },
    { name: "Щука", price: 120 },
    { name: "Карась", price: 85 },
    { name: "Короп", price: 75 },
    { name: "Форель", price: 180 },
    { name: "Осетер", price: 1200 },
    { name: "Белуга", price: 2500 },
    { name: "Севрюга", price: 1800 },
    { name: "Стерлядь", price: 2200 }
];

async function populateIngredients() {
    console.log('Starting to populate ingredients...');
    
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        
        try {
            const response = await axios.post('http://localhost:3000/ingredients', {
                name: ingredient.name,
                price: ingredient.price
            });
            
            console.log(`✅ Added: ${ingredient.name} - ${ingredient.price} грн (ID: ${response.data._id})`);
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ Failed to add ${ingredient.name}:`, error.response?.data || error.message);
        }
    }
    
    console.log('Finished populating ingredients!');
}

// Run the population script
populateIngredients().catch(console.error); 