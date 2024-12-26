import { Field, FieldProps } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { localization } from '@root/helpers/localization';
import { useUserCountry } from '@root/hooks/useUserCountry';

type PhoneInputProps = {
    name: string;
    label: string;
    isRequired?: boolean;
    disabled?: boolean;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    className?: string;
};

export const PhoneNumberInput: FC<PhoneInputProps> = ({
    name,
    label,
    isRequired = false,
    disabled = false,
    placeholder = '',
    size = 'medium',
    className = ''
}) => {
    const { t } = useTranslation();
    const { data: defaultCountry, isLoading } = useUserCountry();
    const [country, setCountry] = useState<CountryData | null>(null);

    console.log('country', country);

    const sizeInputStyle = {
        small: 'input-small',
        medium: 'input-medium',
        large: 'input-large'
    };

    const sizeLabelStyle = {
        small: 'label-small',
        medium: 'label-medium',
        large: 'label-large'
    };

    const phoneInputeClasses =
        '!w-full !h-full !rounded-lg !bg-neutral-light !border-neutral input input-primary hover:!bg-neutral hover:!border-secondary-light';
    const phoneButtonClasses =
        '!bg-neutral-light !rounded-l-lg !border-neutral input-primary hover:!bg-neutral hover:!border-secondary-light hover:!border-r-0';

    return (
        <div className={`relative ${className || ''}`}>
            <label className={`label ${sizeLabelStyle[size]}`}>
                {label}
                {isRequired && <span className="text-primary">*</span>}
            </label>

            <Field name={name}>
                {({ field, form }: FieldProps) => (
                    <div className="relative">
                        <PhoneInput
                            country={defaultCountry}
                            localization={localization}
                            value={field.value}
                            onChange={(value, countryData) => {
                                form.setFieldValue(name, value);
                                setCountry(countryData as CountryData);
                            }}
                            inputProps={{
                                name,
                                required: isRequired,
                                disabled: disabled,
                                placeholder:
                                    placeholder || t('General.enterNumber')
                            }}
                            searchPlaceholder={t('General.search')}
                            searchNotFound={t('General.noResultsFound')}
                            disableDropdown={false}
                            countryCodeEditable={false}
                            masks={{
                                ru: '(...) ...-..-..',
                                us: '(...) ...-....'
                            }}
                            inputClass={`${sizeInputStyle[size]} ${phoneInputeClasses} ${
                                disabled || isLoading ? 'input-disabled' : ''
                            }`}
                            containerClass=""
                            buttonClass={`left-0 ${phoneButtonClasses} ${
                                disabled || isLoading ? 'input-disabled' : ''
                            }`}
                            dropdownClass="!rounded-l-lg"
                            searchClass="flex items-center my-search-input !pr-2 !pt-1 !rounded-none input"
                            enableAreaCodes
                            enableSearch
                        />
                        {form.errors[name] && form.touched[name] && (
                            <div className="error text-primary text-sm mt-1">
                                {form.errors[name] as string}
                            </div>
                        )}
                    </div>
                )}
            </Field>
        </div>
    );
};
