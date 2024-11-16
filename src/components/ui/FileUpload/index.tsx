import { ChangeEvent, FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    className?: string;
}

export const FileUpload: FC<FileUploadProps> = ({
    onFileSelect,
    className
}) => {
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            onFileSelect(file);
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
        } else {
            onFileSelect(null);
            setPreview(null);
        }
    };

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    return (
        <div
            className={`relative group file-upload ${className}`}
            onClick={triggerFileInput}
        >
            <div className="file-upload-preview-wrapper">
                {preview ? (
                    <Image
                        src={preview}
                        alt={t('FileUpload.profilePreview')}
                        className="file-upload-preview"
                    />
                ) : (
                    <div className="file-upload-placeholder">
                        <FontAwesomeIcon
                            className="text-4xl"
                            icon={faCamera}
                            size="xl"
                        />
                        <p>{t('FileUpload.addPhoto')}</p>
                    </div>
                )}
                <div className="file-upload-overlay group-hover:flex">
                    {preview
                        ? t('FileUpload.updatePicture')
                        : t('FileUpload.uploadProfilePicture')}
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="file-input"
            />
            <label className="text-center mt-2">
                {t('FileUpload.profilePhoto')}
            </label>
        </div>
    );
};
