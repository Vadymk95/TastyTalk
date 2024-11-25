import { Button } from '@root/components/ui';
import { Option } from '@root/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

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
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedOption =
        options.find((option) => option.value === value) || null;

    const toggleDropdown = () => !disabled && setIsOpen((prev) => !prev);

    const handleSelect = (optionValue: string) => {
        onSelect(optionValue);
        setIsOpen(false);
    };

    const handleReset = () => {
        setSearchQuery('');
        onSelect(null);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="select-container">
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
                        className="select-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {searchable && (
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="select-input"
                            />
                        )}
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className="select-item"
                            >
                                {option.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
