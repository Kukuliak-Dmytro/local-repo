const axios = require('axios');

// Restaurant dish categories with descriptions
const categories = [
    { name: "Сніданки", description: "Традиційні та сучасні страви для ранкового прийому їжі" },
    { name: "Салати", description: "Свіжі та легкі салати з овочів та зелени" },
    { name: "Супи", description: "Гарячі та холодні супи різних кухонь світу" },
    { name: "Гарячі страви", description: "Основні страви з м'яса, риби та овочів" },
    { name: "Риба та морепродукти", description: "Страви з свіжої риби, креветок та інших морських дарунків" },
    { name: "М'ясні страви", description: "Страви з яловичини, свинини, баранини та птиці" },
    { name: "Паста та макарони", description: "Італійські та європейські страви з пасти" },
    { name: "Піца", description: "Класична та авторська піца з різними начинками" },
    { name: "Бургери", description: "Смачні бургери з натурального м'яса та свіжих овочів" },
    { name: "Суші та роли", description: "Традиційні японські суші та роли" },
    { name: "Гарніри", description: "Рис, гречка, картопля та інші гарніри" },
    { name: "Соуси та діпи", description: "Різноманітні соуси для доповнення страв" },
    { name: "Десерти", description: "Солодкі страви та випічка" },
    { name: "Напої", description: "Гарячі та холодні напої, коктейлі" },
    { name: "Алкогольні напої", description: "Вино, пиво, коктейлі та інші алкогольні напої" },
    { name: "Вегетаріанські страви", description: "Страви без м'яса для вегетаріанців" },
    { name: "Веганські страви", description: "Страви без продуктів тваринного походження" },
    { name: "Безглютенові страви", description: "Страви без глютену для людей з ціакією" },
    { name: "Дитяче меню", description: "Спеціальні страви для дітей" },
    { name: "Закуски", description: "Легкі закуски та фуршетні страви" },
    { name: "Сендвічі", description: "Різноманітні сендвічі та тости" },
    { name: "Страви на грилі", description: "М'ясо, риба та овочі, приготовані на грилі" },
    { name: "Страви в духовці", description: "Запіканки та страви, приготовані в духовці" },
    { name: "Страви на пару", description: "Здорові страви, приготовані на пару" },
    { name: "Страви вок", description: "Азійські страви, приготовані в воку" },
    { name: "Страви барбекю", description: "Страви, приготовані на барбекю" },
    { name: "Сезонні страви", description: "Страви з сезонних продуктів" },
    { name: "Авторські страви", description: "Унікальні страви від нашого шеф-кухара" }
];

async function populateCategories() {
    console.log('Starting to populate categories...');
    
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        
        try {
            const response = await axios.post('http://localhost:3000/categories', {
                name: category.name,
                description: category.description
            });
            
            console.log(`✅ Added: ${category.name} - ${category.description} (ID: ${response.data._id})`);
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ Failed to add ${category.name}:`, error.response?.data || error.message);
        }
    }
    
    console.log('Finished populating categories!');
}

// Run the population script
populateCategories().catch(console.error); 