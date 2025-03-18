import { Difficulty, Recipe } from '@root/types';

// Массив для "Топ недели" (aiGenerated: false)
export const topWeekRecipes: Recipe[] = Array.from(
    { length: 10 },
    (_, index) => ({
        id: `top-week-${index + 1}`,
        title: `Delicious Dish ${index + 1}`,
        difficulty: ['easy', 'medium', 'hard'][
            Math.floor(Math.random() * 3)
        ] as Difficulty,
        categories: [
            {
                id: 'asian',
                name: 'Asian Cuisine',
                group: 'worldCuisine'
            },
            {
                id: 'lent',
                name: 'Lenten',
                group: 'dietaryPreference'
            }
        ],
        cookingTime: `${30 + index * 5}`, // пример: 30, 35, 40, ...
        description:
            index % 2 === 0
                ? `This is a description for recipe ${index + 1}`
                : null,
        previewPhoto:
            index % 3 === 0
                ? `https://example.com/recipe-${index + 1}.jpg`
                : null,
        ingredients: [
            'salt',
            {
                category: 'Vegetables',
                categoryIngredients: ['tomato', 'cucumber']
            },
            'water'
        ],
        steps: [
            `Step 1: Prepare ingredients for recipe ${index + 1}`,
            `Step 2: Cook recipe ${index + 1}`
        ],
        tips:
            index % 2 === 0
                ? ['Keep it fresh', 'Use quality ingredients']
                : null,
        warnings: index % 3 === 0 ? ['May cause allergies'] : null,
        videoUrl: null,
        aiGenerated: false,
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
        popularity: parseFloat((Math.random() * 10).toFixed(2)),
        createdBy: `user-${index + 1}`,
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [
            {
                userId: `user-${index + 2}`,
                text: `Nice recipe ${index + 1}!`,
                createdAt: new Date()
            }
        ],
        reports:
            index % 4 === 0
                ? [
                      {
                          reportedBy: `user-${index + 3}`,
                          reason: 'Spam',
                          createdAt: new Date()
                      }
                  ]
                : [],
        reposts: Math.floor(Math.random() * 10)
    })
);
