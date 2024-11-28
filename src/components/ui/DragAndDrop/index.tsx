import { FieldProps } from 'formik';
import { FC, useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DragAndDropProps = {
    name?: string;
    value?: File | null;
    onChange?: (file: File | null) => void;
    placeholder?: string;
    accept?: Accept;
    className?: string;
    disabled?: boolean;
} & Partial<FieldProps>;

export const DragAndDrop: FC<DragAndDropProps> = ({
    name,
    value,
    onChange,
    placeholder = 'Перетащите файл сюда или нажмите, чтобы выбрать',
    accept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    className = '',
    disabled = false,
    form
}) => {
    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (onChange) {
                onChange(file || null);
            }
            if (form && name) {
                form.setFieldValue(name, file || null);
            }
        },
        [onChange, form, name]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept,
        multiple: false,
        disabled
    });

    return (
        <div
            {...getRootProps()}
            className={`drag-and-drop border-2 border-dashed rounded-md p-4 text-center transition duration-200 ${
                isDragActive
                    ? 'bg-neutral-light border-secondary'
                    : 'bg-neutral/30 border-neutral'
            } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        >
            <input {...getInputProps()} />
            {value ? (
                <p className="text-secondary font-medium">
                    {value.name} ({(value.size / 1024).toFixed(2)} KB)
                </p>
            ) : (
                <div className="p-4">
                    <p className="label mb-3">{placeholder}</p>
                    <FontAwesomeIcon
                        className="text-primary-light"
                        size="3x"
                        icon={faImage}
                    />
                </div>
            )}
        </div>
    );
};
