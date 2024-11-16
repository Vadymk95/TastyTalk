import { ChangeEvent, FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
}

export const FileUpload: FC<FileUploadProps> = ({ onFileSelect }) => {
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
        <div className="relative group file-upload" onClick={triggerFileInput}>
            <label>sasaddsasad</label>
            <div className="file-upload-preview-wrapper">
                {preview ? (
                    <Image
                        src={preview}
                        alt={t('General.profilePreview')}
                        className="file-upload-preview"
                    />
                ) : (
                    <div className="file-upload-placeholder">
                        {t('General.uploadPicture')}
                    </div>
                )}
                <div className="file-upload-overlay group-hover:flex">
                    {t('General.updatePicture')}
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="file-input"
            />
        </div>
    );
};
