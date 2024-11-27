import { ECategory } from '@root/types';

export const getCategoryColor = (group: string): string => {
    const colorClasses: Record<string, string> = {
        dishType: ECategory.DISH_TYPE,
        worldCuisine: ECategory.WORLD_CUISINE,
        dietaryPreference: ECategory.DIETARY_PREFERENCE,
        cookingFeatures: ECategory.COOKING_FEATURES,
        spiciness: ECategory.SPICINESS
    };

    return colorClasses[group] || 'category-default';
};
