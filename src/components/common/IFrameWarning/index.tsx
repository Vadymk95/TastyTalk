import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isInWebViewOrIframe } from '@root/helpers/isInWebViewOrIframe';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IFrameWarning: FC = () => {
    const { t } = useTranslation();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (isInWebViewOrIframe()) {
            setShowWarning(true);
        }
    }, []);

    return (
        showWarning && (
            <div className="w-full bg-secondary text-white text-center p-3 z-50">
                <div className="mb-2 text-sm">
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="mr-2"
                    />
                    <span>{t('IFrameWarning.description1')}</span>
                </div>
                <p className="hidden sm:block mb-2">
                    {t('IFrameWarning.description2')}
                </p>
            </div>
        )
    );
};
