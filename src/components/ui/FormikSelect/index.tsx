import { Select as BaseSelect } from '@root/components/ui';
import { FieldHookConfig, useField } from 'formik';
import { FC } from 'react';

type FormikSelectProps = {
    options: string[];
    placeholder: string;
    searchable?: boolean;
    resetable?: boolean;
    disabled?: boolean;
    className?: string;
} & FieldHookConfig<string>;

export const FormikSelect: FC<FormikSelectProps> = ({
    options,
    placeholder,
    searchable = false,
    resetable = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const [field, , helpers] = useField(props);
    const { setValue } = helpers;

    return (
        <BaseSelect
            className={className}
            options={options}
            placeholder={placeholder}
            searchable={searchable}
            resetable={resetable}
            disabled={disabled}
            value={field.value}
            onSelect={(value) => setValue(value)}
        />
    );
};
