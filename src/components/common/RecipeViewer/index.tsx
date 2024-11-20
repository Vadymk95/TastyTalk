import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeContext } from '@root/types';

interface RecipeViewerProps {
    recipe: RecipeContext;
}

export const RecipeViewer: FC<RecipeViewerProps> = ({ recipe }) => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            {/* Заголовок */}
            <h2 className="text-2xl font-heading text-primary mb-4">
                {recipe.title}
            </h2>

            {/* Описание */}
            {recipe.description && (
                <p className="text-neutral-dark mb-4">{recipe.description}</p>
            )}

            {/* Фото превью */}
            {recipe.previewPhoto && typeof recipe.previewPhoto === 'string' && (
                <img
                    src={recipe.previewPhoto}
                    alt={recipe.title}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}

            {/* Ингредиенты */}
            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    {t('RecipeViewer.ingredients')}
                </h3>
                <ul className="list-disc pl-5 text-neutral-dark">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="mb-1">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Шаги приготовления */}
            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    {t('RecipeViewer.steps')}
                </h3>
                <ol className="list-decimal pl-5 text-neutral-dark">
                    {recipe.steps.map((step, index) => (
                        <li key={index} className="mb-2">
                            {step}
                        </li>
                    ))}
                </ol>
            </div>

            {/* Советы */}
            {recipe.tips && recipe.tips.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-heading text-secondary mb-2">
                        {t('RecipeViewer.tips')}
                    </h3>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.tips.map((tip, index) => (
                            <li key={index} className="mb-1">
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Метка генерации */}
            <div className="text-sm text-neutral-dark italic">
                {recipe.aiGenerated
                    ? t('RecipeViewer.generated')
                    : t('RecipeViewer.user')}
            </div>
        </div>
    );
};
