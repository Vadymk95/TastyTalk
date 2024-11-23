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

export interface Category {
    id: string;
    name: string;
    group: string;
}

export type Visibility = 'public' | 'private' | 'friends';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
    id: string; // Уникальный идентификатор рецепта
    title: string; // Название рецепта
    description?: string; // Описание рецепта
    previewPhoto?: string | File; // Фото превью (Base64 или URL) или фаил
    difficulty: Difficulty; // Сложность приготовления
    categories: string[]; // Категории, к которым относится рецепт
    ingredients: string[]; // Список ингредиентов
    steps: string[]; // Этапы приготовления
    tips?: string[]; // Советы по приготовлению
    cookingTime?: number; // Время готовки (в минутах)
    warnings?: string[]; // Предостережения (например, аллергии)
    videoUrl?: string; // Ссылка на видео рецепта
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
    reposts?: number; // Количество репостов
}
