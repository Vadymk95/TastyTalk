export interface RecipeContext {
    title: string;
    description?: string; // Не для AI генерации
    ingredients: string[];
    steps: string[];
    tips?: string[];
    previewPhoto?: string | File; // Не для AI генерации
    aiGenerated: boolean;
}
