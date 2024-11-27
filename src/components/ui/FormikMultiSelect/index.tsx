import { FieldProps } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@root/components/ui';
import { getCategoryColor } from '@root/helpers';
import { Category } from '@root/types';

type FormikMultiSelectProps = {
    name?: string;
    value?: Category[];
    onChange?: (value: Category[]) => void;
    categories: Category[];
    maxBadges?: number;
} & Partial<FieldProps>;

export const FormikMultiSelect: FC<FormikMultiSelectProps> = ({
    name,
    value: controlledValue,
    onChange,
    categories,
    maxBadges = 4,
    form
}) => {
    const { t } = useTranslation();

    const [localValue, setLocalValue] = useState<Category[]>([]);
    const selectedBadges = controlledValue ?? localValue;

    // Группировка категорий
    const groupedCategories = categories.reduce(
        (acc, category) => {
            if (!acc[category.group]) {
                acc[category.group] = [];
            }
            acc[category.group].push(category);
            return acc;
        },
        {} as Record<string, Category[]>
    );

    const handleSelect = (badge: Category) => {
        if (selectedBadges.length >= maxBadges) return;

        const updatedBadges = [...selectedBadges, badge];
        if (onChange) {
            onChange(updatedBadges);
        } else {
            setLocalValue(updatedBadges);
        }

        if (form && name) {
            form.setFieldValue(name, updatedBadges);
        }
    };

    const handleRemove = (badge: Category) => {
        const updatedBadges = selectedBadges.filter((b) => b.id !== badge.id);
        if (onChange) {
            onChange(updatedBadges);
        } else {
            setLocalValue(updatedBadges);
        }

        if (form && name) {
            form.setFieldValue(name, updatedBadges);
        }
    };

    return (
        <div className="multi-select">
            {/* Выбранные бейджи */}
            <div className="selected-badges flex flex-wrap gap-2 mb-4">
                {selectedBadges.map((badge) => (
                    <Badge
                        key={badge.id}
                        text={badge.name}
                        categoryColor={getCategoryColor(badge.group)}
                        withDelete
                        className="cursor-pointer hover:scale-105 active:scale-95"
                        onClick={() => handleRemove(badge)}
                    />
                ))}
            </div>

            {/* Список категорий */}
            <div className="categories">
                {Object.entries(groupedCategories).map(
                    ([groupName, groupCategories]) => {
                        const availableBadges = groupCategories.filter(
                            (category) =>
                                !selectedBadges.some(
                                    (badge) => badge.group === category.group
                                )
                        );

                        if (availableBadges.length === 0) {
                            return null;
                        }

                        // Используем t() для перевода заголовка
                        console.log(groupName);
                        const translatedTitle = t(`Categories.${groupName}`);

                        return (
                            <div key={groupName} className="category mb-4">
                                <h4 className="mb-2">{translatedTitle}</h4>
                                <div className="badges flex flex-wrap gap-2">
                                    {availableBadges.map((badge) => (
                                        <Badge
                                            key={badge.id}
                                            text={badge.name}
                                            categoryColor={getCategoryColor(
                                                badge.group
                                            )}
                                            className="cursor-pointer hover:scale-105 active:scale-95"
                                            onClick={() => handleSelect(badge)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};
