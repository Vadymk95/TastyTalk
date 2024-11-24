import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Categories, DifficultyMap } from '@root/components/common';
import { Image } from '@root/components/ui';
import { Recipe as RecipeType } from '@root/types';

import {
    faClock,
    faComment,
    faForwardStep,
    faHandDots,
    faPuzzlePiece,
    faRobot,
    faScroll,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RecipeProps {
    recipe: RecipeType;
}

export const Recipe: FC<RecipeProps> = ({ recipe }) => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            <div className="flex justify-between sm:flex-wrap mb-6 gap-4">
                <h2 className="text-2xl font-heading text-primary">
                    <FontAwesomeIcon className="mr-3" icon={faScroll} />
                    <span>{recipe.title}</span>
                </h2>
                {recipe.difficulty && (
                    <DifficultyMap level={recipe.difficulty} />
                )}
            </div>

            <Categories className="mb-6" list={recipe.categories} />

            {recipe.description && (
                <p className="text-neutral-dark mb-4">{recipe.description}</p>
            )}

            {recipe.previewPhoto && typeof recipe.previewPhoto === 'string' && (
                <Image
                    src={recipe.previewPhoto}
                    alt={recipe.title}
                    className="w-full h-auto rounded-lg mb-6"
                />
            )}

            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faClock} />
                    <span>{t('Recipe.time')}</span>
                </h3>
                <Trans
                    i18nKey="Recipe.cookingTime"
                    values={{ count: recipe.cookingTime }}
                    components={{ b: <b /> }}
                />
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-heading text-secondary mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faPuzzlePiece} />
                    <span>{t('Recipe.ingredients')}</span>
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
                    <span>{t('Recipe.steps')}</span>
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
                        <span>{t('Recipe.tips')}</span>
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

            {recipe.warnings && recipe.warnings.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-heading text-primary mb-2">
                        <FontAwesomeIcon className="mr-2" icon={faHandDots} />
                        <span>{t('Recipe.warnings')}</span>
                    </h3>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.warnings.map((warn, index) => (
                            <li key={index} className="mb-1">
                                {warn}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="text-sm text-neutral-dark italic">
                {recipe.aiGenerated ? (
                    <span>
                        <FontAwesomeIcon className="mr-1" icon={faRobot} />
                        {t('Recipe.generated')}
                    </span>
                ) : (
                    <span>
                        <FontAwesomeIcon className="mr-1" icon={faUser} />
                        {t('Recipe.user')}
                    </span>
                )}
            </div>
        </div>
    );
};
