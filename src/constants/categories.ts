import { Category } from '@root/types';

export const categories: Category[] = [
    // Dish Types
    { id: 'breakfast', name: 'Завтраки', group: 'DishType' },
    { id: 'soups', name: 'Супы', group: 'DishType' },
    { id: 'salads', name: 'Салаты', group: 'DishType' },
    { id: 'main_dishes', name: 'Основные блюда', group: 'DishType' },
    { id: 'side_dishes', name: 'Гарниры', group: 'DishType' },
    { id: 'desserts', name: 'Десерты', group: 'DishType' },
    { id: 'baking', name: 'Выпечка', group: 'DishType' },
    { id: 'drinks', name: 'Напитки', group: 'DishType' },
    { id: 'snacks', name: 'Закуски', group: 'DishType' },
    { id: 'sauces', name: 'Соусы и дипы', group: 'DishType' },

    // World Cuisines
    { id: 'italian', name: 'Итальянская кухня', group: 'WorldCuisine' },
    { id: 'asian', name: 'Азиатская кухня', group: 'WorldCuisine' },
    { id: 'french', name: 'Французская кухня', group: 'WorldCuisine' },
    { id: 'american', name: 'Американская кухня', group: 'WorldCuisine' },
    { id: 'ukrainian', name: 'Украинская кухня', group: 'WorldCuisine' },
    { id: 'russian', name: 'Русская кухня', group: 'WorldCuisine' },
    {
        id: 'mediterranean',
        name: 'Средиземноморская кухня',
        group: 'WorldCuisine'
    },
    { id: 'eastern', name: 'Восточная кухня', group: 'WorldCuisine' },
    { id: 'latin', name: 'Латиноамериканская кухня', group: 'WorldCuisine' },

    // Dietary Preferences
    { id: 'vegetarian', name: 'Вегетарианское', group: 'DietaryPreference' },
    { id: 'vegan', name: 'Веганское', group: 'DietaryPreference' },
    { id: 'gluten_free', name: 'Безглютеновое', group: 'DietaryPreference' },
    { id: 'sugar_free', name: 'Без сахара', group: 'DietaryPreference' },
    {
        id: 'for_allergy_sufferers',
        name: 'Для аллергиков',
        group: 'DietaryPreference'
    },
    { id: 'lent', name: 'Постное', group: 'DietaryPreference' },

    // Cooking Features
    { id: 'quick', name: 'Быстрое (до 15 минут)', group: 'CookingFeatures' },
    { id: 'budget', name: 'Экономичное', group: 'CookingFeatures' },
    {
        id: 'beginner_friendly',
        name: 'Для начинающих',
        group: 'CookingFeatures'
    },
    { id: 'kids_friendly', name: 'Детское меню', group: 'CookingFeatures' },
    { id: 'party', name: 'Для праздника', group: 'CookingFeatures' }
];
