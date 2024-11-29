import { FieldProps } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge, Button } from '@root/components/ui';
import { getCategoryColor } from '@root/helpers';
import { Category } from '@root/types';

import { faBook, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormikMultiSelectProps = {
    value?: Category[];
    onChange?: (value: Category[]) => void;
    categories: Category[];
    maxBadges?: number;
} & Partial<FieldProps>;

export const FormikMultiSelect: FC<FormikMultiSelectProps> = ({
    onChange,
    categories,
    maxBadges = 5,
    form,
    field
}) => {
    const { t } = useTranslation();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [localValue, setLocalValue] = useState<Category[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const selectedBadges = (field?.value as Category[]) ?? localValue;

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

        if (form && field?.name) {
            form.setFieldValue(field?.name, updatedBadges);
        }
    };

    const handleRemove = (badge: Category) => {
        const updatedBadges = selectedBadges.filter((b) => b.id !== badge.id);
        if (onChange) {
            onChange(updatedBadges);
        } else {
            setLocalValue(updatedBadges);
        }

        if (form && field?.name) {
            form.setFieldValue(field?.name, updatedBadges);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                !dropdownRef.current?.contains(target) &&
                !buttonRef.current?.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (selectedBadges.length === maxBadges) {
            setIsOpen(false);
        }
    }, [maxBadges, selectedBadges.length]);

    return (
        <div className="relative">
            {!!selectedBadges.length && (
                <>
                    <h4 className="text-sm label">
                        {t('MultiSelect.chosenCategories')}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="divider my-0"></div>
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
                        <div className="divider my-0"></div>
                    </div>
                </>
            )}

            <div className="relative mb-2">
                {!selectedBadges.length && (
                    <h4 className="label">
                        {t('MultiSelect.chooseCategories')}
                    </h4>
                )}
                {selectedBadges.length !== maxBadges ? (
                    <Button
                        ref={buttonRef}
                        className="relative flex items-center gap-2"
                        onClick={(event) => {
                            event.preventDefault();
                            setIsOpen((prev) => !prev);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={isOpen ? faBook : faBookOpenReader}
                        />
                        <span>
                            {isOpen
                                ? t('MultiSelect.hideCategories')
                                : t('MultiSelect.showCategories')}
                        </span>
                    </Button>
                ) : (
                    <div className="invisible-button-placeholder py-2 px-4" />
                )}
            </div>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="plate absolute z-10 top-full left-0 mt-2 p-2 w-full border rounded bg-white shadow-lg max-h-56 overflow-y-auto"
                >
                    <div className="categories">
                        {Object.entries(groupedCategories).map(
                            ([groupName, groupCategories]) => {
                                const availableBadges = groupCategories.filter(
                                    (category) =>
                                        !selectedBadges.some(
                                            (badge) =>
                                                badge.group === category.group
                                        )
                                );

                                if (availableBadges.length === 0) {
                                    return null;
                                }

                                const translatedTitle = t(
                                    `Categories.${groupName}`
                                );

                                return (
                                    <div
                                        key={groupName}
                                        className="category mb-4"
                                    >
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-nowrap">
                                                {translatedTitle}
                                            </h4>
                                            <div className="divider mx-0"></div>
                                        </div>

                                        <div className="badges flex flex-wrap gap-2">
                                            {availableBadges.map((badge) => (
                                                <Badge
                                                    key={badge.id}
                                                    text={badge.name}
                                                    categoryColor={getCategoryColor(
                                                        badge.group
                                                    )}
                                                    className="cursor-pointer hover:scale-105 active:scale-95"
                                                    onClick={() =>
                                                        handleSelect(badge)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
