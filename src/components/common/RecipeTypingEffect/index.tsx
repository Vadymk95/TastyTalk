import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';

import { RecipeContext } from '@root/types';

import {
    faComment,
    faForwardStep,
    faPuzzlePiece,
    faRobot,
    faScroll
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScrollIndicator } from '../../ui/ScrollIndicator';

interface RecipeTypingEffectProps {
    recipe: RecipeContext;
}

export const RecipeTypingEffect: FC<RecipeTypingEffectProps> = ({ recipe }) => {
    const { t } = useTranslation();

    return (
        <div className="plate">
            <div className="text-2xl font-heading text-primary mb-4 flex items-center">
                <FontAwesomeIcon className="mr-3" icon={faScroll} />
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

            {recipe.description && (
                <div className="text-neutral-dark mb-4">
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
                    <div className="text-xl font-heading text-secondary mb-2 flex items-center">
                        <FontAwesomeIcon
                            className="mr-3"
                            icon={faPuzzlePiece}
                        />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('RecipeViewer.ingredients'))
                                    .start();
                            }}
                        />
                    </div>
                    <ul className="list-disc pl-5 text-neutral-dark">
                        {recipe.ingredients.map((ingredient, index) => (
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
                        ))}
                    </ul>
                </div>
            )}

            {recipe.steps && recipe.steps.length > 0 && (
                <div className="mb-6">
                    <div className="text-xl font-heading text-secondary mb-2 flex items-center">
                        <FontAwesomeIcon
                            className="mr-2"
                            icon={faForwardStep}
                        />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('RecipeViewer.steps'))
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
                    <h3 className="text-xl font-heading text-secondary mb-2 flex items-center">
                        <FontAwesomeIcon className="mr-2" icon={faComment} />
                        <Typewriter
                            options={{
                                delay: 25,
                                cursor: ''
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(t('RecipeViewer.tips'))
                                    .start();
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

            <ScrollIndicator />

            <div className="text-sm text-neutral-dark italic">
                <span>
                    <FontAwesomeIcon className="mr-1" icon={faRobot} />
                    {t('RecipeViewer.generated')}
                </span>
            </div>
        </div>
    );
};
