import { Difficulty, Recipe } from '@root/types';

// Массив для "Рекомендация ИИ" (aiGenerated: true)
export const aiRecommendationRecipes: Recipe[] = Array.from(
    { length: 10 },
    (_, index) => ({
        id: `ai-rec-${index + 1}`,
        title: `AI Recommended Dish ${index + 1}`,
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
            },
            {
                id: 'long',
                name: 'Long (over 60 minutes)',
                group: 'cookingFeatures'
            }
        ],
        cookingTime: `${25 + index * 3}`, // пример: 25, 28, 31, ...
        description:
            index % 2 === 1
                ? `This is a description for AI recipe ${index + 1}`
                : null,
        previewPhoto:
            index % 2 === 0
                ? `https://example.com/ai-recipe-${index + 1}.jpg`
                : null,
        ingredients: [
            'flour',
            { category: 'Dairy', categoryIngredients: ['milk', 'cheese'] },
            'sugar'
        ],
        steps: [
            `Step 1: Prepare ingredients for AI recipe ${index + 1}`,
            `Step 2: Cook AI recipe ${index + 1}`
        ],
        tips:
            index % 2 === 0 ? ['Follow AI instructions', 'Be creative'] : null,
        warnings: index % 3 === 0 ? ['Contains dairy'] : null,
        videoUrl: null,
        aiGenerated: true,
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
        popularity: parseFloat((Math.random() * 10).toFixed(2)),
        createdBy: `ai-user-${index + 1}`,
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [
            {
                userId: `ai-user-${index + 2}`,
                text: `Amazing AI recipe ${index + 1}!`,
                createdAt: new Date()
            }
        ],
        reports:
            index % 5 === 0
                ? [
                      {
                          reportedBy: `ai-user-${index + 3}`,
                          reason: 'Duplicate content',
                          createdAt: new Date()
                      }
                  ]
                : [],
        reposts: Math.floor(Math.random() * 10)
    })
);
