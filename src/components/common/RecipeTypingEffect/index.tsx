import { FC, JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';

import { RecipeContext } from '@root/types';

import {
    faComment,
    faForwardStep,
    faPuzzlePiece,
    faRobot,
    faScroll,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RecipeTypingEffectProps {
    recipe: RecipeContext;
}

interface Section {
    id: string;
    content: string | string[];
    tag: keyof JSX.IntrinsicElements;
    style: string;
    icon?: IconDefinition;
}

export const RecipeTypingEffect: FC<RecipeTypingEffectProps> = ({ recipe }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [currentListIndex, setCurrentListIndex] = useState(0);

    const sections: Section[] = [
        {
            id: 'title',
            content: recipe.title,
            tag: 'div',
            style: 'text-2xl font-heading text-primary mb-4 flex items-center',
            icon: faScroll
        },
        {
            id: 'description',
            content: recipe.description || '',
            tag: 'div',
            style: 'text-neutral-dark mb-4'
        },
        {
            id: 'ingredients-title',
            content: t('RecipeViewer.ingredients'),
            tag: 'div',
            style: 'text-xl font-heading text-secondary mb-2',
            icon: faPuzzlePiece
        }
        // {
        //     id: 'ingredients',
        //     content: recipe.ingredients,
        //     tag: 'ul',
        //     style: 'list-disc pl-5 text-neutral-dark'
        // }
    ].filter((section) => section.content) as Section[];

    const handleTypingEnd = (isArray: boolean = false) => {
        const currentSection = sections[currentStep];

        if (Array.isArray(currentSection.content) || isArray) {
            if (currentListIndex < currentSection.content.length - 1) {
                setCurrentListIndex((prev) => prev + 1);
            } else {
                setCurrentListIndex(0);
                setCurrentStep((prev) => prev + 1);
            }
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    return (
        <div className="plate">
            {sections.map((section, index) => {
                const Tag = section.tag;

                // if (Array.isArray(section.content)) {
                //     return (
                //         <Tag key={section.id} className={section.style}>
                //             {section.content.map((item, listIndex) => (
                //                 <li key={listIndex}>
                //                     {listIndex === currentListIndex ? (
                //                         <Typewriter
                //                             onInit={(typewriter) => {
                //                                 typewriter
                //                                     .typeString(item as string)
                //                                     .callFunction(() =>
                //                                         handleTypingEnd(true)
                //                                     )
                //                                     .start();
                //                             }}
                //                             options={{
                //                                 delay: 25,
                //                                 cursor: ''
                //                             }}
                //                         />
                //                     ) : (
                //                         item
                //                     )}
                //                 </li>
                //             ))}
                //         </Tag>
                //     );
                // }

                return (
                    index <= currentStep && (
                        <Tag key={section.id} className={section.style}>
                            {section.icon && (
                                <FontAwesomeIcon
                                    className="mr-3"
                                    icon={section.icon}
                                />
                            )}
                            <Typewriter
                                options={{
                                    delay: 25,
                                    cursor: ''
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString(section.content as string)
                                        .callFunction(() => handleTypingEnd())
                                        .start();
                                }}
                            />
                        </Tag>
                    )
                );
            })}

            <div className="mb-6">
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
                <span>
                    <FontAwesomeIcon className="mr-1" icon={faRobot} />
                    {t('RecipeViewer.generated')}
                </span>
            </div>
        </div>
    );
};
