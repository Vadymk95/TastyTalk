import { FieldProps } from 'formik';
import { FC, useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

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
        multiple: false, // Поддержка одного файла
        disabled
    });

    return (
        <div
            {...getRootProps()}
            className={`drag-and-drop border-2 border-dashed rounded-md p-4 text-center transition duration-200 ${
                isDragActive
                    ? 'bg-neutral-light border-secondary'
                    : 'bg-neutral border-neutral-light'
            } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        >
            <input {...getInputProps()} />
            {value ? (
                <p className="text-secondary font-medium">
                    {value.name} ({(value.size / 1024).toFixed(2)} KB)
                </p>
            ) : (
                <p className="text-neutral-dark">{placeholder}</p>
            )}
        </div>
    );
};
