import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeContext } from '@root/types';

import {
    faComment,
    faForwardStep,
    faPuzzlePiece,
    faRobot,
    faScroll,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RecipeViewerProps {
    recipe: RecipeContext;
}

export const RecipeViewer: FC<RecipeViewerProps> = ({ recipe }) => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            <h2 className="text-2xl font-heading text-primary mb-4">
                <FontAwesomeIcon className="mr-3" icon={faScroll} />
                <span>{recipe.title}</span>
            </h2>

            {recipe.description && (
                <p className="text-neutral-dark mb-4">{recipe.description}</p>
            )}

            {recipe.previewPhoto && typeof recipe.previewPhoto === 'string' && (
                <img
                    src={recipe.previewPhoto}
                    alt={recipe.title}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}

            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faPuzzlePiece} />
                    <span>{t('RecipeViewer.ingredients')}</span>
                </h3>
                <ul className="list-disc pl-5 text-neutral-dark">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="mb-1">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faForwardStep} />
                    <span>{t('RecipeViewer.steps')}</span>
                </h3>
                <ol className="list-decimal pl-5 text-neutral-dark">
                    {recipe.steps.map((step, index) => (
                        <li key={index} className="mb-2">
                            {step}
                        </li>
                    ))}
                </ol>
            </div>

            {recipe.tips && recipe.tips.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-heading text-secondary mb-2">
                        <FontAwesomeIcon className="mr-2" icon={faComment} />
                        <span>{t('RecipeViewer.tips')}</span>
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

            <div className="text-sm text-neutral-dark italic">
                {recipe.aiGenerated ? (
                    <span>
                        <FontAwesomeIcon className="mr-1" icon={faRobot} />
                        {t('RecipeViewer.generated')}
                    </span>
                ) : (
                    <span>
                        <FontAwesomeIcon className="mr-1" icon={faUser} />
                        {t('RecipeViewer.user')}
                    </span>
                )}
            </div>
        </div>
    );
};
