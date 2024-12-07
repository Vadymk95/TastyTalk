import { Button } from '@root/components/ui';
import { Option } from '@root/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useRef, useState } from 'react';

type MultiSelectProps = {
    options: Option[];
    placeholder: string;
    selectedValues?: string[];
    searchable?: boolean;
    className?: string;
    onChange: (selected: string[]) => void;
};

export const MultiSelectWithSearchAndCheckboxes: FC<MultiSelectProps> = ({
    options,
    placeholder,
    selectedValues = [],
    searchable = false,
    className = '',
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [localSelected, setLocalSelected] =
        useState<string[]>(selectedValues);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Обновляем локальный стейт при изменении пропсов
    useEffect(() => {
        setLocalSelected(selectedValues);
    }, [selectedValues]);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleToggleAll = () => {
        if (localSelected.length === options.length) {
            setLocalSelected([]);
        } else {
            setLocalSelected(options.map((option) => option.value));
        }
    };

    const handleSelect = (optionValue: string) => {
        const updatedSelection = localSelected.includes(optionValue)
            ? localSelected.filter((val) => val !== optionValue)
            : [...localSelected, optionValue];
        setLocalSelected(updatedSelection);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleApply = () => {
        onChange(localSelected);
        setIsOpen(false);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div
            className={`select-container relative ${className}`}
            ref={dropdownRef}
        >
            <Button className="select-neutral select" onClick={toggleDropdown}>
                <span className="truncate-text">
                    {localSelected.length > 0
                        ? `${localSelected.length} selected`
                        : placeholder}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                >
                    ▼
                </motion.span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="select-dropdown absolute z-50 top-full mt-1 w-full bg-white border rounded shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Фиксированный верхний блок */}
                        <div className="sticky top-0 bg-white z-10 border-b">
                            {searchable && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="select-input p-2 w-full"
                                />
                            )}
                            <div className="p-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={
                                            localSelected.length ===
                                            options.length
                                        }
                                        onChange={handleToggleAll}
                                        className="checkbox-primary"
                                    />
                                    Select All
                                </label>
                            </div>
                        </div>

                        {/* Скроллящиеся опции */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        checked={localSelected.includes(
                                            option.value
                                        )}
                                        onChange={() =>
                                            handleSelect(option.value)
                                        }
                                        className="checkbox-primary"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>

                        {/* Кнопка подтверждения */}
                        <div className="p-2 flex justify-end border-t">
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleApply}
                            >
                                Apply
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
