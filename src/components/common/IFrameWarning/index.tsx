import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@root/components/ui';
import { isInWebViewOrIframe } from '@root/helpers';

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
            <div className="w-full bg-secondary text-white text-center p-3 z-50 text-sm">
                <div className="mb-2">
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="mr-2"
                    />
                    <span>{t('IFrameWarning.description1')}</span>
                </div>
                <p className="hidden sm:block mb-2">
                    {t('IFrameWarning.description2')}
                </p>
                <Button
                    onClick={() => window.open(window.location.href, '_blank')}
                    size="large"
                >
                    {t('IFrameWarning.openInBrowser')}
                </Button>
            </div>
        )
    );
};
