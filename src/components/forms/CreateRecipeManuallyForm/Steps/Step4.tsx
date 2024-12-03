import { FieldArray, FormikProps } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@root/components/ui';
import { Recipe as RecipeType } from '@root/types';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepProps {
    formik: FormikProps<RecipeType>;
    maxSteps: number;
}

export const Step4: FC<StepProps> = ({ formik, maxSteps }) => {
    const { t } = useTranslation();
    const { values, errors } = formik;

    const isLastFieldValid = (): boolean => {
        const ingredients = values.ingredients || [];

        if (ingredients.length === 0) {
            return true;
        }

        const lastIngredient = ingredients[ingredients.length - 1];

        if (typeof lastIngredient === 'string') {
            return (
                lastIngredient.trim() !== '' &&
                !errors.ingredients?.[ingredients.length - 1]
            );
        }

        if (
            typeof lastIngredient === 'object' &&
            'category' in lastIngredient &&
            'categoryIngredients' in lastIngredient
        ) {
            const { category, categoryIngredients } = lastIngredient;

            const isCategoryValid =
                typeof category === 'string' &&
                category.trim() !== '' &&
                !(errors.ingredients?.[ingredients.length - 1] as any)
                    ?.category;

            const areSubIngredientsValid =
                Array.isArray(categoryIngredients) &&
                categoryIngredients.length > 0 &&
                categoryIngredients.every((_, index) => {
                    return (
                        typeof categoryIngredients[index] === 'string' &&
                        categoryIngredients[index].trim() !== '' &&
                        !(errors.ingredients?.[ingredients.length - 1] as any)
                            ?.categoryIngredients?.[index]
                    );
                });

            return isCategoryValid && areSubIngredientsValid;
        }

        return false;
    };

    const isSubIngredientValid = (
        category: string,
        categoryIngredients: string[],
        errors: any, // объект ошибок из errors
        index: number // индекс текущей категории в массиве ingredients
    ): boolean => {
        const hasCategoryError =
            errors?.ingredients?.[index]?.category !== undefined;

        const hasSubIngredientErrors = categoryIngredients.some(
            (_, subIndex) =>
                errors?.ingredients?.[index]?.categoryIngredients?.[
                    subIndex
                ] !== undefined
        );

        return (
            category.trim() !== '' &&
            !hasCategoryError &&
            categoryIngredients.every(
                (ing) => ing.trim() !== '' && !hasSubIngredientErrors
            )
        );
    };

    return (
        <section className="flex flex-col gap-6">
            <h3>{t('Stepper.Steps.Recipe.4.description')}</h3>

            <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                    <div>
                        {values.ingredients &&
                            values.ingredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="flex sm:block items-center mb-6"
                                >
                                    {typeof ingredient === 'string' ? (
                                        <div className="flex items-end">
                                            <Input
                                                name={`ingredients.${index}`}
                                                placeholder={t(
                                                    'Forms.CreateRecipeManuallyForm.ingredientPlaceholder'
                                                )}
                                                label={`${index + 1}. ${t(
                                                    'Forms.CreateRecipeManuallyForm.ingredient'
                                                )}`}
                                                isRequired
                                                className="flex-1 mr-2"
                                                size="small"
                                            />
                                            <Button
                                                className="flex-all-center"
                                                size="small"
                                                variant="close"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    className="text-primary"
                                                    icon={faXmark}
                                                    size="xl"
                                                />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-end">
                                                <Input
                                                    name={`ingredients.${index}.category`}
                                                    placeholder={t(
                                                        'Forms.CreateRecipeManuallyForm.categoryIngredientsPlaceholder'
                                                    )}
                                                    label={`${index + 1}. ${t(
                                                        'Forms.CreateRecipeManuallyForm.ingredientsCategory'
                                                    )}`}
                                                    isRequired
                                                    className="flex-1 mr-2"
                                                    size="small"
                                                />
                                                <Button
                                                    className="flex-all-center"
                                                    size="small"
                                                    variant="close"
                                                    onClick={() =>
                                                        arrayHelpers.remove(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        className="text-primary"
                                                        icon={faXmark}
                                                        size="xl"
                                                    />
                                                </Button>
                                            </div>

                                            <FieldArray
                                                name={`ingredients.${index}.categoryIngredients`}
                                                render={(subArrayHelpers) => (
                                                    <div className="flex flex-col gap-2">
                                                        {ingredient.categoryIngredients.map(
                                                            (_, subIndex) => (
                                                                <div
                                                                    key={
                                                                        subIndex
                                                                    }
                                                                    className="pl-6 flex items-end"
                                                                >
                                                                    <Input
                                                                        name={`ingredients.${index}.categoryIngredients.${subIndex}`}
                                                                        placeholder={t(
                                                                            'Forms.CreateRecipeManuallyForm.subIngredientPlaceholder'
                                                                        )}
                                                                        label={`${
                                                                            subIndex +
                                                                            1
                                                                        }. ${t(
                                                                            'Forms.CreateRecipeManuallyForm.subIngredient'
                                                                        )}`}
                                                                        isRequired
                                                                        className="flex-1 mr-2"
                                                                        size="small"
                                                                    />
                                                                    <Button
                                                                        className="flex-all-center"
                                                                        size="small"
                                                                        variant="close"
                                                                        onClick={() =>
                                                                            subArrayHelpers.remove(
                                                                                subIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            className="text-primary"
                                                                            icon={
                                                                                faXmark
                                                                            }
                                                                            size="xl"
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            )
                                                        )}
                                                        <div className="mt-2">
                                                            <Button
                                                                variant="secondary"
                                                                size="small"
                                                                disabled={
                                                                    typeof ingredient ===
                                                                        'object' &&
                                                                    'category' in
                                                                        ingredient &&
                                                                    'categoryIngredients' in
                                                                        ingredient
                                                                        ? !isSubIngredientValid(
                                                                              ingredient.category,
                                                                              ingredient.categoryIngredients,
                                                                              errors,
                                                                              index
                                                                          )
                                                                        : true
                                                                }
                                                                onClick={() =>
                                                                    subArrayHelpers.push(
                                                                        ''
                                                                    )
                                                                }
                                                            >
                                                                {t(
                                                                    'Forms.CreateRecipeManuallyForm.addSubIngredient'
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        <div className="flex sm:flex-col gap-4 mt-2">
                            <Button
                                variant="secondary"
                                disabled={
                                    (!!values.ingredients &&
                                        values.ingredients.length >=
                                            maxSteps) ||
                                    !isLastFieldValid()
                                }
                                onClick={() => arrayHelpers.push('')}
                            >
                                {t(
                                    'Forms.CreateRecipeManuallyForm.addIngredient'
                                )}
                            </Button>
                            <Button
                                variant="accent"
                                disabled={
                                    (!!values.ingredients &&
                                        values.ingredients.length >=
                                            maxSteps) ||
                                    !isLastFieldValid()
                                }
                                onClick={() =>
                                    arrayHelpers.push({
                                        category: '',
                                        categoryIngredients: ['']
                                    })
                                }
                            >
                                {t(
                                    'Forms.CreateRecipeManuallyForm.addCategoryIngredients'
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            />
        </section>
    );
};
