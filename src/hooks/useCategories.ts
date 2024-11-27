import { Category } from '@root/types';
import { useTranslation } from 'react-i18next';

export const useCategories = (): Category[] => {
    const { t } = useTranslation();

    const categories: Category[] = [
        // Dish Types
        {
            id: 'breakfast',
            name: t('Categories.DishType.breakfast'),
            group: 'dishType'
        },
        {
            id: 'soups',
            name: t('Categories.DishType.soups'),
            group: 'dishType'
        },
        {
            id: 'salads',
            name: t('Categories.DishType.salads'),
            group: 'dishType'
        },
        {
            id: 'main_dishes',
            name: t('Categories.DishType.main_dishes'),
            group: 'dishType'
        },
        {
            id: 'side_dishes',
            name: t('Categories.DishType.side_dishes'),
            group: 'dishType'
        },
        {
            id: 'desserts',
            name: t('Categories.DishType.desserts'),
            group: 'dishType'
        },
        {
            id: 'baking',
            name: t('Categories.DishType.baking'),
            group: 'dishType'
        },
        {
            id: 'drinks',
            name: t('Categories.DishType.drinks'),
            group: 'dishType'
        },
        {
            id: 'snacks',
            name: t('Categories.DishType.snacks'),
            group: 'dishType'
        },
        {
            id: 'sauces',
            name: t('Categories.DishType.sauces'),
            group: 'dishType'
        },

        // World Cuisines
        {
            id: 'italian',
            name: t('Categories.WorldCuisine.italian'),
            group: 'worldCuisine'
        },
        {
            id: 'asian',
            name: t('Categories.WorldCuisine.asian'),
            group: 'worldCuisine'
        },
        {
            id: 'french',
            name: t('Categories.WorldCuisine.french'),
            group: 'worldCuisine'
        },
        {
            id: 'american',
            name: t('Categories.WorldCuisine.american'),
            group: 'worldCuisine'
        },
        {
            id: 'ukrainian',
            name: t('Categories.WorldCuisine.ukrainian'),
            group: 'worldCuisine'
        },
        {
            id: 'russian',
            name: t('Categories.WorldCuisine.russian'),
            group: 'worldCuisine'
        },
        {
            id: 'mediterranean',
            name: t('Categories.WorldCuisine.mediterranean'),
            group: 'worldCuisine'
        },
        {
            id: 'eastern',
            name: t('Categories.WorldCuisine.eastern'),
            group: 'worldCuisine'
        },
        {
            id: 'latin',
            name: t('Categories.WorldCuisine.latin'),
            group: 'worldCuisine'
        },

        // Dietary Preferences
        {
            id: 'vegetarian',
            name: t('Categories.DietaryPreference.vegetarian'),
            group: 'dietaryPreference'
        },
        {
            id: 'vegan',
            name: t('Categories.DietaryPreference.vegan'),
            group: 'dietaryPreference'
        },
        {
            id: 'gluten_free',
            name: t('Categories.DietaryPreference.gluten_free'),
            group: 'dietaryPreference'
        },
        {
            id: 'sugar_free',
            name: t('Categories.DietaryPreference.sugar_free'),
            group: 'dietaryPreference'
        },
        {
            id: 'for_allergy_sufferers',
            name: t('Categories.DietaryPreference.for_allergy_sufferers'),
            group: 'dietaryPreference'
        },
        {
            id: 'lent',
            name: t('Categories.DietaryPreference.lent'),
            group: 'dietaryPreference'
        },

        // Cooking Features
        {
            id: 'quick',
            name: t('Categories.CookingFeatures.quick'),
            group: 'cookingFeatures'
        },
        {
            id: 'medium',
            name: t('Categories.CookingFeatures.medium'),
            group: 'cookingFeatures'
        },
        {
            id: 'long',
            name: t('Categories.CookingFeatures.long'),
            group: 'cookingFeatures'
        },
        {
            id: 'budget',
            name: t('Categories.CookingFeatures.budget'),
            group: 'cookingFeatures'
        },
        {
            id: 'beginner_friendly',
            name: t('Categories.CookingFeatures.beginner_friendly'),
            group: 'cookingFeatures'
        },
        {
            id: 'kids_friendly',
            name: t('Categories.CookingFeatures.kids_friendly'),
            group: 'cookingFeatures'
        },
        {
            id: 'party',
            name: t('Categories.CookingFeatures.party'),
            group: 'cookingFeatures'
        },

        // Spiciness
        {
            id: 'spicy',
            name: t('Categories.Spiciness.spicy'),
            group: 'spiciness'
        },
        {
            id: 'medium_spicy',
            name: t('Categories.Spiciness.medium_spicy'),
            group: 'spiciness'
        },
        {
            id: 'not_spicy',
            name: t('Categories.Spiciness.not_spicy'),
            group: 'spiciness'
        }
    ];

    return categories;
};
