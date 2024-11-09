import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Link } from '@root/components/ui';
import { routes } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

const EmailVerificationPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { resendVerificationEmail } = useAuthStore();

    const handleGoToHome = () => navigate(routes.home);

    return (
        <div className="flex-all-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-custom-light text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-main rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-white text-3xl animate-spin-slow"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-neutral-dark mb-2">
                    {t('EmailVerificationPage.title')}
                </h2>

                <p className="text-neutral-400 text-base mb-6">
                    {t('EmailVerificationPage.text')}
                </p>

                <Button onClick={handleGoToHome}>
                    {t('EmailVerificationPage.goToHome')}
                </Button>

                <p className="text-sm text-neutral-400 mt-4">
                    {t('EmailVerificationPage.resendEmailText')}{' '}
                    <Link
                        href="#"
                        onClick={resendVerificationEmail}
                        className="text-primary hover:text-primary-dark underline"
                    >
                        {t('EmailVerificationPage.resendEmail')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
