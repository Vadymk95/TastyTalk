import { Category } from '@root/types';
import { useTranslation } from 'react-i18next';

export const useCategories = (): Category[] => {
    const { t } = useTranslation();

    const categories: Category[] = [
        // Dish Types
        {
            id: 'breakfast',
            name: t('Categories.DishType.breakfast'),
            group: 'DishType'
        },
        {
            id: 'soups',
            name: t('Categories.DishType.soups'),
            group: 'DishType'
        },
        {
            id: 'salads',
            name: t('Categories.DishType.salads'),
            group: 'DishType'
        },
        {
            id: 'main_dishes',
            name: t('Categories.DishType.main_dishes'),
            group: 'DishType'
        },
        {
            id: 'side_dishes',
            name: t('Categories.DishType.side_dishes'),
            group: 'DishType'
        },
        {
            id: 'desserts',
            name: t('Categories.DishType.desserts'),
            group: 'DishType'
        },
        {
            id: 'baking',
            name: t('Categories.DishType.baking'),
            group: 'DishType'
        },
        {
            id: 'drinks',
            name: t('Categories.DishType.drinks'),
            group: 'DishType'
        },
        {
            id: 'snacks',
            name: t('Categories.DishType.snacks'),
            group: 'DishType'
        },
        {
            id: 'sauces',
            name: t('Categories.DishType.sauces'),
            group: 'DishType'
        },

        // World Cuisines
        {
            id: 'italian',
            name: t('Categories.WorldCuisine.italian'),
            group: 'WorldCuisine'
        },
        {
            id: 'asian',
            name: t('Categories.WorldCuisine.asian'),
            group: 'WorldCuisine'
        },
        {
            id: 'french',
            name: t('Categories.WorldCuisine.french'),
            group: 'WorldCuisine'
        },
        {
            id: 'american',
            name: t('Categories.WorldCuisine.american'),
            group: 'WorldCuisine'
        },
        {
            id: 'ukrainian',
            name: t('Categories.WorldCuisine.ukrainian'),
            group: 'WorldCuisine'
        },
        {
            id: 'russian',
            name: t('Categories.WorldCuisine.russian'),
            group: 'WorldCuisine'
        },
        {
            id: 'mediterranean',
            name: t('Categories.WorldCuisine.mediterranean'),
            group: 'WorldCuisine'
        },
        {
            id: 'eastern',
            name: t('Categories.WorldCuisine.eastern'),
            group: 'WorldCuisine'
        },
        {
            id: 'latin',
            name: t('Categories.WorldCuisine.latin'),
            group: 'WorldCuisine'
        },

        // Dietary Preferences
        {
            id: 'vegetarian',
            name: t('Categories.DietaryPreference.vegetarian'),
            group: 'DietaryPreference'
        },
        {
            id: 'vegan',
            name: t('Categories.DietaryPreference.vegan'),
            group: 'DietaryPreference'
        },
        {
            id: 'gluten_free',
            name: t('Categories.DietaryPreference.gluten_free'),
            group: 'DietaryPreference'
        },
        {
            id: 'sugar_free',
            name: t('Categories.DietaryPreference.sugar_free'),
            group: 'DietaryPreference'
        },
        {
            id: 'for_allergy_sufferers',
            name: t('Categories.DietaryPreference.for_allergy_sufferers'),
            group: 'DietaryPreference'
        },
        {
            id: 'lent',
            name: t('Categories.DietaryPreference.lent'),
            group: 'DietaryPreference'
        },

        // Cooking Features
        {
            id: 'quick',
            name: t('Categories.CookingFeatures.quick'),
            group: 'CookingFeatures'
        },
        {
            id: 'medium',
            name: t('Categories.CookingFeatures.medium'),
            group: 'CookingFeatures'
        },
        {
            id: 'long',
            name: t('Categories.CookingFeatures.long'),
            group: 'CookingFeatures'
        },
        {
            id: 'budget',
            name: t('Categories.CookingFeatures.budget'),
            group: 'CookingFeatures'
        },
        {
            id: 'beginner_friendly',
            name: t('Categories.CookingFeatures.beginner_friendly'),
            group: 'CookingFeatures'
        },
        {
            id: 'kids_friendly',
            name: t('Categories.CookingFeatures.kids_friendly'),
            group: 'CookingFeatures'
        },
        {
            id: 'party',
            name: t('Categories.CookingFeatures.party'),
            group: 'CookingFeatures'
        },

        // Spiciness
        {
            id: 'spicy',
            name: t('Categories.Spiciness.spicy'),
            group: 'Spiciness'
        },
        {
            id: 'medium',
            name: t('Categories.Spiciness.medium'),
            group: 'Spiciness'
        },
        {
            id: 'not_spicy',
            name: t('Categories.Spiciness.not_spicy'),
            group: 'Spiciness'
        }
    ];

    return categories;
};
