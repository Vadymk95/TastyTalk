import { FieldProps } from 'formik';
import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { Button, Image } from '@root/components/ui';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DragAndDropProps = {
    onChange?: (file: File | null) => void;
    placeholder?: string;
    accept?: Accept;
    className?: string;
    disabled?: boolean;
} & Partial<FieldProps>;

export const DragAndDrop: FC<DragAndDropProps> = ({
    onChange,
    placeholder = '',
    accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
    className = '',
    disabled = false,
    form,
    field
}) => {
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (field?.value) {
            const objectUrl = URL.createObjectURL(field?.value);
            setPreview(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setPreview(null);
        }
    }, [field?.value]);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            if (onChange) {
                onChange(file || null);
            }
            if (form && field?.name) {
                form.setFieldValue(field?.name, file || null);
            }
        },
        [onChange, form, field]
    );

    const handleReset = (event: MouseEvent) => {
        event.stopPropagation();

        if (onChange) {
            onChange(null);
        }
        if (form && field?.name) {
            form.setFieldValue(field?.name, null);
        }
    };

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
            {field?.value && preview ? (
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-xs rounded-lg"
                    />
                    <p className="text-secondary font-medium">
                        {field?.value.name} (
                        {(field?.value.size / 1024).toFixed(2)} KB)
                    </p>
                    <Button onClick={(event) => handleReset(event)}>
                        {t('General.removePhoto')}
                    </Button>
                </div>
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
