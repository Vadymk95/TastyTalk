import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { extractYouTubeVideoId } from '@root/helpers';

interface RecipeProps {
    videoUrl: string;
}

export const Video: FC<RecipeProps> = ({ videoUrl }) => {
    const { t } = useTranslation();
    const videoId = extractYouTubeVideoId(videoUrl);

    if (!videoId) {
        return <p className="text-primary">{t('General.invalidYouTubeUrl')}</p>;
    }

    return (
        <div
            className="video-container"
            style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0
            }}
        >
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            ></iframe>
        </div>
    );
};
