import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@root/components/ui/Button';
import { Option } from '@root/types';

type SelectProps = {
    options: Option[];
    placeholder: string;
    value?: string | null;
    searchable?: boolean;
    resetable?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
    onSelect: (option: string | null) => void;
};

export const Select: FC<SelectProps> = ({
    options,
    placeholder,
    value,
    searchable = false,
    resetable = false,
    disabled = false,
    className = '',
    variant = 'neutral',
    onSelect
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption =
        options.find((option) => option.value === value) || null;

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSelect = (optionValue: string) => {
        onSelect(optionValue);
        setIsOpen(false);
    };

    const handleReset = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setSearchQuery('');
        onSelect(null);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="select-container relative" ref={dropdownRef}>
            <Button
                className={`select-${variant} select ${disabled ? 'select-disabled' : ''} ${className}`}
                onClick={toggleDropdown}
                disabled={disabled}
                type="button"
            >
                <span className="truncate-text">
                    {selectedOption?.label || placeholder}
                </span>
                <div className="flex items-center">
                    {resetable && selectedOption && (
                        <span className="reset-button" onClick={handleReset}>
                            &times;
                        </span>
                    )}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2"
                    >
                        ▼
                    </motion.span>
                </div>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="select-dropdown absolute z-10 top-full mt-1 w-full bg-white border rounded shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {searchable && (
                            <div className="select-search-container">
                                <input
                                    type="text"
                                    placeholder={t('General.search')}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="select-input p-2 w-full border-b"
                                />
                            </div>
                        )}
                        <div className="select-items-container">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className="select-item p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
