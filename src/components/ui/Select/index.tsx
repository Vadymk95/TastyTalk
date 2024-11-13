import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { Button } from '@root/components/ui';

type SelectProps = {
    options: string[];
    placeholder: string;
    searchable?: boolean;
    resetable?: boolean;
    disabled?: boolean;
    onSelect: (option: string) => void;
};

export const Select: FC<SelectProps> = ({
    options,
    placeholder,
    searchable = false,
    resetable = false,
    disabled = false,
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const toggleDropdown = () => !disabled && setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setSearchQuery('');
        onSelect('');
    };

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="select-container">
            <Button
                className={`select ${disabled ? 'select-disabled' : ''}`}
                onClick={toggleDropdown}
                disabled={disabled}
            >
                <span className="truncate-text">
                    {selectedOption || placeholder}
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
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="select-item"
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
