import { ChangeEvent, FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

import { faCamera } from '@fortawesome/free-solid-svg-icons';
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
            className={`relative group photo-upload ${className}`}
            onClick={triggerFileInput}
        >
            <div className="photo-upload-preview-wrapper">
                {preview ? (
                    <Image
                        src={preview}
                        alt={t('PhotoUpload.profilePreview')}
                        className="photo-upload-preview"
                    />
                ) : (
                    <div className="photo-upload-placeholder">
                        <FontAwesomeIcon
                            className="text-4xl"
                            icon={faCamera}
                            size="xl"
                        />
                        <p>{t('PhotoUpload.addPhoto')}</p>
                    </div>
                )}
                <div className="photo-upload-overlay group-hover:flex">
                    {preview
                        ? t('PhotoUpload.updatePicture')
                        : t('PhotoUpload.uploadProfilePicture')}
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="photo-input"
            />
            <label className="text-center mt-2">
                {t('PhotoUpload.profilePhoto')}
            </label>
        </div>
    );
};
