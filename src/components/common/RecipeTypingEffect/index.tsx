import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';

import { Categories, DifficultyMap } from '@root/components/common';
import { ScrollIndicator } from '@root/components/ui/ScrollIndicator';
import { Recipe } from '@root/types';

import {
    faComment,
    faForwardStep,
    faHandDots,
    faPuzzlePiece,
    faRobot,
    faScroll
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RecipeTypingEffectProps {
    recipe: Recipe;
}

export const RecipeTypingEffect: FC<RecipeTypingEffectProps> = ({ recipe }) => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            <div className="flex justify-between sm:flex-wrap mb-6 gap-4">
                <div className="text-2xl font-heading text-primary inline-flex items-center gap-3">
                    <FontAwesomeIcon icon={faScroll} />
                    <Typewriter
                        options={{
                            delay: 25,
                            cursor: ''
                        }}
                        onInit={(typewriter) => {
                            typewriter.typeString(recipe.title).start();
                        }}
                    />
                </div>
                {recipe.difficulty && (
                    <DifficultyMap level={recipe.difficulty} />
                )}
            </div>

            <div className="mb-6">
                <Categories list={recipe.categories} />
            </div>

            {recipe.description && (
                <div className="text-neutral-dark mb-4 whitespace-pre-line">
                    <Typewriter
                        options={{
                            delay: 10,
                            cursor: ''
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(recipe.description as string)
                                .start();
                        }}
                    />
                </div>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-6">
                    <div className="text-xl font-heading text-secondary mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faPuzzlePiece} />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('Recipe.ingredients'))
                                    .start();
                            }}
                        />
                    </div>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.ingredients.map((ingredient, index) => {
                            if (typeof ingredient === 'string') {
                                return (
                                    <li key={index} className="mb-1">
                                        <Typewriter
                                            key={index}
                                            options={{
                                                delay: 65,
                                                cursor: ''
                                            }}
                                            onInit={(typewriter) => {
                                                typewriter
                                                    .typeString(ingredient)
                                                    .start();
                                            }}
                                        />
                                    </li>
                                );
                            } else if (
                                'category' in ingredient &&
                                'categoryIngredients' in ingredient
                            ) {
                                return (
                                    <li key={index} className="mb-4">
                                        <div className="font-bold text-primary mb-2">
                                            <Typewriter
                                                key={`${index}-category`}
                                                options={{
                                                    delay: 45,
                                                    cursor: ''
                                                }}
                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString(
                                                            `${ingredient.category}:`
                                                        )
                                                        .start();
                                                }}
                                            />
                                        </div>
                                        <ul className="list-dash pl-5">
                                            {ingredient.categoryIngredients.map(
                                                (catIngredient, catIndex) => (
                                                    <li
                                                        key={`${index}-${catIndex}`}
                                                        className="mb-1"
                                                    >
                                                        <Typewriter
                                                            key={`${index}-${catIndex}`}
                                                            options={{
                                                                delay: 55,
                                                                cursor: ''
                                                            }}
                                                            onInit={(
                                                                typewriter
                                                            ) => {
                                                                typewriter
                                                                    .typeString(
                                                                        catIngredient
                                                                    )
                                                                    .start();
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            )}

            {recipe.steps && recipe.steps.length > 0 && (
                <div className="mb-6">
                    <div className="text-xl font-heading text-secondary mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faForwardStep} />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('Recipe.steps'))
                                    .start();
                            }}
                        />
                    </div>
                    <ol className="list-decimal pl-5 text-neutral-dark">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="mb-2">
                                <Typewriter
                                    key={index}
                                    options={{
                                        delay: 10,
                                        cursor: ''
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter.typeString(step).start();
                                    }}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {recipe.tips && recipe.tips.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-heading text-secondary mb-2 flex items-center  gap-2">
                        <FontAwesomeIcon icon={faComment} />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString(t('Recipe.tips')).start();
                            }}
                        />
                    </h3>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.tips.map((tip, index) => (
                            <li key={index} className="mb-1">
                                <Typewriter
                                    key={index}
                                    options={{
                                        delay: 10,
                                        cursor: ''
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter.typeString(tip).start();
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {recipe.warnings && recipe.warnings.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-heading text-primary mb-2 flex items-center  gap-2">
                        <FontAwesomeIcon icon={faHandDots} />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('Recipe.warnings'))
                                    .start();
                            }}
                        />
                    </h3>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.warnings.map((warn, index) => (
                            <li key={index} className="mb-1">
                                <Typewriter
                                    key={index}
                                    options={{
                                        delay: 10,
                                        cursor: ''
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter.typeString(warn).start();
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ScrollIndicator />

            <div className="text-sm text-neutral-dark italic">
                <span>
                    <FontAwesomeIcon className="mr-1" icon={faRobot} />
                    {t('Recipe.generated')}
                </span>
            </div>
        </div>
    );
};
