import { ChangeEvent, FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PhotoUploadProps {
    onFileSelect: (file: File | null) => void;
    className?: string;
    src: string | null;
}

export const PhotoUpload: FC<PhotoUploadProps> = ({
    onFileSelect,
    className,
    src = null
}) => {
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string | null>(src);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRemoveFile = () => {
        onFileSelect(null);
        setPreview(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            onFileSelect(file);
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
        } else {
            setPreview(src);
        }
    };

    const triggerFileInput = () => {
        if (!preview) inputRef.current?.click();
    };

    const handleClick = () => {
        if (preview) {
            handleRemoveFile();
        } else {
            triggerFileInput();
        }
    };

    return (
        <div
            className={`relative group photo-upload ${className}`}
            onClick={handleClick}
        >
            <div className="photo-upload-preview-wrapper">
                {preview ? (
                    <Image
                        src={preview}
                        alt={t('PhotoUpload.profilePreview')}
                        className="photo-upload-preview"
                    />
                ) : (
                    <div className="photo-placeholder">
                        <FontAwesomeIcon
                            className="text-4xl"
                            icon={faCamera}
                            size="xl"
                        />
                        <p>{t('PhotoUpload.addPhoto')}</p>
                    </div>
                )}
                <div className="photo-upload-overlay group-hover:flex">
                    {preview ? (
                        <div className="photo-placeholder">
                            <FontAwesomeIcon
                                className="text-4xl"
                                icon={faTrash}
                                size="xl"
                            />
                            <p>{t('PhotoUpload.deleteProfilePicture')}</p>
                        </div>
                    ) : (
                        <div className="photo-placeholder">
                            <FontAwesomeIcon
                                className="text-4xl"
                                icon={faCamera}
                                size="xl"
                            />
                            <p>{t('PhotoUpload.uploadProfilePicture')}</p>
                        </div>
                    )}
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="photo-input"
            />
            <label className="text-center mt-2 text-neutral-dark/60">
                {t('PhotoUpload.profilePhoto')}
            </label>
        </div>
    );
};
