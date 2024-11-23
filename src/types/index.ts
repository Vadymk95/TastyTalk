export interface RecipeContext {
    title: string;
    description?: string; // Не для AI генерации
    ingredients: string[];
    steps: string[];
    tips?: string[];
    previewPhoto?: string | File; // Не для AI генерации
    aiGenerated: boolean;
}

export interface Comment {
    userId: string;
    text: string;
    createdAt: Date;
}

export interface Report {
    reportedBy: string;
    reason: string;
    createdAt: Date;
}

export type Visibility = 'public' | 'private' | 'friends';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
    id: string; // Уникальный идентификатор рецепта
    title: string; // Название рецепта
    description?: string; // Описание рецепта
    ingredients: string[]; // Список ингредиентов
    steps: string[]; // Этапы приготовления
    warnings?: string[]; // Предостережения (например, аллергии)
    previewPhoto?: string; // Фото превью (Base64 или URL)
    aiGenerated: boolean; // Указывает, создан ли рецепт AI
    likes?: number; // Количество лайков
    views?: number; // Количество просмотров
    popularity?: number; // Динамически рассчитываемая популярность
    createdBy?: string; // ID пользователя, который создал рецепт
    visibility?: Visibility; // Видимость рецепта
    createdAt?: Date; // Дата создания
    updatedAt?: Date; // Дата последнего обновления
    comments?: Comment[]; // Массив комментариев
    reports?: Report[]; // Жалобы на рецепт
    difficulty: Difficulty; // Сложность приготовления
    cookingTime: number; // Время готовки (в минутах)
    reposts?: number; // Количество репостов
    videoUrl?: string; // Ссылка на видео рецепта
    categories: string[]; // Категории, к которым относится рецепт
}
