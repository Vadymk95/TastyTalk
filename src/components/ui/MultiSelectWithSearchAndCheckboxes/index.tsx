import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox } from '@root/components/ui';
import { Option } from '@root/types';

type MultiSelectProps = {
    options: Option[];
    placeholder: string;
    selectedValues?: string[];
    searchable?: boolean;
    className?: string;
    onChange: (selected: string[]) => void;
    onSearch?: (query: string) => void;
};

export const MultiSelectWithSearchAndCheckboxes: FC<MultiSelectProps> = ({
    options,
    placeholder,
    selectedValues = [],
    searchable = false,
    className = '',
    onChange,
    onSearch
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [localSelected, setLocalSelected] =
        useState<string[]>(selectedValues);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalSelected(selectedValues);
    }, [selectedValues]);

    const toggleDropdown = () => {
        if (isOpen && !isConfirmed) {
            setLocalSelected(selectedValues);
        }
        setIsOpen((prev) => !prev);
        setIsConfirmed(false);
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

    const handleApply = () => {
        setIsConfirmed(true);
        onChange(localSelected);
        setIsOpen(false);
    };

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                if (onSearch) {
                    onSearch(query);
                }
            }, 500),
        [onSearch]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                if (!isConfirmed) {
                    setLocalSelected(selectedValues);
                }
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, isConfirmed, selectedValues]);

    return (
        <div className={`multiselect-container ${className}`} ref={dropdownRef}>
            <Button
                className={`select-neutral select ${
                    isConfirmed && selectedValues.length > 0
                        ? 'bg-secondary'
                        : ''
                }`}
                onClick={toggleDropdown}
                disabled={options.length === 0}
            >
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
                        className="select-dropdown w-[300px] absolute z-10 top-full mt-1 bg-white border rounded shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="sticky top-0 bg-white z-10 border-b">
                            {searchable && (
                                <input
                                    type="text"
                                    placeholder={t('General.search')}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="select-input p-2 w-full"
                                />
                            )}
                            <div className="p-2 bg-neutral-light">
                                <Checkbox
                                    name="selectAll"
                                    label={t('General.selectAll')}
                                    checked={
                                        localSelected.length === options.length
                                    }
                                    onChange={handleToggleAll}
                                />
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.map((option) => (
                                <Checkbox
                                    key={option.value}
                                    name={option.value}
                                    label={option.label}
                                    checked={localSelected.includes(
                                        option.value
                                    )}
                                    onChange={() => handleSelect(option.value)}
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                />
                            ))}
                        </div>

                        <div className="sticky bottom-0 bg-white p-2 border-t flex justify-end">
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleApply}
                                disabled={localSelected.length === 0}
                            >
                                {t('General.apply')}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
