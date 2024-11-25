import { FieldHookConfig, useField } from 'formik';
import { FC } from 'react';

import { Select as BaseSelect } from '@root/components/ui';
import { Option } from '@root/types';

type FormikSelectProps = {
    options: Option[];
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
            onSelect={(value) => setValue(value as string)}
        />
    );
};
