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
export type Ingredient =
    | string
    | {
          category: string;
          categoryIngredients: string[];
      };

export interface Recipe {
    id: string; // Уникальный идентификатор рецепта
    title: string; // Название рецепта
    difficulty: Difficulty | null; // Сложность приготовления
    categories: Category[] | null; // Категории, к которым относится рецепт
    cookingTime: string; // Время готовки (в минутах)
    description?: string | null; // Описание рецепта
    previewPhoto?: string | File | null; // Фото превью (Base64 или URL) или фаил
    ingredients: Ingredient[] | null; // Список ингредиентов
    steps: string[]; // Этапы приготовления
    tips?: string[] | null; // Советы по приготовлению
    warnings?: string[] | null; // Предостережения (например, аллергии)
    videoUrl?: string | null; // Ссылка на видео рецепта
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

export type Option = {
    value: string;
    label: string;
};

export enum EDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export enum EStepStatus {
    COMPLETED = 'completed',
    INCOMPLETED = 'incompleted'
}

export enum ECategory {
    DISH_TYPE = 'dishType',
    WORLD_CUISINE = 'worldCuisine',
    DIETARY_PREFERENCE = 'dietaryPreference',
    COOKING_FEATURES = 'cookingFeatures',
    SPICINESS = 'spiciness'
}

export interface StepStatus {
    step: number;
    status: EStepStatus.COMPLETED | EStepStatus.INCOMPLETED;
}

export type SubscriptionPlan = 'Free' | 'Basic' | 'Standard' | 'Premium';
export type VerificationMethod = 'email' | 'phone' | 'full';

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    bio?: string;
    country?: string;
    socialNetworks?: { name: string; profileName: string }[];
    profileImage?: File | null | string;
    subscriptionPlan?: SubscriptionPlan;
    showCountry?: boolean;
    showName?: boolean;
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    usernameLower: string;
    email: string | null;
    phoneNumber: string | null;
    verificationMethod: VerificationMethod;
    bio?: string;
    country?: string;
    socialNetworks?: { name: string; profileName: string }[];
    profileImage?: string | null | File;
    followers?: string[];
    following?: string[];
    verified: boolean;
    subscriptionPlan: SubscriptionPlan;
    recipesCount: number;
    mealPlansCount: number;
    followersCount: number;
    followingCount: number;
    showCountry?: boolean;
    showName?: boolean;
    createdAt: Date;
}

export type RelationshipType = 'followers' | 'following';
