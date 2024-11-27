import { ECategory } from '@root/types';

export const getCategoryColor = (group: string): string => {
    const colorClasses: Record<string, string> = {
        DishType: ECategory.DISH_TYPE,
        WorldCuisine: ECategory.WORLD_CUISINE,
        DietaryPreference: ECategory.DIETARY_PREFERENCE,
        CookingFeatures: ECategory.COOKING_FEATURES,
        Spiciness: ECategory.SPICINESS
    };

    return colorClasses[group] || 'category-default';
};
