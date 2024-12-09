import { ChangeEvent, FC, HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchInputProps extends HTMLProps<HTMLInputElement> {
    name: string;
    type?: string;
    className?: string;
    label?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const SearchInput: FC<SearchInputProps> = ({
    name,
    className = '',
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    disabled = false
}) => {
    const { t } = useTranslation();

    return (
        <div className="w-full relative">
            {label && (
                <label className="label" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                className={`input input-primary input-medium ${className}`}
                name={name}
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder || t('General.search')}
                disabled={disabled}
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 label"
            />
        </div>
    );
};
