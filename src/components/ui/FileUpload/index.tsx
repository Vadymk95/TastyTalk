import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image } from '@root/components/ui';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
}

export const FileUpload: FC<FileUploadProps> = ({ onFileSelect }) => {
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string | null>(null);

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

    return (
        <div className="file-upload">
            <label>{t('General.uploadProfilePicture')}</label>

            {preview && (
                <Image
                    src={preview}
                    alt={t('General.profilePreview')}
                    className="file-upload-preview"
                />
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
            />
        </div>
    );
};
